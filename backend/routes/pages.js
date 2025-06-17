const express = require("express");
const router = express.Router();
const Page = require("../models/Page.js");

// Tüm sayfaları getir (Public)
router.get("/", async (req, res) => {
    try {
        const pages = await Page.find({ isActive: true }).sort({ order: 1 });
        res.status(200).json(pages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Slug'a göre sayfa getir (Public)
router.get("/:slug", async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug, isActive: true });

        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }

        res.status(200).json(page);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Admin Routes

// Tüm sayfaları getir (Admin)
router.get("/admin/all", async (req, res) => {
    try {
        const pages = await Page.find().sort({ order: 1 });
        res.status(200).json(pages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// ID'ye göre sayfa getir (Admin)
router.get("/admin/:id", async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }

        res.status(200).json(page);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Yeni sayfa oluştur (Admin)
router.post("/", async (req, res) => {
    try {
        const { title, slug, content, metaTitle, metaDescription, isActive, order } = req.body;

        // Slug benzersizliği kontrolü
        const existingPage = await Page.findOne({ slug });
        if (existingPage) {
            return res.status(400).json({ error: "Bu slug zaten kullanılıyor" });
        }

        const newPage = new Page({
            title,
            slug,
            content,
            metaTitle,
            metaDescription,
            isActive,
            order
        });

        const savedPage = await newPage.save();
        res.status(201).json(savedPage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Sayfa güncelle (Admin)
router.put("/:id", async (req, res) => {
    try {
        const pageId = req.params.id;
        const { title, slug, content, metaTitle, metaDescription, isActive, order } = req.body;

        // Slug benzersizliği kontrolü (kendi ID'si hariç)
        const existingPage = await Page.findOne({
            slug,
            _id: { $ne: pageId }
        });
        if (existingPage) {
            return res.status(400).json({ error: "Bu slug zaten kullanılıyor" });
        }

        const updatedPage = await Page.findByIdAndUpdate(
            pageId,
            {
                title,
                slug,
                content,
                metaTitle,
                metaDescription,
                isActive,
                order
            },
            { new: true }
        );

        if (!updatedPage) {
            return res.status(404).json({ error: "Page not found" });
        }

        res.status(200).json(updatedPage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Sayfa sil (Admin)
router.delete("/:id", async (req, res) => {
    try {
        const deletedPage = await Page.findByIdAndDelete(req.params.id);

        if (!deletedPage) {
            return res.status(404).json({ error: "Page not found" });
        }

        res.status(200).json({ message: "Page deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
