#!/bin/bash

# Quick Start Script for Standart Kalıp
# This script sets up everything for local development

set -e

echo "🚀 Standart Kalıp - Quick Start Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Fix permissions
echo "🔧 Fixing script permissions..."
chmod +x deploy.sh
chmod +x setup-server.sh
chmod +x local-dev.sh
chmod +x scripts/*.sh

# Setup environment file
if [ ! -f ".env.local" ]; then
    echo "📝 Creating local environment file..."
    cp env.local.example .env.local
    echo "⚠️  Please edit .env.local with your configuration!"
    echo "   Cloudinary, Stripe, and JWT secrets need to be configured."
fi

# Install dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys and configuration"
echo "2. Start development: ./local-dev.sh start"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For production deployment:"
echo "1. Copy env.production.example to .env.production"
echo "2. Configure production values in .env.production"
echo "3. Run: ./deploy.sh"
