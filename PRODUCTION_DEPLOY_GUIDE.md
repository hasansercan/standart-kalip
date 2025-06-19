# Production Deployment Kılavuzu - Standart Kalıp

Bu kılavuz, Standart Kalıp projesini Ubuntu sunucusunda (IP: 104.247.163.244) decayazilim.com.tr domain'inde yayınlamak için adım adım talimatlar içerir.

## 🚀 Hızlı Deployment (Otomatik)

### 1. Ön Hazırlık
```bash
# Repository'yi klonlayın
git clone <your-repo-url>
cd standart-kalip

# Script izinlerini düzeltin
chmod +x scripts/*.sh deploy.sh setup-server.sh local-dev.sh

# Environment dosyasını oluşturun
cp env.production.example .env.production
```

### 2. Environment Konfigürasyonu
`.env.production` dosyasını düzenleyin:
```env
# Veritabanı
MONGO_URI=mongodb://standart-kalip-mongo:27017/standart_kalip
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=YourSecurePassword123!

# JWT Secret (32+ karakter)
JWT_SECRET=your_production_jwt_secret_minimum_32_characters

# Cloudinary (resim yükleme)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (ödeme)
STRIPE_SECRET_KEY=sk_live_your_live_key

# URL'ler
FRONTEND_URL=https://decayazilim.com.tr
VITE_API_BASE_URL=https://api.decayazilim.com.tr
```

### 3. Deployment
```bash
./deploy.sh
```

Bu komut otomatik olarak:
- Frontend'i build eder
- Dosyaları sunucuya yükler
- Sunucu kurulumunu yapar
- Docker container'ları başlatır
- SSL sertifikası kurar

---

## 🛠️ Manuel Deployment

### 1. Sunucu Hazırlığı

#### SSH ile sunucuya bağlanın:
```bash
ssh root@104.247.163.244
```

#### Sistem güncellemesi:
```bash
apt update && apt upgrade -y
```

#### Gerekli paketleri kurun:
```bash
apt install -y curl wget git nginx certbot python3-certbot-nginx
```

#### Docker kurulumu:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh
```

#### Docker Compose kurulumu:
```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 2. Proje Dosyalarını Yükleme

#### Local makineden sunucuya dosya yükleme:
```bash
# Proje dizininden
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'frontend/dist' \
    ./ root@104.247.163.244:/var/www/standart-kalip/
```

### 3. Sunucu Konfigürasyonu

#### Proje dizinine geçin:
```bash
cd /var/www/standart-kalip
```

#### Gerekli dizinleri oluşturun:
```bash
mkdir -p /var/backups/standart-kalip
mkdir -p /var/log/standart-kalip
```

#### İzinleri ayarlayın:
```bash
chown -R www-data:www-data /var/www/standart-kalip
```

#### Firewall ayarları:
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 5000/tcp
ufw --force enable
```

### 4. Environment Dosyasını Oluşturma

```bash
cp env.production.example .env.production
nano .env.production
```

### 5. Docker Container'ları Başlatma

```bash
docker-compose --env-file .env.production up -d --build
```

### 6. Nginx Konfigürasyonu

#### Nginx sitesini aktifleştirin:
```bash
cp nginx-reverse-proxy.conf /etc/nginx/sites-available/standart-kalip
ln -s /etc/nginx/sites-available/standart-kalip /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 7. SSL Sertifikası

```bash
certbot --nginx -d decayazilim.com.tr -d www.decayazilim.com.tr -d api.decayazilim.com.tr
```

### 8. DNS Kayıtları

Domain sağlayıcınızda aşağıdaki A kayıtlarını ekleyin:
```
A     decayazilim.com.tr          104.247.163.244
A     www.decayazilim.com.tr      104.247.163.244
A     api.decayazilim.com.tr      104.247.163.244
```

---

## 🔧 Local Development

### Hızlı Başlangıç
```bash
# Hızlı kurulum
./scripts/quick-start.sh

# Veya manuel
cp env.local.example .env.local
# .env.local dosyasını düzenleyin
./local-dev.sh start
```

### Erişim URL'leri
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

---

## 📊 Monitoring ve Bakım

### Container loglarını izleme:
```bash
docker-compose logs -f
```

### Servisleri yeniden başlatma:
```bash
docker-compose restart
```

### Backup oluşturma:
```bash
/usr/local/bin/backup-standart-kalip.sh
```

### SSL sertifikası yenileme:
```bash
certbot renew --dry-run
```

---

## 🚨 Sorun Giderme

### Container'lar çalışmıyor:
```bash
docker-compose down
docker-compose up -d --build
```

### Nginx hatası:
```bash
nginx -t
systemctl status nginx
systemctl restart nginx
```

### Database bağlantı sorunu:
```bash
docker exec -it standart-kalip-mongo mongo
```

### SSL sertifikası sorunu:
```bash
certbot certificates
certbot delete --cert-name decayazilim.com.tr
# Tekrar kurulum
```

### Log dosyalarını kontrol etme:
```bash
# Application logs
docker-compose logs backend
docker-compose logs frontend

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# System logs
journalctl -u nginx
journalctl -u docker
```

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- GitHub Issues oluşturun
- Email: admin@decayazilim.com.tr

---

## ✅ Deployment Kontrol Listesi

- [ ] `.env.production` dosyası yapılandırıldı
- [ ] DNS kayıtları eklendi
- [ ] Sunucu hazırlığı tamamlandı
- [ ] Docker container'ları çalışıyor
- [ ] SSL sertifikası kuruldu
- [ ] Website erişilebilir (https://decayazilim.com.tr)
- [ ] API erişilebilir (https://api.decayazilim.com.tr)
- [ ] Admin paneli çalışıyor
- [ ] Backup sistem çalışıyor
- [ ] Monitoring kuruldu

**Tebrikler! 🎉 Standart Kalıp artık production'da çalışıyor.**
