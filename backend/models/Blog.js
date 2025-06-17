const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true }, // Kısa açıklama
        featuredImage: { type: String, required: true }, // Ana resim
        author: { type: String, required: true, default: "Admin" },
        tags: [{ type: String }], // Etiketler
        category: { type: String, required: true }, // Blog kategorisi
        isPublished: { type: Boolean, default: true },
        readTime: { type: Number, default: 5 }, // Dakika cinsinden okuma süresi
        views: { type: Number, default: 0 }, // Görüntülenme sayısı
    },
    { timestamps: true }
);

// Slug oluşturma middleware'i
BlogSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
        this.slug = this.title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
