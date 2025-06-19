#!/bin/bash

# Fix permissions for script files
# Usage: ./scripts/chmod-fix.sh

echo "🔧 Fixing permissions for script files..."

# Make scripts executable
chmod +x deploy.sh
chmod +x setup-server.sh
chmod +x local-dev.sh
chmod +x scripts/chmod-fix.sh

echo "✅ Permissions fixed!"
echo ""
echo "Now you can run:"
echo "  ./local-dev.sh start     # Start local development"
echo "  ./deploy.sh              # Deploy to production"
echo "  ./setup-server.sh        # Setup Ubuntu server"
