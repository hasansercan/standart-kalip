# Standart Kalıp E-Commerce Platform

Modern ve güvenli e-ticaret platformu. React frontend ve Node.js/Express backend ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ Modern React frontend (Vite)
- ✅ Node.js/Express backend API
- ✅ MongoDB veritabanı
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Admin paneli
- ✅ Ürün yönetimi
- ✅ Blog sistemi
- ✅ İletişim formu
- ✅ Kalite yönetim sistemi
- ✅ İş başvuru sistemi
- ✅ Stripe ödeme entegrasyonu
- ✅ Cloudinary görsel yönetimi
- ✅ Responsive tasarım
- ✅ SSL sertifikası
- ✅ Production ready

## 📋 Gereksinimler

### Local Development
- Node.js 18+
- npm 8+
- MongoDB

### Production Deployment
- Ubuntu 20.04+ sunucu
- Node.js 18+
- MongoDB
- Nginx
- PM2
- SSL sertifikası (Let's Encrypt)

## 🛠️ Local Development

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd standart-kalip
```

### 2. Environment Dosyalarını Oluşturun
```bash
# Backend environment
cp env.local.example backend/.env

# Frontend environment
cp frontend/env.example frontend/.env
```

`backend/.env` dosyasını düzenleyin:
```env
MONGO_URI=mongodb://localhost:27017/standart_kalip_dev
JWT_SECRET=your_jwt_secret_for_development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

`frontend/.env` dosyasını da düzenleyin:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_APP_NAME=Standart Kalıp
VITE_DEBUG=true
```

### 3. MongoDB'yi Başlatın
```bash
# Ubuntu/MacOS
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. Backend'i Başlatın
```bash
cd backend
npm install
npm run dev
```

### 5. Frontend'i Başlatın
```bash
cd frontend
npm install
npm run dev
```

### 6. Uygulamaya Erişin
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

---

## 🌐 Production Deployment (Ubuntu Server)

### Sunucu Bilgileri:
- **IP:** 104.247.163.244
- **Domain:** decayazilim.com
- **SSL:** Let's Encrypt ile otomatik

### 1. SSH ile Sunucuya Bağlanın
```bash
ssh root@104.247.163.244
```

### 2. Sistem Güncellemesi
```bash
apt update && apt upgrade -y
```

### 3. Node.js Kurulumu
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### 4. MongoDB Kurulumu
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod
```

### 5. Nginx Kurulumu
```bash
apt install -y nginx
```

### 6. PM2 Kurulumu
```bash
npm install -g pm2
```

### 7. Proje Dosyalarını Yükleyin
```bash
# Proje dizinini oluşturun
mkdir -p /var/www/standart-kalip
cd /var/www/standart-kalip

# Git ile projeyi klonlayın
git clone <your-repo-url> .

# VEYA local'den dosyaları kopyalayın
# scp -r ./standart-kalip root@104.247.163.244:/var/www/standart-kalip/
```

### 8. Environment Dosyalarını Oluşturun
```bash
cd /var/www/standart-kalip

# Backend environment
cp env.production.example backend/.env
nano backend/.env

# Frontend environment
cp frontend/env.production.example frontend/.env.production
nano frontend/.env.production
```

`backend/.env` dosyasını düzenleyin:
```env
MONGO_URI=mongodb://localhost:27017/standart_kalip_production
JWT_SECRET=your_very_secure_production_jwt_secret_32_characters
CLOUDINARY_CLOUD_NAME=your_production_cloudinary_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://decayazilim.com
```

`frontend/.env.production` dosyasını da düzenleyin:
```env
VITE_API_BASE_URL=https://api.decayazilim.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_live_public_key
VITE_APP_NAME=Standart Kalıp
VITE_DEBUG=false
```

### 9. Dependencies Kurulumu
```bash
# Backend dependencies
cd backend
npm install --production

# Frontend build
cd ../frontend
npm install
npm run build
```

### 10. Nginx Konfigürasyonu
```bash
# Nginx konfigürasyon dosyasını kopyalayın
cp /var/www/standart-kalip/nginx-reverse-proxy.conf /etc/nginx/sites-available/standart-kalip

# Site'ı aktifleştirin
ln -s /etc/nginx/sites-available/standart-kalip /etc/nginx/sites-enabled/

# Default site'ı kaldırın
rm -f /etc/nginx/sites-enabled/default

# Nginx'i test edin
nginx -t

# Nginx'i yeniden başlatın
systemctl restart nginx
```

### 11. Firewall Ayarları
```bash
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable
```

### 12. PM2 ile Backend'i Başlatın
```bash
cd /var/www/standart-kalip/backend

# PM2 ecosystem dosyası oluşturun
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'standart-kalip-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/standart-kalip/error.log',
    out_file: '/var/log/standart-kalip/access.log',
    log_file: '/var/log/standart-kalip/combined.log',
    time: true
  }]
};
EOF

# Log dizini oluşturun
mkdir -p /var/log/standart-kalip

# PM2 ile başlatın
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 13. SSL Sertifikası Kurulumu
```bash
# Certbot kurulumu
apt install -y certbot python3-certbot-nginx

# SSL sertifikası alın
certbot --nginx -d decayazilim.com -d www.decayazilim.com -d api.decayazilim.com --non-interactive --agree-tos --email admin@decayazilim.com

# Otomatik yenileme ayarlayın
crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | crontab -
```

### 14. DNS Ayarları
Domain sağlayıcınızda aşağıdaki A kayıtlarını ekleyin:
```
A     decayazilim.com          104.247.163.244
A     www.decayazilim.com      104.247.163.244
A     api.decayazilim.com      104.247.163.244
```

### 15. Frontend Dosyalarını Nginx'e Kopyalayın
```bash
# Nginx web root'una frontend dosyalarını kopyalayın
rm -rf /var/www/standart-kalip/frontend/dist/node_modules
cp -r /var/www/standart-kalip/frontend/dist/* /var/www/standart-kalip/frontend/dist/
```

---

## 📊 Monitoring & Maintenance

### PM2 Komutları
```bash
pm2 status              # Durum kontrolü
pm2 logs                # Logları görüntüle
pm2 restart all         # Servisleri yeniden başlat
pm2 stop all            # Servisleri durdur
pm2 delete all          # Servisleri sil
```

### MongoDB Komutları
```bash
systemctl status mongod  # MongoDB durumu
mongo                    # MongoDB shell
```

### Nginx Komutları
```bash
systemctl status nginx   # Nginx durumu
nginx -t                 # Konfigürasyon testi
systemctl reload nginx   # Konfigürasyonu yenile
```

### Log Dosyaları
```bash
# Application logs
tail -f /var/log/standart-kalip/combined.log

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# System logs
journalctl -u nginx -f
journalctl -u mongod -f
```

---

## 🔧 Güncelleme Işlemleri

### Code Güncellemesi
```bash
cd /var/www/standart-kalip

# Git pull
git pull origin main

# Backend güncellemesi
cd backend
npm install --production

# Frontend build
cd ../frontend
npm install
npm run build

# PM2 restart
pm2 restart all
```

---

## 🚨 Sorun Giderme

### Backend çalışmıyor
```bash
pm2 logs standart-kalip-backend
pm2 restart standart-kalip-backend
```

### Nginx hatası
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### MongoDB bağlantı sorunu
```bash
systemctl status mongod
mongo --eval "db.adminCommand('ismaster')"
```

### SSL sertifikası sorunu
```bash
certbot certificates
certbot renew --dry-run
```

---

## ✅ Final Kontrol Listesi

- [ ] Node.js kuruldu ve çalışıyor
- [ ] MongoDB kuruldu ve çalışıyor
- [ ] Nginx kuruldu ve konfigüre edildi
- [ ] PM2 kuruldu ve backend çalışıyor
- [ ] Environment dosyası doğru konfigüre edildi
- [ ] Frontend build edildi
- [ ] SSL sertifikası kuruldu
- [ ] DNS kayıtları eklendi
- [ ] Firewall ayarları yapıldı
- [ ] Website erişilebilir: https://decayazilim.com
- [ ] API erişilebilir: https://api.decayazilim.com
- [ ] Admin paneli çalışıyor

**Tebrikler! 🎉 Standart Kalıp artık production'da çalışıyor.**

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- Email: admin@decayazilim.com

**Standart Kalıp E-Commerce Platform** - Modern, güvenli ve ölçeklenebilir e-ticaret çözümü.
