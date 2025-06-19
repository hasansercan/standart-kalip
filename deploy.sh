#!/bin/bash

# Standart Kalıp Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment for Standart Kalıp..."

# Configuration
SERVER_IP="104.247.163.244"
DOMAIN="decayazilim.com.tr"
PROJECT_DIR="/var/www/standart-kalip"
BACKUP_DIR="/var/backups/standart-kalip"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    print_warning "Please copy .env.production.example to .env.production and configure your environment variables."
    exit 1
fi

print_status "Building project locally..."

# Build frontend
cd frontend
npm install
npm run build
cd ..

print_status "Uploading files to server..."

# Create project directory on server
ssh root@$SERVER_IP "mkdir -p $PROJECT_DIR"

# Upload project files
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'frontend/dist' \
    --exclude 'frontend/node_modules' \
    --exclude 'backend/node_modules' \
    ./ root@$SERVER_IP:$PROJECT_DIR/

# Upload built frontend
rsync -avz --progress frontend/dist/ root@$SERVER_IP:$PROJECT_DIR/frontend/dist/

print_status "Setting up environment on server..."

# Run setup script on server
ssh root@$SERVER_IP "cd $PROJECT_DIR && chmod +x setup-server.sh && ./setup-server.sh"

print_status "Starting services..."

# Start Docker containers
ssh root@$SERVER_IP "cd $PROJECT_DIR && docker-compose --env-file .env.production up -d --build"

print_status "Setting up SSL certificate..."

# Setup SSL with Certbot
ssh root@$SERVER_IP "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN"

print_status "Deployment completed successfully! 🎉"
echo ""
echo "Your website is now available at:"
echo "🌐 https://$DOMAIN"
echo "🔧 API: https://api.$DOMAIN"
echo ""
echo "To monitor the application:"
echo "ssh root@$SERVER_IP"
echo "cd $PROJECT_DIR"
echo "docker-compose logs -f"
