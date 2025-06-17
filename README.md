# Standart Kalıp E-Commerce Platform

Modern ve responsive e-ticaret platformu - Kalıp endüstrisi için özel tasarlanmış.

## 🚀 Netlify Deployment

Bu proje Netlify'de serverless functions ile deploy edilmeye hazırdır.

### Otomatik Deployment

1. **GitHub Repository'yi Netlify'e bağlayın**
2. **Build Settings:**
   - Build command: `npm ci && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

### Environment Variables

Netlify dashboard'da şu environment variables'ları ekleyin:

```bash
# Backend Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/standart-kalip

# Environment
NODE_ENV=production

# Frontend URL (Netlify'den alınan URL)
FRONTEND_URL=https://your-site-name.netlify.app

# Stripe (opsiyonel)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Netlify otomatik ayarlar
VITE_API_BASE_URL=/.netlify/functions/api
NETLIFY=true
```

### 📋 Deployment Checklist

- [x] ✅ Netlify.toml konfigürasyonu
- [x] ✅ Serverless functions optimizasyonu
- [x] ✅ CORS ayarları
- [x] ✅ Build optimizasyonu
- [x] ✅ Security headers
- [x] ✅ Environment variables template

### 🔧 Local Development

```bash
# Tüm dependencies'leri yükle
npm run install:all

# Development mode (frontend + backend)
npm run dev

# Sadece frontend
npm run frontend

# Sadece backend
npm run backend
```

### 📁 Project Structure

```
standart-kalip/
├── frontend/           # React + Vite frontend
├── backend/           # Express.js API
├── netlify/
│   └── functions/     # Serverless functions
├── netlify.toml       # Netlify configuration
└── package.json       # Root package.json
```

### 🌐 API Endpoints

Production'da API endpoints:
- Base URL: `https://your-site-name.netlify.app/.netlify/functions/api`
- Health Check: `/.netlify/functions/api/health`
- Categories: `/.netlify/functions/api/categories`
- Products: `/.netlify/functions/api/products`
- Blogs: `/.netlify/functions/api/blogs`

### 🛠️ Technologies

**Frontend:**
- React 18
- Vite
- Ant Design
- React Router DOM
- Framer Motion

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Netlify Functions
- Serverless HTTP

### 📱 Features

- 📊 Admin Panel
- 🛒 Shopping Cart
- 📝 Blog System
- 📁 Category Management
- 🔍 Product Search
- 📞 Contact Forms
- 📱 Responsive Design
- 🔒 Authentication
- 💳 Stripe Integration

### 🚀 Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/standart-kalip)

### 📞 Support

Teknik destek için: [info@standartkalip.com](mailto:info@standartkalip.com)

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
