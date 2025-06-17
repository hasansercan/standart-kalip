const mongoose = require("mongoose");
const Program = require("../models/Program.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const programs = [
    {
        name: "Standart Kalıp CAD Program",
        version: "v2.5.1",
        description: "Endüstriyel kalıp tasarımı ve üretimi için özel olarak geliştirilmiş profesyonel CAD yazılımı. Tüm kalıp elemanlarınızı kolayca tasarlayın ve optimize edin.",
        features: [
            "Gelişmiş 3D Kalıp Tasarım Araçları",
            "Otomatik Hesaplama Modülleri",
            "Standart Parça Kütüphanesi",
            "Teknik Çizim ve Raporlama",
            "Maliyet Analizi Araçları"
        ],
        systemRequirements: [
            "Windows 10/11 (64-bit)",
            "8 GB RAM (16 GB önerilen)",
            "DirectX 11 uyumlu ekran kartı",
            "10 GB boş disk alanı"
        ],
        downloadLink: "#",
        fileSize: "2.8 GB",
        lastUpdate: "15 Ocak 2024",
        isActive: true
    },
    {
        name: "Standart Kalıp CAD Pro",
        version: "v3.0.0",
        description: "Profesyonel kalıp tasarımcıları için gelişmiş özellikler sunan premium CAD yazılımı. Endüstri 4.0 teknolojileri ile entegre çalışır.",
        features: [
            "Yapay Zeka Destekli Tasarım Önerileri",
            "Bulut Tabanlı İşbirliği Araçları",
            "Gerçek Zamanlı Simülasyon",
            "Otomatik Optimizasyon Algoritmaları",
            "IoT Entegrasyonu",
            "Gelişmiş Raporlama ve Analitik"
        ],
        systemRequirements: [
            "Windows 10/11 (64-bit)",
            "16 GB RAM (32 GB önerilen)",
            "NVIDIA RTX 3060 veya üzeri",
            "20 GB boş disk alanı",
            "İnternet bağlantısı (bulut özellikleri için)"
        ],
        downloadLink: "#",
        fileSize: "4.2 GB",
        lastUpdate: "10 Mart 2024",
        isActive: false
    }
];

const seedPrograms = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Mevcut program verilerini sil
        await Program.deleteMany({});
        // Yeni program verilerini ekle
        await Program.insertMany(programs);
        mongoose.connection.close();
        } catch (error) {
        process.exit(1);
    }
};

if (require.main === module) {
    seedPrograms();
}

module.exports = { seedPrograms, programs };
