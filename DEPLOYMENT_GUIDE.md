# Standart Kalıp - Vercel Deployment Kılavuzu

## Gerekli Hazırlıklar

### 1. MongoDB Atlas Kurulumu
- [MongoDB Atlas](https://cloud.mongodb.com) hesabı oluşturun
- Yeni bir cluster oluşturun
- Database user oluşturun
- Network Access'ten IP adreslerinizi ekleyin (0.0.0.0/0 tüm IP'ler için)
- Connection string'inizi alın: `mongodb+srv://username:password@cluster.mongodb.net/standart-kalip`

### 2. Vercel Hesabı
- [Vercel](https://vercel.com) hesabı oluşturun
- GitHub ile bağlantı kurun

## Deployment Adımları

### 1. Kodunuzu GitHub'a Push Edin
```bash
git add .
git commit -m "Vercel deployment hazırlığı"
git push origin main
```

### 2. Vercel'de Proje Oluşturun
1. Vercel Dashboard'a gidin
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Framework Preset: "Other" seçin
5. Root Directory: `./` (boş bırakın)
6. Build Command: `npm run vercel-build`
7. Output Directory: `frontend/dist`
8. Install Command: `npm run install-all`

### 3. Environment Variables'ları Ekleyin

#### Backend Environment Variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/standart-kalip
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-project-name.vercel.app
```

#### Frontend Environment Variables:
```
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

### 4. Vercel Deploy
- "Deploy" butonuna tıklayın
- İlk deployment'ın tamamlanmasını bekleyin

### 5. Domain Ayarlama (Opsiyonel)
- Vercel Dashboard'da project settings'e gidin
- Domains sekmesine tıklayın
- Özel domain ekleyebilirsiniz

## Deployment Sonrası Kontroller

### 1. API Health Check
```
https://your-domain.vercel.app/api/health
```

### 2. Frontend Kontrolü
- Ana sayfa yüklenebiliyor mu?
- API çağrıları çalışıyor mu?
- Veritabanı bağlantısı var mı?

## Sorun Giderme

### 1. Build Hataları
- Vercel Function Logs'u kontrol edin
- Console.log'ları inceleyin

### 2. Database Bağlantı Sorunları
- MongoDB Atlas IP whitelist'ini kontrol edin
- Connection string'in doğru olduğundan emin olun

### 3. CORS Hataları
- Frontend URL'in environment variables'ta doğru tanımlandığından emin olun
- Server.js'teki CORS ayarlarını kontrol edin

## Performans Optimizasyonu

### 1. Caching
- Static dosyalar otomatik olarak cache'lenir
- API responses için cache headers ekleyebilirsiniz

### 2. Bundle Size
- Frontend build size'ı optimize edilmiş durumda
- Gereksiz dependencies'leri kaldırın

## Monitoring

### 1. Vercel Analytics
- Vercel dashboard'da analytics'i aktif edin

### 2. Error Tracking
- Sentry gibi error tracking servisleri entegre edebilirsiniz

## Database Seeding

İlk deployment sonrası:
1. Database otomatik olarak seed edilecek
2. Gerekirse manual olarak seed scriptlerini çalıştırabilirsiniz

## Güvenlik

1. Environment variables'larınızı güvenli tutun
2. MongoDB Atlas'ta güçlü şifreler kullanın
3. Production'da debug mode'unu kapatın
4. HTTPS kullanmaya özen gösterin

## Backup

1. MongoDB Atlas otomatik backup yapar
2. Code'unuzu GitHub'da versiyonlayın
3. Environment variables'larınızı güvenli bir yerde saklayın

## Support

Sorun yaşarsanız:
1. Vercel logs'unu kontrol edin
2. MongoDB Atlas metrics'lerini inceleyin
3. Browser console'unu kontrol edin
