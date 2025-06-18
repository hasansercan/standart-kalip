const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Cloudinary yapılandırması (sadece production'da kullanılacak)
let cloudinary = null;
let cloudinaryConfigured = false;

if (process.env.NODE_ENV === 'production') {
    try {
        // Environment variables'ları kontrol et
        const hasRequiredVars = process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET;

        if (hasRequiredVars) {
            cloudinary = require('cloudinary').v2;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
            cloudinaryConfigured = true;
            console.log('✅ Cloudinary configured successfully');
        } else {
            console.warn('⚠️ Cloudinary environment variables not found. Using fallback mode.');
            console.warn('Missing variables:', {
                CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
                CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
                CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
            });
        }
    } catch (error) {
        console.error('❌ Cloudinary configuration failed:', error.message);
        cloudinaryConfigured = false;
    }
}

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

// Memory storage for Cloudinary (production)
const memoryStorage = multer.memoryStorage();

const sliderStorage = createDiskStorage('slider');
const categoryStorage = createDiskStorage('categories');
const blogStorage = createDiskStorage('blogs');

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

// Ortama göre storage seçimi
const getStorage = (folderType) => {
    if (process.env.NODE_ENV === 'production' && cloudinaryConfigured) {
        return memoryStorage;
    }

    switch (folderType) {
        case 'slider': return sliderStorage;
        case 'categories': return categoryStorage;
        case 'blogs': return blogStorage;
        default: return sliderStorage;
    }
};

// Slider multer yapılandırması
const sliderUpload = multer({
    storage: getStorage('slider'),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Kategori multer yapılandırması
const categoryUpload = multer({
    storage: getStorage('categories'),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Blog multer yapılandırması
const blogUpload = multer({
    storage: getStorage('blogs'),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Cloudinary'ye dosya yükleme fonksiyonu
const uploadToCloudinary = (buffer, folder, filename) => {
    return new Promise((resolve, reject) => {
        if (!cloudinaryConfigured) {
            reject(new Error('Cloudinary not configured. Please set environment variables.'));
            return;
        }

        const uploadOptions = {
            folder: `standart-kalip/${folder}`,
            public_id: filename.split('.')[0], // Extension olmadan
            resource_type: 'auto',
            overwrite: true
        };

        cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer);
    });
};

module.exports = {
    sliderUpload,
    categoryUpload,
    blogUpload,
    uploadToCloudinary,
    cloudinary: cloudinary,
    cloudinaryConfigured
};
