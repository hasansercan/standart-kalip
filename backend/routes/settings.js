const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings.js");

// Tüm ayarları getir
router.get("/", async (req, res) => {
    try {
        const settings = await Settings.find();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
});

// Belirli bir ayarı getir
router.get("/:key", async (req, res) => {
    try {
        const setting = await Settings.findOne({ settingKey: req.params.key });
        if (!setting) {
            return res.status(404).json({ error: "Ayar bulunamadı." });
        }
        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
});

// Yeni ayar oluştur veya güncelle
router.post("/", async (req, res) => {
    try {
        const { settingKey, settingValue, description } = req.body;

        // Var olan ayarı bul ve güncelle, yoksa yeni oluştur
        const setting = await Settings.findOneAndUpdate(
            { settingKey },
            { settingValue, description },
            { new: true, upsert: true }
        );

        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
});

// Ayar güncelle
router.put("/:key", async (req, res) => {
    try {
        const { settingValue, description } = req.body;

        const setting = await Settings.findOneAndUpdate(
            { settingKey: req.params.key },
            { settingValue, description },
            { new: true }
        );

        if (!setting) {
            return res.status(404).json({ error: "Ayar bulunamadı." });
        }

        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
});

// Ayar sil
router.delete("/:key", async (req, res) => {
    try {
        const setting = await Settings.findOneAndDelete({ settingKey: req.params.key });

        if (!setting) {
            return res.status(404).json({ error: "Ayar bulunamadı." });
        }

        res.status(200).json({ message: "Ayar başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
});

module.exports = router;
