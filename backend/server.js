const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const mainRoute = require("./routes/index.js");
const port = process.env.PORT || 5000;

// Seed functions
const seedSettings = require("./seeds/settingsSeeds.js");
const seedPages = require("./seeds/pageSeeds.js");

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

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS configuration for Netlify
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://standart-kalip.netlify.app',
    process.env.FRONTEND_URL,
    /\.netlify\.app$/,
    /\.netlify\.live$/
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
      await seedSettings();
      await seedPages();
      isInitialized = true;
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Initialization error:", error);
      throw error;
    }
  }
};

// Netlify functions için export
if (process.env.NODE_ENV === 'production' || process.env.NETLIFY) {
  // Netlify functions environment
  initialize().catch(console.error);
  module.exports = app;
} else {
  // Local development
  app.listen(port, async () => {
    await initialize();
    console.log(`Server is running on http://localhost:${port}`);
  });
}
