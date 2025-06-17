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
    if (process.env.NODE_ENV !== 'production') {
    }
  } catch (error) {
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
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api", mainRoute);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Initialize database and seeds only once
let isInitialized = false;

const initialize = async () => {
  if (!isInitialized) {
    await connect();
    await seedSettings();
    await seedPages();
    isInitialized = true;
    if (process.env.NODE_ENV !== 'production') {
    }
  }
};

// For Vercel serverless functions
if (process.env.NODE_ENV === 'production') {
  initialize();
  module.exports = app;
} else {
  // For local development
  app.listen(port, async () => {
    await initialize();
    if (process.env.NODE_ENV !== 'production') {
    }
  });
}
