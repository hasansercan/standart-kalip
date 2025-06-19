# Ubuntu Deployment Kontrol Listesi

## 📋 Ön Hazırlık (Local)

- [ ] Proje klonlandı
- [ ] `env.production.example` dosyası `backend/.env` olarak kopyalandı
- [ ] Environment dosyasındaki değerler dolduruldu:
  - [ ] JWT_SECRET (32+ karakter)
  - [ ] CLOUDINARY değerleri
  - [ ] STRIPE_SECRET_KEY (live key)
  - [ ] Diğer production değerler

## 🖥️ Sunucu Hazırlığı

- [ ] SSH bağlantısı test edildi: `ssh root@104.247.163.244`
- [ ] Sistem güncellendi: `apt update && apt upgrade -y`
- [ ] Node.js 18+ kuruldu
- [ ] MongoDB kuruldu ve başlatıldı
- [ ] Nginx kuruldu
- [ ] PM2 kuruldu: `npm install -g pm2`
- [ ] Firewall ayarları yapıldı

## 📁 Proje Kurulumu

- [ ] Proje dizini oluşturuldu: `/var/www/standart-kalip`
- [ ] Proje dosyaları yüklendi (Git clone veya SCP)
- [ ] Environment dosyası kopyalandı ve düzenlendi
- [ ] Backend dependencies kuruldu: `npm install --production`
- [ ] Frontend build edildi: `npm run build`

## 🌐 Web Server Konfigürasyonu

- [ ] Nginx konfigürasyonu kopyalandı: `/etc/nginx/sites-available/standart-kalip`
- [ ] Site aktifleştirildi: `/etc/nginx/sites-enabled/standart-kalip`
- [ ] Default site kaldırıldı: `rm /etc/nginx/sites-enabled/default`
- [ ] Nginx konfigürasyonu test edildi: `nginx -t`
- [ ] Nginx yeniden başlatıldı: `systemctl restart nginx`

## 🚀 Uygulama Başlatma

- [ ] PM2 ecosystem dosyası oluşturuldu
- [ ] Log dizini oluşturuldu: `/var/log/standart-kalip`
- [ ] Backend PM2 ile başlatıldı: `pm2 start ecosystem.config.js`
- [ ] PM2 ayarları kaydedildi: `pm2 save && pm2 startup`

## 🔒 SSL ve Domain

- [ ] DNS kayıtları eklendi:
  - [ ] A decayazilim.com → 104.247.163.244
  - [ ] A www.decayazilim.com → 104.247.163.244
  - [ ] A api.decayazilim.com → 104.247.163.244
- [ ] DNS propagation beklendi (1-24 saat)
- [ ] Certbot kuruldu: `apt install certbot python3-certbot-nginx`
- [ ] SSL sertifikası alındı: `certbot --nginx -d decayazilim.com -d www.decayazilim.com -d api.decayazilim.com`
- [ ] Otomatik yenileme ayarlandı: `crontab -e`

## ✅ Test ve Doğrulama

- [ ] Website erişilebilir: https://decayazilim.com
- [ ] WWW subdomain çalışıyor: https://www.decayazilim.com
- [ ] API endpoint çalışıyor: https://api.decayazilim.com/api/health
- [ ] Admin paneli erişilebilir: https://decayazilim.com/admin
- [ ] HTTPS redirect çalışıyor (HTTP → HTTPS)
- [ ] MongoDB bağlantısı çalışıyor
- [ ] Backend logları temiz: `pm2 logs`
- [ ] Nginx logları temiz: `tail -f /var/log/nginx/error.log`

## 📊 Monitoring Kurulumu

- [ ] PM2 monitoring aktif: `pm2 status`
- [ ] Log dosyaları okunabilir
- [ ] MongoDB durumu kontrol edildi: `systemctl status mongod`
- [ ] Nginx durumu kontrol edildi: `systemctl status nginx`

## 🔧 Son Kontroller

- [ ] Firewall aktif: `ufw status`
- [ ] Sistem servisleri auto-start: `systemctl enable mongod nginx`
- [ ] PM2 startup script kuruldu
- [ ] Backup stratejisi planlandı

---

## 🚨 Hata Durumunda

### Backend Çalışmıyor
```bash
pm2 logs standart-kalip-backend
pm2 restart standart-kalip-backend
```

### Nginx 502 Hatası
```bash
nginx -t
systemctl status nginx
systemctl restart nginx
```

### MongoDB Bağlantı Hatası
```bash
systemctl status mongod
systemctl restart mongod
```

### SSL Sertifika Hatası
```bash
certbot certificates
certbot renew --force-renewal
```

---

## 📝 Notlar

- Backend port: 5000
- MongoDB port: 27017 (sadece localhost)
- Frontend build path: `/var/www/standart-kalip/frontend/dist`
- Log path: `/var/log/standart-kalip/`
- Environment file: `/var/www/standart-kalip/backend/.env`

**Deployment tamamlandığında bu listedeki tüm maddeler işaretlenmiş olmalıdır.**
