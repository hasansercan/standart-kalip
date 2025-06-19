const Job = require("../models/Job.js");

const jobs = [
    {
        title: "CNC Operatörü",
        department: "Üretim",
        location: "İstanbul, Türkiye",
        type: "full-time",
        experience: "2-4 yıl",
        salary: "15.000 - 20.000 TL",
        description: "Kalıp üretiminde kullanılan CNC tezgahlarının operasyonunu gerçekleştirecek deneyimli operatör arayışımız bulunmaktadır.",
        requirements: [
            "En az lise mezunu",
            "CNC tezgah kullanımında minimum 2 yıl deneyim",
            "Teknik resim okuyabilme",
            "Hassas ölçüm aletlerini kullanabilme",
            "Vardiyalı çalışmaya uygun"
        ],
        responsibilities: [
            "CNC tezgahların programlanması ve operasyonu",
            "Kalite kontrolü ve ölçüm işlemleri",
            "Tezgah bakım ve temizlik işleri",
            "Üretim raporlarının tutulması",
            "İş güvenliği kurallarına uyum"
        ],
        benefits: [
            "SGK + Özel sağlık sigortası",
            "Yemek kartı",
            "Servis imkanı",
            "Yıllık izin + Mazeret izni",
            "Performans primi"
        ],
        isActive: true,
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
        postedBy: "İK Departmanı"
    },
    {
        title: "Kalıp Tasarım Mühendisi",
        department: "Mühendislik",
        location: "İstanbul, Türkiye",
        type: "full-time",
        experience: "3-6 yıl",
        salary: "25.000 - 35.000 TL",
        description: "Plastik enjeksiyon kalıplarının tasarımını yapacak deneyimli mühendis arayışımız bulunmaktadır.",
        requirements: [
            "Makine Mühendisliği mezunu",
            "SolidWorks, AutoCAD programlarında deneyim",
            "Plastik enjeksiyon kalıp tasarımında minimum 3 yıl tecrübe",
            "Mold Flow analizi yapabilme",
            "İngilizce seviyesi orta düzeyde"
        ],
        responsibilities: [
            "3D kalıp tasarımı ve modelleme",
            "Teknik çizim ve üretim dokümanları hazırlama",
            "Müşteri talepleri doğrultusunda ürün analizi",
            "Kalıp imalat sürecinin takibi",
            "Test ve revizyon süreçlerinin yönetimi"
        ],
        benefits: [
            "Özel sağlık sigortası",
            "Yemek kartı",
            "Eğitim ve gelişim destekleri",
            "Flexible working",
            "Yıllık performans primi"
        ],
        isActive: true,
        applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 gün sonra
        postedBy: "Mühendislik Departmanı"
    },
    {
        title: "Kalite Kontrol Uzmanı",
        department: "Kalite",
        location: "İstanbul, Türkiye",
        type: "full-time",
        experience: "1-3 yıl",
        salary: "18.000 - 25.000 TL",
        description: "Üretilen kalıpların kalite kontrol süreçlerini yönetecek uzman arayışımız bulunmaktadır.",
        requirements: [
            "Endüstri Mühendisliği veya ilgili bölüm mezunu",
            "Kalite yönetim sistemleri hakkında bilgi",
            "Ölçüm cihazları kullanımında deneyim",
            "ISO 9001 sertifikası (tercih sebebi)",
            "Detay odaklı çalışma"
        ],
        responsibilities: [
            "Gelen malzeme kalite kontrolü",
            "Üretim süreçlerinin kalite takibi",
            "Kalite raporlarının hazırlanması",
            "Müşteri şikayetlerinin incelenmesi",
            "Düzeltici ve önleyici faaliyetler"
        ],
        benefits: [
            "SGK + Özel sağlık sigortası",
            "Yemek kartı",
            "Servis imkanı",
            "Eğitim olanakları",
            "Kariyer gelişim programları"
        ],
        isActive: true,
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 gün sonra
        postedBy: "Kalite Departmanı"
    },
    {
        title: "Satış Temsilcisi",
        department: "Satış",
        location: "İstanbul, Türkiye",
        type: "full-time",
        experience: "2-5 yıl",
        salary: "20.000 - 30.000 TL + Komisyon",
        description: "Kalıp sektöründe müşteri ilişkileri yönetimi ve satış faaliyetlerini gerçekleştirecek temsilci arayışımız bulunmaktadır.",
        requirements: [
            "Üniversite mezunu (tercihen teknik)",
            "B2B satış deneyimi",
            "Müşteri ilişkileri yönetimi becerisi",
            "Saha çalışmasına uygun",
            "Ehliyet sahibi (B sınıfı)"
        ],
        responsibilities: [
            "Potansiyel müşteri ziyaretleri",
            "Teknik sunumlar ve teklif hazırlama",
            "Mevcut müşteri ilişkilerinin geliştirilmesi",
            "Pazar araştırması ve analizi",
            "Satış hedeflerinin takibi"
        ],
        benefits: [
            "Araç tahsisi",
            "Yüksek komisyon oranları",
            "Saha tazminatı",
            "Özel sağlık sigortası",
            "Başarı primleri"
        ],
        isActive: true,
        applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 gün sonra
        postedBy: "Satış Departmanı"
    },
    {
        title: "Stajyer Mühendis",
        department: "Mühendislik",
        location: "İstanbul, Türkiye",
        type: "internship",
        experience: "Stajyer",
        salary: "Görüşülür",
        description: "Kalıp tasarım ve üretim süreçlerini öğrenmek isteyen mühendislik öğrencilerine staj imkanı sunuyoruz.",
        requirements: [
            "Makine/Endüstri Mühendisliği öğrencisi",
            "3. veya 4. sınıf öğrencisi",
            "CAD programlarına ilgi",
            "Öğrenme motivasyonu yüksek",
            "Takım çalışmasına yatkın"
        ],
        responsibilities: [
            "Mühendislere yardımcı olma",
            "Basit tasarım işleri",
            "Dokümantasyon hazırlama",
            "Üretim süreçlerini gözlemleme",
            "Proje takibi"
        ],
        benefits: [
            "Staj ücreti",
            "Yemek imkanı",
            "Mentörlük programı",
            "Sertifika",
            "İş imkanı (başarılı olanlara)"
        ],
        isActive: true,
        applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 gün sonra
        postedBy: "İK Departmanı"
    }
];

const seedJobs = async () => {
    try {
        await Job.deleteMany({});

        for (const jobData of jobs) {
            const job = new Job(jobData);
            await job.save();
        }

        console.log("✅ Job seeds başarıyla eklendi");
    } catch (error) {
        console.error("❌ Job seeds eklenirken hata:", error);
    }
};

module.exports = seedJobs;
