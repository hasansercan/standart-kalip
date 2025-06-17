const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const categoryData = [
    {
        name: "Ejektör Pimler",
        img: "/img/categories/categories1.png"
    },
    {
        name: "Sıkıştırma Yayları",
        img: "/img/categories/categories2.png"
    },
    {
        name: "Çekme Yayları",
        img: "/img/categories/categories3.png"
    },
    {
        name: "Gaz Yayları",
        img: "/img/categories/categories4.png"
    },
    {
        name: "Kovan ve Burçlar",
        img: "/img/categories/categories5.png"
    },
    {
        name: "Yağlama Sistemi",
        img: "/img/categories/categories6.png"
    },
    {
        name: "Plaket ve Bloklar",
        img: "/img/categories/categories7.png"
    },
    {
        name: "Vida ve Civata",
        img: "/img/categories/categories1.png"
    },
    {
        name: "Sıhhi Tesisat",
        img: "/img/categories/categories2.png"
    },
    {
        name: "Özel Üretim",
        img: "/img/categories/categories3.png"
    }
];

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB'ye bağlandı");

        // Mevcut kategori verilerini sil
        await Category.deleteMany({});
        console.log("Mevcut kategori verileri silindi");

        // Yeni kategori verilerini ekle
        await Category.insertMany(categoryData);
        console.log("Kategori verileri başarıyla eklendi");

        mongoose.connection.close();
        console.log("Veritabanı bağlantısı kapatıldı");
    } catch (error) {
        console.error("Seed işlemi sırasında hata:", error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedCategories();
}

module.exports = { seedCategories, categoryData };
