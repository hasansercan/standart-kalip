const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const mainRoute = require("./routes/index.js");
const port = process.env.PORT || 5000;

// Seed functions
const seedSettings = require("./seeds/settingsSeeds.js");
const seedPages = require("./seeds/pageSeeds.js");
const seedContacts = require("./seeds/contactSeeds.js");
const seedJobs = require("./seeds/jobSeeds.js");
const seedJobApplications = require("./seeds/jobApplicationSeeds.js");
const { seedQualityManagement } = require("./seeds/qualityManagementSeeds.js");
const seedAdmin = require("./seeds/adminSeeds.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// middlewares
if (process.env.NODE_ENV !== 'production') {
  app.use(logger("dev"));
}

// Trust proxy for Netlify/production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false // Disable for development compatibility
}));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için 15 dakikada max 100 request
  message: {
    error: "Too many requests from this IP, please try again later.",
    code: "RATE_LIMITED"
  },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10, // Auth endpoint'leri için daha sıkı limit
  message: {
    error: "Too many authentication attempts, please try again later.",
    code: "AUTH_RATE_LIMITED"
  },
  skipSuccessfulRequests: true
});

// Apply rate limiting (temporarily disabled for development)
// app.use(generalLimiter);
// app.use('/api/auth', authLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // 50mb'den 10mb'ye düşürüldü
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// MongoDB injection protection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`Potential NoSQL injection attempt detected: ${key} from ${req.ip}`);
  }
}));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://decayazilim.com',
    'https://www.decayazilim.com',
    'https://api.decayazilim.com',
    process.env.FRONTEND_URL,
    /\.decayazilim\.com$/
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Standart Kalıp API Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use("/api", mainRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize database and seeds only once
let isInitialized = false;

const initialize = async () => {
  if (!isInitialized) {
    try {
      await connect();
      await seedAdmin();
      await seedSettings();
      await seedPages();
      await seedContacts();
      await seedJobs();
      await seedJobApplications();
      await seedQualityManagement();
      isInitialized = true;
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Initialization error:", error);
      throw error;
    }
  }
};

// Start server
app.listen(port, async () => {
  await initialize();
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
