# Standart Kalıp E-Commerce Platform

Modern, full-stack e-commerce platformu. React frontend ve Node.js backend ile geliştirilmiştir.

## 🚀 Proje Yapısı

```
standart-kalip/
├── backend/           # Node.js API Server
├── frontend/          # React.js Client
├── package.json       # Root package (Monorepo)
└── README.md         # Bu dosya
```

## 🛠️ Teknolojiler

### Backend
- **Node.js** & **Express.js** - API Server
- **MongoDB** & **Mongoose** - Veritabanı
- **Stripe** - Ödeme sistemi
- **Multer** - Dosya yükleme
- **JWT** - Kimlik doğrulama

### Frontend
- **React.js** & **Vite** - Modern frontend
- **React Router** - Sayfa yönlendirme
- **Ant Design** - UI komponentleri
- **Framer Motion** - Animasyonlar
- **React Slick** - Slider
- **Recharts** - Grafikler

## 📦 Kurulum

### 1. Proje dosyalarını indirin
```bash
git clone <repository-url>
cd standart-kalip
```

### 2. Tüm bağımlılıkları yükleyin
```bash
npm run install:all
```

### 3. Environment dosyalarını ayarlayın

**Backend için (.env dosyası oluşturun):**
```bash
cd backend
cp env.example .env
# .env dosyasını düzenleyerek gerçek değerlerinizi girin
```

**Frontend için (.env dosyası oluşturun):**
```bash
cd frontend
cp env.example .env
# .env dosyasını düzenleyerek gerçek değerlerinizi girin
```

### 4. Veritabanını başlatın (MongoDB)
```bash
# MongoDB'nin kurulu ve çalışır durumda olduğundan emin olun
```

### 5. Geliştirme sunucusunu başlatın
```bash
# Hem frontend hem backend'i aynı anda çalıştır
npm run dev

# Veya ayrı ayrı:
npm run backend   # Sadece backend
npm run frontend  # Sadece frontend
```

## 🔧 Kullanılabilir Komutlar

### Root seviyede (Monorepo)
```bash
npm run dev          # Frontend ve backend'i aynı anda çalıştır
npm run start        # Sadece backend'i production modunda çalıştır
npm run build        # Frontend'i build et
npm run install:all  # Tüm bağımlılıkları yükle
npm run clean        # Tüm node_modules'leri temizle
```

### Backend (/backend)
```bash
npm start           # Production server
npm run dev         # Development server (nodemon)
npm run seed        # Veritabanına örnek veri ekle
npm run clean       # node_modules temizle
```

### Frontend (/frontend)
```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Build'i önizleme
npm run clean       # Dosyaları temizle
```

## 🌐 Portlar

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📂 Özellikler

### E-Commerce
- ✅ Ürün katalogu
- ✅ Kategori yönetimi
- ✅ Sepet işlemleri
- ✅ Stripe ile ödeme
- ✅ Kullanıcı kayıt/giriş

### CMS
- ✅ Blog yönetimi
- ✅ Sayfa yönetimi
- ✅ Slider yönetimi
- ✅ Referans yönetimi
- ✅ Program yönetimi

### Admin Panel
- ✅ Tüm içerik yönetimi
- ✅ Kullanıcı yönetimi
- ✅ Sipariş takibi
- ✅ Dashboard

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Bcrypt ile şifre hashleme
- CORS koruması
- Input validation

## 📈 Production Deployment

Proje Vercel'de deploy edilmeye hazırdır:

1. `vercel.json` konfigürasyonu mevcut
2. `npm run vercel-build` komutu ile build
3. Environment variable'ları production'da ayarlayın

## 📝 Lisans

ISC License

## 👥 Geliştirici

**Standart Kalıp**
