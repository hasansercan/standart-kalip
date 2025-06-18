const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js");
const { blogUpload } = require("../middleware/upload.js");

// Blog resmi yükleme endpoint'i
router.post("/upload", blogUpload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Resim dosyası yüklenmedi." });
        }

        // Frontend'te kullanılacak resim yolu
        const imagePath = `/img/blogs/${req.file.filename}`;

        res.status(200).json({
            message: "Resim başarıyla yüklendi.",
            imagePath: imagePath,
            fileName: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: "Resim yükleme sırasında hata oluştu." });
    }
});

// Yeni bir blog oluşturma (Create)
router.post("/", async (req, res) => {
    try {
        const { title, content, excerpt, featuredImage, author, tags, category, isPublished, readTime } = req.body;

        const newBlog = new Blog({
            title,
            content,
            excerpt,
            featuredImage,
            author,
            tags,
            category,
            isPublished,
            readTime
        });

        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Tüm blogları getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Sadece yayınlanmış blogları getirme (Read - Published)
router.get("/published", async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Slug ile blog getirme (Read - Single by Slug) - SEO için
router.get("/slug/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;

        const blog = await Blog.findOne({ slug: slug });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        // Görüntülenme sayısını artır
        blog.views += 1;
        await blog.save();

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// ID ile blog getirme (Read - Single by ID) - Admin için
router.get("/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ error: "Blog not found." });
    }
});

// Blog güncelleme (Update)
router.put("/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const updates = req.body;

        const existingBlog = await Blog.findById(blogId);

        if (!existingBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Blog silme (Delete)
router.delete("/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const deletedBlog = await Blog.findByIdAndRemove(blogId);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        res.status(200).json(deletedBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Kategoriye göre blog getirme
router.get("/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const blogs = await Blog.find({
            category: category,
            isPublished: true
        }).sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// Tag'e göre blog getirme
router.get("/tag/:tag", async (req, res) => {
    try {
        const tag = req.params.tag;
        const blogs = await Blog.find({
            tags: tag,
            isPublished: true
        }).sort({ createdAt: -1 });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
