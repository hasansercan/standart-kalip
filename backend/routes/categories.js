const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");
const { categoryUpload } = require("../middleware/upload.js");

// Yeni bir kategori oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm kategorileri getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir kategoriyi getirme (Read - Single)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    try {
      const category = await Category.findById(categoryId);

      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori güncelleme (Update)
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori silme (Delete)
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kategori dosya yükleme endpoint'i
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
      imagePath = `/img/categories/${req.file.filename}`;
    }

    res.status(200).json({
      message: "Dosya başarıyla yüklendi",
      imagePath: imagePath,
      filename: req.file.filename || req.file.public_id
    });
  } catch (error) {
    console.error('Category upload error:', error);
    res.status(500).json({ error: "Dosya yükleme hatası: " + error.message });
  }
});

module.exports = router;
