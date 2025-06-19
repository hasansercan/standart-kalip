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
- ✅ Docker desteği
- ✅ SSL sertifikası
- ✅ Production ready

## 📋 Gereksinimler

### Local Development
- Node.js 18+
- npm 8+
- MongoDB (Docker ile otomatik kurulum)

### Production Deployment
- Ubuntu 20.04+ sunucu
- Docker & Docker Compose
- Nginx
- SSL sertifikası (Let's Encrypt)

## 🛠️ Local Development

### Hızlı Başlangıç

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd standart-kalip
```

2. **Environment dosyasını yapılandırın:**
```bash
cp .env.local.example .env.local
# .env.local dosyasını düzenleyin
```

3. **Development sunucularını başlatın:**
```bash
chmod +x local-dev.sh
./local-dev.sh start
```

4. **Uygulamaya erişin:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

### Manuel Kurulum

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

`.env.local` dosyasında aşağıdaki değişkenleri yapılandırın:

```env
# Database
MONGO_URI=mongodb://localhost:27017/standart_kalip_dev

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary (Görsel yükleme)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (Ödeme)
STRIPE_SECRET_KEY=sk_test_your_test_key

# API URL
VITE_API_BASE_URL=http://localhost:5000
```

## 🌐 Production Deployment

### Otomatik Deployment

1. **Environment dosyasını yapılandırın:**
```bash
cp .env.production.example .env.production
# .env.production dosyasını production değerleri ile düzenleyin
```

2. **Deployment script'ini çalıştırın:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Manuel Deployment

#### 1. Sunucu Hazırlığı

Ubuntu sunucunuzda:
```bash
# Dosyaları sunucuya yükleyin
scp -r . root@104.247.163.244:/var/www/standart-kalip/

# Sunucuya bağlanın
ssh root@104.247.163.244

# Kurulum script'ini çalıştırın
cd /var/www/standart-kalip
chmod +x setup-server.sh
./setup-server.sh
```

#### 2. Environment Yapılandırması

`.env.production` dosyasını production değerleri ile düzenleyin:
```env
MONGO_URI=mongodb://standart-kalip-mongo:27017/standart_kalip
JWT_SECRET=very_secure_production_key
FRONTEND_URL=https://decayazilim.com.tr
VITE_API_BASE_URL=https://api.decayazilim.com.tr
```

#### 3. Docker Containers Başlatma

```bash
docker-compose --env-file .env.production up -d --build
```

#### 4. SSL Sertifikası Kurulumu

```bash
certbot --nginx -d decayazilim.com.tr -d www.decayazilim.com.tr
```

#### 5. DNS Yapılandırması

Domain sağlayıcınızda aşağıdaki kayıtları ekleyin:
```
A     decayazilim.com.tr          104.247.163.244
A     www.decayazilim.com.tr      104.247.163.244
A     api.decayazilim.com.tr      104.247.163.244
```

## 📊 Monitoring & Maintenance

### Logları İzleme
```bash
# Tüm servislerin logları
docker-compose logs -f

# Sadece backend logları
docker-compose logs -f backend

# Sadece frontend logları
docker-compose logs -f frontend
```

### Backup
```bash
# Otomatik backup (günlük)
/usr/local/bin/backup-standart-kalip.sh

# Manuel backup
docker exec standart-kalip-mongo mongodump --out /tmp/backup
```

### Servis Yönetimi
```bash
# Servisleri yeniden başlat
systemctl restart standart-kalip

# Servis durumunu kontrol et
systemctl status standart-kalip

# Servisleri durdur
docker-compose down

# Servisleri güncelle
docker-compose up -d --build
```

## 🔧 Development Commands

```bash
# Local development başlat
./local-dev.sh start

# Development durdur
./local-dev.sh stop

# Development yeniden başlat
./local-dev.sh restart

# Logları göster
./local-dev.sh logs

# Backend seed data
cd backend && npm run seed

# Frontend build
cd frontend && npm run build

# Dependency temizliği
cd backend && npm run clean
cd frontend && npm run clean
```

## 📁 Proje Yapısı

```
standart-kalip/
├── backend/                 # Node.js/Express API
│   ├── api/                # API rotaları
│   ├── middleware/         # Middleware'ler
│   ├── models/            # MongoDB modelleri
│   ├── routes/            # Route tanımları
│   ├── seeds/             # Veritabanı seed dosyaları
│   └── server.js          # Ana sunucu dosyası
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React componentleri
│   │   ├── pages/         # Sayfa componentleri
│   │   ├── config/        # Konfigürasyon dosyaları
│   │   └── context/       # React context'leri
│   └── dist/              # Build çıktısı
├── docker-compose.yml      # Docker Compose
├── Dockerfile             # Backend Dockerfile
├── deploy.sh              # Deployment script
├── setup-server.sh        # Sunucu kurulum script
├── local-dev.sh          # Local development script
├── .env.production       # Production environment
├── .env.local           # Local environment
└── README.md            # Bu dosya
```

## 🔐 Güvenlik

- ✅ JWT tabanlı kimlik doğrulama
- ✅ Helmet.js güvenlik başlıkları
- ✅ Rate limiting
- ✅ MongoDB injection koruması
- ✅ CORS yapılandırması
- ✅ SSL/TLS sertifikası
- ✅ Environment variable'lar ile hassas veri koruması

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- Issue oluşturun
- Email: admin@decayazilim.com.tr

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

**Standart Kalıp E-Commerce Platform** - Modern, güvenli ve ölçeklenebilir e-ticaret çözümü.
