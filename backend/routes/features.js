const express = require("express");
const router = express.Router();
const Feature = require("../models/Feature.js");

// Yeni bir feature oluşturma (Create)
router.post("/", async (req, res) => {
    try {
        const { title, description, icon, isActive } = req.body;

        const newFeature = new Feature({ title, description, icon, isActive });
        await newFeature.save();

        res.status(201).json(newFeature);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Tüm feature'ları getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const features = await Feature.find();

        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Sadece aktif feature'ları getirme (Read - Active)
router.get("/active", async (req, res) => {
    try {
        const features = await Feature.find({ isActive: true });

        res.status(200).json(features);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir feature'ı getirme (Read - Single)
router.get("/:featureId", async (req, res) => {
    try {
        const featureId = req.params.featureId;

        try {
            const feature = await Feature.findById(featureId);

            if (!feature) {
                return res.status(404).json({ error: "Feature not found." });
            }

            res.status(200).json(feature);
        } catch (error) {
            res.status(404).json({ error: "Feature not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Feature güncelleme (Update)
router.put("/:featureId", async (req, res) => {
    try {
        const featureId = req.params.featureId;
        const updates = req.body;

        const existingFeature = await Feature.findById(featureId);

        if (!existingFeature) {
            return res.status(404).json({ error: "Feature not found." });
        }

        const updatedFeature = await Feature.findByIdAndUpdate(
            featureId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedFeature);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Feature silme (Delete)
router.delete("/:featureId", async (req, res) => {
    try {
        const featureId = req.params.featureId;

        const deletedFeature = await Feature.findByIdAndRemove(featureId);

        if (!deletedFeature) {
            return res.status(404).json({ error: "Feature not found." });
        }

        res.status(200).json(deletedFeature);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
