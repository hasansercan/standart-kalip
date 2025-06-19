#!/bin/bash

# Server Setup Script for Ubuntu
# This script installs all necessary dependencies on the Ubuntu server

set -e

echo "🔧 Setting up Ubuntu server for Standart Kalıp..."

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y curl wget git nginx certbot python3-certbot-nginx

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Install Node.js (for local development if needed)
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Configure firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 5000/tcp
ufw --force enable

# Create necessary directories
mkdir -p /var/www/standart-kalip
mkdir -p /var/backups/standart-kalip
mkdir -p /var/log/standart-kalip

# Set proper permissions
chown -R www-data:www-data /var/www/standart-kalip

# Configure nginx (remove default site)
rm -f /etc/nginx/sites-enabled/default

# Create systemd service for the application
cat > /etc/systemd/system/standart-kalip.service << 'EOF'
[Unit]
Description=Standart Kalıp Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/standart-kalip
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
systemctl daemon-reload
systemctl enable standart-kalip.service

# Configure log rotation
cat > /etc/logrotate.d/standart-kalip << 'EOF'
/var/log/standart-kalip/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        systemctl reload standart-kalip
    endscript
}
EOF

# Create backup script
cat > /usr/local/bin/backup-standart-kalip.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/standart-kalip"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
docker exec standart-kalip-mongo mongodump --out "/tmp/backup-$DATE"
docker cp standart-kalip-mongo:/tmp/backup-$DATE "$BACKUP_DIR/"

# Backup application files
tar -czf "$BACKUP_DIR/app-backup-$DATE.tar.gz" -C /var/www standart-kalip

# Keep only last 7 backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete
find "$BACKUP_DIR" -name "backup-*" -mtime +7 -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR/app-backup-$DATE.tar.gz"
EOF

chmod +x /usr/local/bin/backup-standart-kalip.sh

# Setup cron for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-standart-kalip.sh") | crontab -

echo "✅ Server setup completed!"
echo ""
echo "Next steps:"
echo "1. Upload your project files to /var/www/standart-kalip"
echo "2. Configure your .env.production file"
echo "3. Run: docker-compose --env-file .env.production up -d"
echo "4. Setup SSL: certbot --nginx -d decayazilim.com.tr -d www.decayazilim.com.tr"
