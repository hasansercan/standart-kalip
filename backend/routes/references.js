const express = require("express");
const router = express.Router();
const Reference = require("../models/Reference.js");
const { categoryUpload } = require("../middleware/upload.js");

// Yeni bir referans oluşturma (Create)
router.post("/", async (req, res) => {
    try {
        const { name, logo, sector, description, website, sortOrder, isActive } = req.body;

        const newReference = new Reference({
            name,
            logo,
            sector,
            description,
            website,
            sortOrder,
            isActive
        });
        await newReference.save();

        res.status(201).json(newReference);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Tüm referansları getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const references = await Reference.find();

        res.status(200).json(references);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Aktif referansları getirme (Frontend için)
router.get("/active", async (req, res) => {
    try {
        const activeReferences = await Reference.find({ isActive: true }).sort({ sortOrder: 1 });

        res.status(200).json(activeReferences);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir referansı getirme (Read - Single)
router.get("/:referenceId", async (req, res) => {
    try {
        const referenceId = req.params.referenceId;

        try {
            const reference = await Reference.findById(referenceId);

            res.status(200).json(reference);
        } catch (error) {
            res.status(404).json({ error: "Reference not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Referans güncelleme (Update)
router.put("/:referenceId", async (req, res) => {
    try {
        const referenceId = req.params.referenceId;
        const updates = req.body;

        const existingReference = await Reference.findById(referenceId);

        if (!existingReference) {
            return res.status(404).json({ error: "Reference not found." });
        }

        const updatedReference = await Reference.findByIdAndUpdate(
            referenceId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedReference);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Referans silme (Delete)
router.delete("/:referenceId", async (req, res) => {
    try {
        const referenceId = req.params.referenceId;

        const deletedReference = await Reference.findByIdAndRemove(referenceId);

        if (!deletedReference) {
            return res.status(404).json({ error: "Reference not found." });
        }

        res.status(200).json(deletedReference);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Referans logo yükleme endpoint'i
router.post("/upload", categoryUpload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Dosya yüklenmedi" });
        }

        // Cloudinary kullanılıyorsa URL'i al, değilse local path kullan
        let imagePath;
        if (req.file.path && req.file.path.includes('cloudinary')) {
            // Cloudinary URL'i
            imagePath = req.file.path;
        } else {
            // Local dosya yolu (development için)
            imagePath = `/img/brands/${req.file.filename}`;
        }

        res.status(200).json({
            message: "Dosya başarıyla yüklendi",
            imagePath: imagePath,
            filename: req.file.filename || req.file.public_id
        });
    } catch (error) {
        console.error('Reference upload error:', error);
        res.status(500).json({ error: "Dosya yükleme hatası: " + error.message });
    }
});

module.exports = router;
