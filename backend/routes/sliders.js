const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider.js");
const { sliderUpload, uploadToCloudinary, cloudinary, cloudinaryConfigured } = require("../middleware/upload.js");

// Tüm sliderları getir (sıralı olarak)
router.get("/", async (req, res) => {
    try {
        const sliders = await Slider.find().sort({ order: 1 });
        res.status(200).json(sliders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Aktif sliderları getir
router.get("/active", async (req, res) => {
    try {
        const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
        res.status(200).json(sliders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Tek slider getir
router.get("/:sliderId", async (req, res) => {
    try {
        const sliderId = req.params.sliderId;
        const slider = await Slider.findById(sliderId);

        if (!slider) {
            return res.status(404).json({ error: "Slider not found" });
        }

        res.status(200).json(slider);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Yeni slider oluştur
router.post("/", async (req, res) => {
    try {
        const {
            title,
            subtitle,
            description,
            image,
            link,
            buttonText,
            isActive,
            order
        } = req.body;

        const newSlider = new Slider({
            title,
            subtitle,
            description,
            image,
            link,
            buttonText,
            isActive,
            order
        });

        await newSlider.save();
        res.status(201).json(newSlider);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Slider güncelle
router.put("/:sliderId", async (req, res) => {
    try {
        const sliderId = req.params.sliderId;
        const updates = req.body;

        const existingSlider = await Slider.findById(sliderId);
        if (!existingSlider) {
            return res.status(404).json({ error: "Slider not found" });
        }

        const updatedSlider = await Slider.findByIdAndUpdate(
            sliderId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedSlider);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Slider sil
router.delete("/:sliderId", async (req, res) => {
    try {
        const sliderId = req.params.sliderId;

        const deletedSlider = await Slider.findByIdAndDelete(sliderId);
        if (!deletedSlider) {
            return res.status(404).json({ error: "Slider not found" });
        }

        res.status(200).json(deletedSlider);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Dosya yükleme endpoint'i (Mevcut - Local dosya sistemi için)
router.post("/upload", sliderUpload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Dosya yüklenmedi" });
        }

        // Local dosya yolu
        const imagePath = `/img/slider/${req.file.filename}`;

        res.status(200).json({
            message: "Dosya başarıyla yüklendi",
            imagePath: imagePath,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: "Dosya yükleme hatası: " + error.message });
    }
});

// YENİ: Cloudinary upload endpoint'i (Production/Netlify için)
router.post("/upload-cloud", sliderUpload.single('image'), async (req, res) => {
    try {
        console.log('🔄 Upload-cloud endpoint called');
        console.log('Environment:', {
            NODE_ENV: process.env.NODE_ENV,
            cloudinaryConfigured: cloudinaryConfigured,
            hasFile: !!req.file
        });

        if (!req.file) {
            return res.status(400).json({ error: "Dosya yüklenmedi" });
        }

        // Production'da Cloudinary kullanmaya çalış
        if (process.env.NODE_ENV === 'production') {
            if (cloudinaryConfigured) {
                try {
                    console.log('☁️ Uploading to Cloudinary...');
                    const result = await uploadToCloudinary(
                        req.file.buffer,
                        'slider',
                        req.file.originalname
                    );

                    console.log('✅ Cloudinary upload successful:', result.public_id);
                    res.status(200).json({
                        message: "Dosya başarıyla Cloudinary'ye yüklendi",
                        imagePath: result.secure_url,
                        cloudinaryId: result.public_id,
                        filename: result.public_id
                    });
                } catch (cloudinaryError) {
                    console.error('❌ Cloudinary upload error:', cloudinaryError);

                    // Cloudinary hatası durumunda fallback bilgisi ver
                    res.status(500).json({
                        error: "Cloudinary yükleme hatası: " + cloudinaryError.message,
                        fallback: "Lütfen environment variables'ları kontrol edin",
                        details: {
                            cloudinaryConfigured: cloudinaryConfigured,
                            environment: process.env.NODE_ENV
                        }
                    });
                }
            } else {
                // Cloudinary konfigüre edilmemişse bilgi ver
                console.warn('⚠️ Cloudinary not configured in production');
                res.status(503).json({
                    error: "Cloudinary konfigürasyonu eksik",
                    message: "Production ortamında Cloudinary environment variables gerekli",
                    required: [
                        "CLOUDINARY_CLOUD_NAME",
                        "CLOUDINARY_API_KEY",
                        "CLOUDINARY_API_SECRET"
                    ],
                    current: {
                        CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
                        CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
                        CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
                    }
                });
            }
        } else {
            // Development'ta fallback olarak local storage kullan
            console.log('💻 Using local storage fallback');
            const imagePath = `/img/slider/${req.file.filename}`;
            res.status(200).json({
                message: "Dosya başarıyla yüklendi (local fallback)",
                imagePath: imagePath,
                filename: req.file.filename,
                note: "Development mode - using local storage"
            });
        }
    } catch (error) {
        console.error('💥 General upload error:', error);
        res.status(500).json({
            error: "Dosya yükleme hatası: " + error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

module.exports = router;
