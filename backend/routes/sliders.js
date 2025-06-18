const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider.js");
const { sliderUpload } = require("../middleware/upload.js");

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

// Dosya yükleme endpoint'i
router.post("/upload", sliderUpload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Dosya yüklenmedi" });
        }

        // Dosya yolu frontend'e göre ayarla
        const imagePath = `/img/slider/${req.file.filename}`;

        res.status(200).json({
            message: "Dosya başarıyla yüklendi",
            imagePath: imagePath,
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: "Dosya yükleme hatası" });
    }
});

module.exports = router;
