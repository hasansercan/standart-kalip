const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Slider dosya storage yapılandırması
const sliderStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Frontend'in public/img/slider klasörüne kaydet
        const uploadPath = path.join(__dirname, '../../frontend/public/img/slider');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Random isim oluştur
        const randomName = crypto.randomBytes(16).toString('hex');
        const extension = path.extname(file.originalname);
        cb(null, randomName + extension);
    }
});

// Kategori dosya storage yapılandırması
const categoryStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../frontend/public/img/categories');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const randomName = crypto.randomBytes(16).toString('hex');
        const extension = path.extname(file.originalname);
        cb(null, randomName + extension);
    }
});

// Blog dosya storage yapılandırması
const blogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../frontend/public/img/blogs');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const randomName = crypto.randomBytes(16).toString('hex');
        const extension = path.extname(file.originalname);
        cb(null, randomName + extension);
    }
});

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
    blogUpload
};
