const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary konfigürasyonu
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage oluştur
const createCloudinaryStorage = (folder) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `standart-kalip/${folder}`,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        },
    });
};

// Vercel için memory storage kullanıyoruz (file system read-only)
// Production'da Cloudinary, AWS S3 veya benzeri cloud storage kullanılmalı
const memoryStorage = multer.memoryStorage();

// Geliştirme ortamı için disk storage
const createDiskStorage = (folder) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(__dirname, `../../frontend/public/img/${folder}`);
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const randomName = crypto.randomBytes(16).toString('hex');
            const extension = path.extname(file.originalname);
            cb(null, randomName + extension);
        }
    });
};

// Storage seçimi - production'da cloudinary, development'ta disk
const getStorage = (folder) => {
    // Eğer Cloudinary config varsa kullan
    if (process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET) {
        return createCloudinaryStorage(folder);
    }

    // Production'da memory (geçici), development'ta disk
    return process.env.NODE_ENV === 'production' ? memoryStorage : createDiskStorage(folder);
};

const sliderStorage = getStorage('slider');
const categoryStorage = getStorage('categories');
const blogStorage = getStorage('blogs');

// Dosya filtresi - sadece resim dosyaları
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Sadece resim dosyaları yüklenebilir!'));
    }
};

// Slider multer yapılandırması
const sliderUpload = multer({
    storage: sliderStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Kategori multer yapılandırması
const categoryUpload = multer({
    storage: categoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Blog multer yapılandırması
const blogUpload = multer({
    storage: blogStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

module.exports = {
    sliderUpload,
    categoryUpload,
    blogUpload,
    cloudinary
};
