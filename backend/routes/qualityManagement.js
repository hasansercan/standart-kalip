const express = require('express');
const router = express.Router();
const QualityManagement = require('../models/QualityManagement');

// Tüm kalite kategorilerini getir (public)
router.get('/', async (req, res) => {
    try {
        const categories = await QualityManagement.getActiveCategories();
        res.json(categories);
    } catch (error) {
        console.error('Quality categories fetch error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Admin için tüm kategorileri getir
router.get('/admin', async (req, res) => {
    try {
        const categories = await QualityManagement.find().sort({ order: 1, createdAt: -1 });
        res.json(categories);
    } catch (error) {
        console.error('Admin quality categories fetch error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Belirli bir kategoriyi getir
router.get('/:id', async (req, res) => {
    try {
        const category = await QualityManagement.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }
        res.json(category);
    } catch (error) {
        console.error('Quality category fetch error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Slug ile kategori getir
router.get('/slug/:slug', async (req, res) => {
    try {
        const category = await QualityManagement.findOne({
            slug: req.params.slug,
            isActive: true
        });
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }
        res.json(category);
    } catch (error) {
        console.error('Quality category by slug fetch error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Yeni kategori oluştur
router.post('/', async (req, res) => {
    try {
        const { name, content, icon, color, order, metadata } = req.body;

        // Aynı isimde kategori var mı kontrol et
        const existingCategory = await QualityManagement.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Bu isimde bir kategori zaten mevcut' });
        }

        const newCategory = new QualityManagement({
            name,
            content,
            icon: icon || 'bi-check-circle',
            color: color || '#8B1538',
            order: order || 0,
            metadata: metadata || {}
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error('Quality category create error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Geçersiz veri',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Kategori güncelle
router.put('/:id', async (req, res) => {
    try {
        const { name, content, icon, color, order, isActive, metadata } = req.body;

        // Aynı isimde başka kategori var mı kontrol et
        const existingCategory = await QualityManagement.findOne({
            name,
            _id: { $ne: req.params.id }
        });
        if (existingCategory) {
            return res.status(400).json({ message: 'Bu isimde bir kategori zaten mevcut' });
        }

        const updatedCategory = await QualityManagement.findByIdAndUpdate(
            req.params.id,
            {
                name,
                content,
                icon,
                color,
                order,
                isActive,
                metadata
            },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error('Quality category update error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Geçersiz veri',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Kategori durumu değiştir (aktif/pasif)
router.patch('/:id/toggle', async (req, res) => {
    try {
        const category = await QualityManagement.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        category.isActive = !category.isActive;
        const updatedCategory = await category.save();

        res.json({
            message: `Kategori ${updatedCategory.isActive ? 'aktif' : 'pasif'} hale getirildi`,
            category: updatedCategory
        });
    } catch (error) {
        console.error('Quality category toggle error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Kategori sil
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await QualityManagement.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }

        res.json({
            message: 'Kategori başarıyla silindi',
            category: deletedCategory
        });
    } catch (error) {
        console.error('Quality category delete error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Dashboard istatistikleri
router.get('/stats/dashboard', async (req, res) => {
    try {
        const [totalCategories, activeCategories] = await Promise.all([
            QualityManagement.countDocuments(),
            QualityManagement.countDocuments({ isActive: true })
        ]);

        res.json({
            totalCategories,
            activeCategories,
            inactiveCategories: totalCategories - activeCategories
        });
    } catch (error) {
        console.error('Quality categories stats error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
