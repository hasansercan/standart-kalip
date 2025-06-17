# 🚀 Vercel Deployment Checklist

## ✅ Hazırlık Aşaması (Tamamlandı)

- [x] Root package.json oluşturuldu
- [x] vercel.json yapılandırıldı
- [x] Backend server.js Vercel uyumlu hale getirildi
- [x] Frontend vite.config.js optimize edildi
- [x] Upload middleware Vercel için düzenlendi
- [x] .gitignore güncellendi
- [x] Build test başarıyla çalıştı

## 📋 Deployment Öncesi Yapılacaklar

### 1. MongoDB Atlas Kurulumu
- [ ] MongoDB Atlas hesabı oluştur
- [ ] Cluster oluştur (Free tier M0 yeterli)
- [ ] Database user oluştur (güçlü şifre)
- [ ] Network Access'te IP whitelist ayarla (0.0.0.0/0)
- [ ] Connection string'i al

### 2. GitHub Repository Hazırlığı
```bash
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### 3. Vercel'de Proje Oluştur
1. [Vercel.com](https://vercel.com)'a git
2. "New Project" → GitHub repo'yu seç
3. **Önemli Ayarlar:**
   - Framework Preset: **Other**
   - Root Directory: `./` (boş bırak)
   - Build Command: `npm run vercel-build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm run install-all`

### 4. Environment Variables Ekle

#### Backend (.env):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/standart-kalip
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-project-name.vercel.app
```

#### Frontend:
```
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

## 🎯 Deployment Adımları

### 1. First Deploy
- [ ] "Deploy" butonuna tıkla
- [ ] Build logları izle
- [ ] Hata varsa düzelt

### 2. Domain Ayarla
- [ ] Vercel'den otomatik domain al
- [ ] İsteğe bağlı: Custom domain ekle

### 3. Test Et
- [ ] Ana sayfa açılıyor mu?
- [ ] API endpoints çalışıyor mu?
- [ ] Database bağlantısı var mı?

## 🧪 Test URLs

### Health Check:
```
https://your-domain.vercel.app/api/health
```

### API Test:
```
https://your-domain.vercel.app/api/categories
https://your-domain.vercel.app/api/products
https://your-domain.vercel.app/api/blogs/published
```

## ⚠️ Önemli Notlar

### File Upload Sorunu
- Vercel serverless functions'ta dosya sistemi read-only
- Production'da Cloudinary veya AWS S3 kullanın
- Şu anda memory storage kullanıyor (geçici çözüm)

### Performance
- Build output 955KB (optimize edilmiş)
- Code splitting active
- Chunk'lar optimize edildi

### Security
- CORS properly configured
- Environment variables secure
- HTTPS enforced

## 🔧 Sorun Giderme

### Build Fails:
1. Vercel logs kontrol et
2. Local'de `npm run test-build` çalıştır
3. Dependencies kontrol et

### API Errors:
1. Environment variables kontrol et
2. MongoDB connection string kontrol et
3. CORS settings kontrol et

### Frontend Issues:
1. VITE_API_BASE_URL doğru mu?
2. Build artifacts kontrol et
3. Browser console kontrol et

## 📊 Monitoring

### Vercel Dashboard'da İzle:
- [ ] Function logs
- [ ] Analytics
- [ ] Performance metrics
- [ ] Error tracking

## 🚀 Go Live Checklist

- [ ] All tests passed
- [ ] Performance optimized
- [ ] Security configured
- [ ] Monitoring active
- [ ] Domain configured
- [ ] SSL certificate active

## 🎉 Success!

Deployment başarılı olduğunda:
1. Domain'inizi test edin
2. Tüm features'ı kontrol edin
3. Performance'ı monitör edin
4. Backup planınızı hazırlayın

---

**📞 Support:** Sorun yaşarsanız DEPLOYMENT_GUIDE.md dosyasındaki troubleshooting bölümünü kontrol edin.
