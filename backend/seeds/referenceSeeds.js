const mongoose = require("mongoose");
const Reference = require("../models/Reference.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const references = [
    {
        name: "Arıkan Metal",
        logo: "/img/brands/brand1.png",
        sector: "Otomotiv",
        description: "Otomotiv sektöründe kalıp çözümleri sunduğumuz güvenilir iş ortağımız.",
        website: "https://www.arikanmetal.com",
        sortOrder: 1,
        isActive: true
    },
    {
        name: "Alba Plastik",
        logo: "/img/brands/brand2.png",
        sector: "Plastik",
        description: "Plastik enjeksiyon kalıpları alanında işbirliği yaptığımız öncü firma.",
        website: "https://www.albaplastik.com",
        sortOrder: 2,
        isActive: true
    },
    {
        name: "Ege Otomotiv",
        logo: "/img/brands/brand3.png",
        sector: "Otomotiv",
        description: "Otomotiv yan sanayi için özel kalıp çözümleri geliştirdiğimiz firma.",
        website: "https://www.egeotomotiv.com",
        sortOrder: 3,
        isActive: true
    },
    {
        name: "Akoğlu Sanayi",
        logo: "/img/brands/brand4.png",
        sector: "Sanayi",
        description: "Endüstriyel kalıp üretiminde uzun soluklu işbirliğimiz bulunan firma.",
        website: "https://www.akoglus anayi.com",
        sortOrder: 4,
        isActive: true
    },
    {
        name: "AK-Pres",
        logo: "/img/brands/brand5.png",
        sector: "Pres",
        description: "Pres kalıpları ve özel imalat projelerinde çalıştığımız deneyimli firma.",
        website: "https://www.ak-pres.com",
        sortOrder: 5,
        isActive: true
    },
    {
        name: "Ak Teknik",
        logo: "/img/brands/brand1.png",
        sector: "Teknik",
        description: "Teknik kalıp çözümleri konusunda uzmanlaşmış değerli müşterimiz.",
        website: "https://www.akteknik.com",
        sortOrder: 6,
        isActive: true
    },
    {
        name: "AKA Otomotiv",
        logo: "/img/brands/brand2.png",
        sector: "Otomotiv",
        description: "Otomotiv sektöründe kalite odaklı projeler geliştirdiğimiz firma.",
        website: "https://www.akaotomotiv.com",
        sortOrder: 7,
        isActive: true
    },
    {
        name: "AK Yapak",
        logo: "/img/brands/brand3.png",
        sector: "Tekstil",
        description: "Tekstil endüstrisi için özel kalıp çözümleri sunduğumuz firma.",
        website: "https://www.akyapak.com",
        sortOrder: 8,
        isActive: true
    },
    {
        name: "Metal Sanayi A.Ş.",
        logo: "/img/brands/brand4.png",
        sector: "Metal",
        description: "Metal işleme sektöründe kalıp teknolojileri geliştirdiğimiz kurum.",
        website: "https://www.metalsanayi.com",
        sortOrder: 9,
        isActive: true
    },
    {
        name: "Teknik Makina",
        logo: "/img/brands/brand5.png",
        sector: "Makina",
        description: "Makina imalat sektöründe özel kalıp projelerinde işbirliği yaptığımız firma.",
        website: "https://www.teknikmakina.com",
        sortOrder: 10,
        isActive: true
    },
    {
        name: "Endüstri Grup",
        logo: "/img/brands/brand1.png",
        sector: "Endüstri",
        description: "Çeşitli endüstriyel alanlarda kalıp çözümleri sunduğumuz grup şirketi.",
        website: "https://www.endustrigrup.com",
        sortOrder: 11,
        isActive: true
    },
    {
        name: "Kalıp Teknoloji",
        logo: "/img/brands/brand2.png",
        sector: "Kalıp",
        description: "Kalıp teknolojileri alanında Ar-Ge çalışmaları yürüttüğümüz iş ortağımız.",
        website: "https://www.kalipteknoloji.com",
        sortOrder: 12,
        isActive: true
    },
    {
        name: "Bosch Türkiye",
        logo: "/img/brands/brand3.png",
        sector: "Otomotiv",
        description: "Otomotiv ve endüstriyel çözümler alanında global iş ortağımız.",
        website: "https://www.bosch.com.tr",
        sortOrder: 13,
        isActive: false
    },
    {
        name: "Ford Otosan",
        logo: "/img/brands/brand4.png",
        sector: "Otomotiv",
        description: "Otomotiv üretiminde kalıp çözümleri geliştirdiğimiz önde gelen marka.",
        website: "https://www.fordotosan.com.tr",
        sortOrder: 14,
        isActive: false
    },
    {
        name: "Vestel Elektronik",
        logo: "/img/brands/brand5.png",
        sector: "Elektronik",
        description: "Elektronik ürün kalıpları konusunda işbirliği yaptığımız teknoloji şirketi.",
        website: "https://www.vestel.com.tr",
        sortOrder: 15,
        isActive: false
    }
];

const seedReferences = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Mevcut referans verilerini sil
        await Reference.deleteMany({});
        // Yeni referans verilerini ekle
        await Reference.insertMany(references);
        mongoose.connection.close();
        } catch (error) {
        process.exit(1);
    }
};

if (require.main === module) {
    seedReferences();
}

module.exports = { seedReferences, references };
