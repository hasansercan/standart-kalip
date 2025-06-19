#!/bin/bash

# Local Development Setup Script
# Usage: ./local-dev.sh [start|stop|restart|logs]

set -e

ACTION=${1:-start}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Standart Kalıp - Local Dev${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if Node.js is installed
check_requirements() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..

    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
}

# Setup environment
setup_environment() {
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating from template..."
        cp .env.local .env.local
        print_warning "Please edit .env.local with your configuration before starting the application."
    fi

    # Copy local env to backend
    cp .env.local backend/.env
}

# Start MongoDB (if using Docker)
start_mongodb() {
    if command -v docker &> /dev/null; then
        print_status "Starting MongoDB with Docker..."
        docker run -d \
            --name standart-kalip-mongo-dev \
            -p 27017:27017 \
            -v standart_kalip_dev_data:/data/db \
            mongo:6.0 \
            --quiet 2>/dev/null || true
    else
        print_warning "Docker not found. Please make sure MongoDB is running on localhost:27017"
    fi
}

# Stop MongoDB
stop_mongodb() {
    if command -v docker &> /dev/null; then
        print_status "Stopping MongoDB..."
        docker stop standart-kalip-mongo-dev 2>/dev/null || true
        docker rm standart-kalip-mongo-dev 2>/dev/null || true
    fi
}

# Start development servers
start_dev() {
    print_header
    check_requirements
    install_dependencies
    setup_environment
    start_mongodb

    print_status "Starting development servers..."

    # Start backend in background
    print_status "Starting backend server on http://localhost:5000"
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..

    # Wait a moment for backend to start
    sleep 3

    # Start frontend
    print_status "Starting frontend server on http://localhost:5173"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..

    # Save PIDs for later cleanup
    echo $BACKEND_PID > .backend.pid
    echo $FRONTEND_PID > .frontend.pid

    print_status "Development servers started successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost:5173"
    echo "🔧 Backend API: http://localhost:5000"
    echo "📊 Admin Panel: http://localhost:5173/admin"
    echo ""
    echo "Press Ctrl+C to stop all services"

    # Wait for user interrupt
    trap 'stop_dev' INT
    wait
}

# Stop development servers
stop_dev() {
    print_status "Stopping development servers..."

    if [ -f .backend.pid ]; then
        kill $(cat .backend.pid) 2>/dev/null || true
        rm .backend.pid
    fi

    if [ -f .frontend.pid ]; then
        kill $(cat .frontend.pid) 2>/dev/null || true
        rm .frontend.pid
    fi

    # Kill any remaining processes
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true

    stop_mongodb

    print_status "All services stopped."
}

# Show logs
show_logs() {
    print_status "Showing application logs..."
    echo "Backend logs:"
    cd backend
    npm run dev &
    cd ..
    echo ""
    echo "Frontend logs:"
    cd frontend
    npm run dev
    cd ..
}

# Main script logic
case $ACTION in
    "start")
        start_dev
        ;;
    "stop")
        stop_dev
        ;;
    "restart")
        stop_dev
        sleep 2
        start_dev
        ;;
    "logs")
        show_logs
        ;;
    *)
        echo "Usage: $0 [start|stop|restart|logs]"
        echo ""
        echo "Commands:"
        echo "  start   - Start development servers"
        echo "  stop    - Stop development servers"
        echo "  restart - Restart development servers"
        echo "  logs    - Show application logs"
        exit 1
        ;;
esac
