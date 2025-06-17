const mongoose = require("mongoose");
const Slider = require("../models/Slider");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const sliderData = [
    {
        title: "Standart Kalıp'tan Özel Çözümler",
        subtitle: "Kalite ve Güvenilirlik",
        description: "En kaliteli malzemeler ile üretilen özel kalıp çözümlerimizi keşfedin. Uzman ekibimizle projelerinizi hayata geçirin.",
        image: "/img/slider/slider1.jpg",
        link: "/products",
        buttonText: "Ürünleri İncele",
        isActive: true,
        order: 1
    },
    {
        title: "Endüstriyel Kalıp Çözümleri",
        subtitle: "Profesyonel Hizmet",
        description: "Endüstriyel ihtiyaçlarınız için özel tasarlanmış kalıp çözümlerimiz ile üretim süreçlerinizi optimize edin.",
        image: "/img/slider/slider2.jpg",
        link: "/services",
        buttonText: "Hizmetlerimiz",
        isActive: true,
        order: 2
    },
    {
        title: "Teknoloji ve İnovasyon",
        subtitle: "Gelecek Burada",
        description: "Son teknoloji makinelerimiz ve uzman kadromuzla en karmaşık projeleri bile zamanında teslim ediyoruz.",
        image: "/img/slider/slider3.jpg",
        link: "/about",
        buttonText: "Hakkımızda",
        isActive: true,
        order: 3
    },
    {
        title: "Kalite Sertifikaları",
        subtitle: "Güvenilir Kalite",
        description: "ISO standartlarında üretim yapan firmamız, tüm projelerinde kalite güvencesi sunar.",
        image: "/img/slider/slider1.jpg",
        link: "/certificates",
        buttonText: "Sertifikalar",
        isActive: false,
        order: 4
    }
];

const seedSliders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB'ye bağlandı");

        // Mevcut slider verilerini sil
        await Slider.deleteMany({});
        console.log("Mevcut slider verileri silindi");

        // Yeni slider verilerini ekle
        await Slider.insertMany(sliderData);
        console.log("Slider verileri başarıyla eklendi");

        mongoose.connection.close();
        console.log("Veritabanı bağlantısı kapatıldı");
    } catch (error) {
        console.error("Seed işlemi sırasında hata:", error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedSliders();
}

module.exports = { seedSliders, sliderData };
