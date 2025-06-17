const mongoose = require("mongoose");
const Feature = require("../models/Feature");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const featureData = [
    {
        title: "Yüksek Kalite",
        description: "Premium malzemelerle üretilen dayanıklı ve güvenilir ürünler",
        icon: "fa-award",
        isActive: true
    },
    {
        title: "Hızlı Teslimat",
        description: "24-48 saat içinde kapınızda, hızlı ve güvenli kargo ile",
        icon: "fa-shipping-fast",
        isActive: true
    },
    {
        title: "Uzman Destek",
        description: "7/24 teknik destek hizmeti ve uzman danışmanlık",
        icon: "fa-headset",
        isActive: true
    },
    {
        title: "Özel Üretim",
        description: "İhtiyaçlarınıza özel tasarım ve üretim hizmetleri",
        icon: "fa-cogs",
        isActive: true
    },
    {
        title: "Geniş Ürün Yelpazesi",
        description: "Endüstriyel ihtiyaçlarınız için geniş ürün seçenekleri",
        icon: "fa-boxes",
        isActive: true
    },
    {
        title: "Uygun Fiyat",
        description: "Kaliteli ürünleri en uygun fiyatlarla sunuyoruz",
        icon: "fa-dollar-sign",
        isActive: true
    },
    {
        title: "ISO Sertifikalı",
        description: "Kalite standartlarına uygun sertifikalı üretim",
        icon: "fa-certificate",
        isActive: true
    },
    {
        title: "Güvenli Ödeme",
        description: "SSL sertifikalı güvenli ödeme sistemi ile korumalı alışveriş",
        icon: "fa-shield-alt",
        isActive: true
    }
];

const seedFeatures = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Mevcut feature verilerini sil
        await Feature.deleteMany({});
        // Yeni feature verilerini ekle
        await Feature.insertMany(featureData);
        mongoose.connection.close();
        } catch (error) {
        process.exit(1);
    }
};

if (require.main === module) {
    seedFeatures();
}

module.exports = { seedFeatures, featureData };
