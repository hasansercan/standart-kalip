const QualityManagement = require('../models/QualityManagement');

const qualityCategories = [
    {
        name: "Kalite Politikası",
        slug: "kalite-politikasi",
        order: 1,
        isActive: true,
        icon: "bi-award",
        color: "#8B1538",
        content: {
            title: "Kalite Politikamız",
            description: "Kalıp Standart Elemanları, Kalıp, Özel Amaçlı Makine ve Aparat Tasarımı, İmalatı, Tedarığı ve Satışı'nın yapılması konularında faaliyet gösteren firmamız kuruluşun amaç ve bağlamına uygun ve stratejik yönünü destekleyecek şekilde Kalite Yönetim Sistemini en üst düzeye ulaştırabilmek için aşağıdaki hususlar doğrultusunda politikasını belirlemiştir;",
            points: [
                "Müşterilerimizin ihtiyaç ve beklentilerinin en iyi kalitede, en uygun fiyat ve sürede karşılanması,",
                "Çalışanlarımızın eğitim ve motivasyonunun sağlanması,",
                "Tüm çalışanlarımızın katılımı,",
                "Tedarikçilerimizle işbirliği,",
                "Kaynaklarımızın verimli yönetimi,",
                "Ekip çalışması yaklaşımı,",
                "ISO 9001:2015 Kalite Yönetim Sistemi kapsamındaki uygulanabilir olarak belirlenen şartları yerine getirme ve sistemini sürekli olarak iyileştirme"
            ]
        },
        metadata: {
            metaTitle: "Kalite Politikası - Standart Kalıp",
            metaDescription: "25 yıllık deneyimimizle oluşturduğumuz kalite politikamız ve sürekli iyileştirme anlayışımız.",
            keywords: ["kalite politikası", "ISO 9001", "kalite yönetimi", "sürekli iyileştirme"]
        }
    },
    {
        name: "Kalite Sertifikaları",
        slug: "kalite-sertifikalari",
        order: 2,
        isActive: true,
        icon: "bi-certificate",
        color: "#059669",
        content: {
            title: "Kalite Sertifikalarımız",
            description: "Firmamız kalite yönetim sistemleri ve ürün standartları konusunda uluslararası geçerliliğe sahip sertifikalara sahiptir.",
            points: [
                "ISO 9001:2015 Kalite Yönetim Sistemi Sertifikası",
                "ISO 14001:2015 Çevre Yönetim Sistemi Sertifikası",
                "OHSAS 18001 İş Sağlığı ve Güvenliği Yönetim Sistemi",
                "CE Uygunluk Belgesi (Avrupa Birliği Standartları)",
                "TSE ISO 3834 Kaynak Kalite Yönetim Sistemi",
                "API Q1 Petrol ve Doğalgaz Endüstrisi Kalite Yönetim Sistemi"
            ]
        },
        metadata: {
            metaTitle: "Kalite Sertifikaları - Standart Kalıp",
            metaDescription: "Uluslararası geçerliliğe sahip kalite sertifikalarımız ve uyguladığımız standartlar.",
            keywords: ["ISO 9001", "ISO 14001", "OHSAS 18001", "CE belgesi", "kalite sertifikaları"]
        }
    },
    {
        name: "Laboratuvar",
        slug: "laboratuvar",
        order: 3,
        isActive: true,
        icon: "bi-gear",
        color: "#7C3AED",
        content: {
            title: "Kalite Kontrol Laboratuvarımız",
            description: "Modern teknoloji ile donatılmış laboratuvarımızda, üretim sürecinin her aşamasında kalite kontrol testleri gerçekleştirilmektedir.",
            points: [
                "Malzeme Analiz ve Test Cihazları",
                "Boyutsal Ölçüm ve Kontrol Sistemleri",
                "Yüzey Pürüzlülük Ölçüm Cihazları",
                "Sertlik Test Cihazları (Rockwell, Brinell, Vickers)",
                "Çekme ve Basma Test Makinaları",
                "Metalografik İnceleme Mikroskopları",
                "Spektrometre (Malzeme Kompozisyon Analizi)",
                "Koordinat Ölçüm Makinası (CMM)"
            ]
        },
        metadata: {
            metaTitle: "Kalite Kontrol Laboratuvarı - Standart Kalıp",
            metaDescription: "Modern teknolojik ekipmanlarla donatılmış kalite kontrol laboratuvarımız ve test imkanlarımız.",
            keywords: ["kalite kontrol", "laboratuvar", "test cihazları", "malzeme analizi"]
        }
    },
    {
        name: "Kalite Prosedürleri",
        slug: "kalite-prosedurleri",
        order: 4,
        isActive: true,
        icon: "bi-list-check",
        color: "#DC2626",
        content: {
            title: "Kalite Kontrol Prosedürlerimiz",
            description: "Üretim sürecinin her aşamasında uygulanan detaylı kalite kontrol prosedürlerimiz:",
            points: [
                "Hammadde Giriş Kontrol Prosedürleri",
                "Süreç İçi Kalite Kontrol Adımları",
                "Son Ürün Muayene ve Test Prosedürleri",
                "Hatalı Ürün Değerlendirme ve Düzeltici Faaliyet Prosedürleri",
                "Müşteri Şikayet Yönetim Prosedürleri",
                "Kalibrasyon ve Validasyon Prosedürleri"
            ]
        },
        metadata: {
            metaTitle: "Kalite Kontrol Prosedürleri - Standart Kalıp",
            metaDescription: "Üretim sürecinin her aşamasında uygulanan detaylı kalite kontrol prosedürlerimiz.",
            keywords: ["kalite prosedürleri", "üretim kontrolü", "kalite güvencesi", "prosedür yönetimi"]
        }
    },
    {
        name: "Sürekli İyileştirme",
        slug: "surekli-iyilestirme",
        order: 5,
        isActive: true,
        icon: "bi-arrow-up-circle",
        color: "#F59E0B",
        content: {
            title: "Sürekli İyileştirme Faaliyetlerimiz",
            description: "Kalite yönetim sistemimizi sürekli geliştirmek için gerçekleştirdiğimiz faaliyetler:",
            points: [
                "Düzenli İç Denetim Faaliyetleri",
                "Yönetimin Gözden Geçirme Toplantıları",
                "Çalışan Öneri Sistemi",
                "Müşteri Memnuniyet Anketleri",
                "Tedarikçi Değerlendirme ve Geliştirme Programları",
                "Eğitim ve Yetkinlik Geliştirme Programları",
                "Risk Analizi ve Fırsat Değerlendirmeleri"
            ]
        },
        metadata: {
            metaTitle: "Sürekli İyileştirme - Standart Kalıp",
            metaDescription: "Kalite yönetim sistemimizi sürekli geliştirmek için uyguladığımız iyileştirme faaliyetleri.",
            keywords: ["sürekli iyileştirme", "iç denetim", "müşteri memnuniyeti", "kalite geliştirme"]
        }
    },
    {
        name: "Ar-Ge ve İnovasyon",
        slug: "ar-ge-ve-inovasyon",
        order: 6,
        isActive: true,
        icon: "bi-lightbulb",
        color: "#06B6D4",
        content: {
            title: "Ar-Ge ve İnovasyon Faaliyetlerimiz",
            description: "Teknoloji ve inovasyona dayalı sürekli gelişim için yürüttüğümüz araştırma ve geliştirme çalışmaları:",
            points: [
                "Yeni Malzeme ve Teknoloji Araştırmaları",
                "Ürün Geliştirme ve İyileştirme Projeleri",
                "Müşteri Odaklı Çözüm Geliştirme",
                "Dijital Dönüşüm ve Endüstri 4.0 Uygulamaları",
                "Sürdürülebilir Üretim Teknolojileri",
                "Akademik İşbirlikleri ve Proje Ortaklıkları",
                "Patent ve Fikri Mülkiyet Geliştirme"
            ]
        },
        metadata: {
            metaTitle: "Ar-Ge ve İnovasyon - Standart Kalıp",
            metaDescription: "Teknoloji ve inovasyona dayalı araştırma geliştirme faaliyetlerimiz ve yenilikçi çözümlerimiz.",
            keywords: ["ar-ge", "inovasyon", "teknoloji", "ürün geliştirme", "endüstri 4.0"]
        }
    }
];

const seedQualityManagement = async () => {
    try {
        // Önce mevcut verileri temizle
        await QualityManagement.deleteMany({});
        console.log('Mevcut kalite yönetimi verileri temizlendi');

        // Yeni verileri ekle
        const createdCategories = await QualityManagement.insertMany(qualityCategories);
        console.log(`${createdCategories.length} kalite yönetimi kategorisi eklendi`);

        return createdCategories;
    } catch (error) {
        console.error('Kalite yönetimi seed hatası:', error);
        throw error;
    }
};

module.exports = { seedQualityManagement, qualityCategories };
