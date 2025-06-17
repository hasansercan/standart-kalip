const Page = require("../models/Page");

const pages = [
    {
        title: "Hakkımızda",
        slug: "hakkimizda",
        metaTitle: "Hakkımızda - Standart Kalıp",
        metaDescription: "1999 yılında kurulan Standart Kalıp, kalıp sanayisinde 25 yıllık deneyimi ile Türkiye'nin önde gelen kalıp üreticilerinden biri haline gelmiştir.",
        isActive: true,
        order: 1,
        content: {
            heroTitle: "Hakkımızda",
            heroSubtitle: "25 yıllık deneyim ile kalıp sanayisinde öncü",
            sections: [
                {
                    type: "company-story",
                    title: "Şirket Hikayemiz",
                    subtitle: "25 yıllık başarı hikayemiz",
                    content: [
                        "1999 yılında kurulan Standart Kalıp, kalıp sanayisinde 25 yıllık deneyimi ile Türkiye'nin önde gelen kalıp üreticilerinden biri haline gelmiştir. Modern teknoloji ve deneyimli kadromuzla, müşterilerimizin ihtiyaçlarına en uygun çözümleri sunmaya devam ediyoruz.",
                        "ISO 9001:2015 kalite yönetim sistemi ile üretim süreçlerimizi sürekli iyileştirerek, uluslararası standartlarda kaliteli ürünler üretmekteyiz. Ar-Ge departmanımızla sürekli yeni teknolojiler geliştiriyor ve sektörde öncü rol oynuyoruz."
                    ],
                    image: {
                        alt: "25 Yıllık Deneyim",
                        overlay: "25 Yıllık Deneyim"
                    }
                },
                {
                    type: "capacity",
                    title: "Üretim Kapasitemiz",
                    subtitle: "Modern tesisler ve güçlü altyapı",
                    stats: [
                        {
                            icon: "bi-building",
                            value: "15.000 m²",
                            label: "Fabrika Alanı"
                        },
                        {
                            icon: "bi-people",
                            value: "200+",
                            label: "Deneyimli Çalışan"
                        },
                        {
                            icon: "bi-clock",
                            value: "24/7",
                            label: "Üretim Hattı"
                        },
                        {
                            icon: "bi-gear",
                            value: "Modern",
                            label: "Makine Parkı"
                        }
                    ],
                    image: {
                        alt: "Modern Üretim Tesisleri",
                        overlay: "Modern Üretim Tesisleri"
                    }
                },
                {
                    type: "values",
                    title: "Değerlerimiz",
                    subtitle: "Çalışmalarımızın temelini oluşturan değerlerimiz",
                    items: [
                        {
                            icon: "bi-award",
                            title: "Kalite",
                            description: "ISO 9001:2015 kalite yönetim sistemi ile üretim süreçlerimizi sürekli iyileştiriyoruz."
                        },
                        {
                            icon: "bi-lightbulb",
                            title: "İnovasyon",
                            description: "Ar-Ge departmanımızla sürekli yeni teknolojiler geliştiriyor ve uyguluyoruz."
                        },
                        {
                            icon: "bi-recycle",
                            title: "Sürdürülebilirlik",
                            description: "Çevre dostu üretim yöntemleri ile gelecek nesillere daha yaşanılır bir dünya bırakıyoruz."
                        },
                        {
                            icon: "bi-people",
                            title: "Güvenilirlik",
                            description: "Müşterilerimizle uzun vadeli iş ortaklıkları kurarak güven esaslı çalışıyoruz."
                        },
                        {
                            icon: "bi-globe",
                            title: "Uluslararası Standartlar",
                            description: "CE, ISO sertifikalarımızla uluslararası kalite standartlarında üretim yapıyoruz."
                        },
                        {
                            icon: "bi-clock-history",
                            title: "Zamanında Teslimat",
                            description: "Belirlenen sürelerde kaliteli üretim yaparak teslimat zamanlarına uyuyoruz."
                        }
                    ]
                },
                {
                    type: "expertise",
                    title: "Uzmanlık Alanlarımız",
                    subtitle: "Kalıp sanayisinde 25 yıllık deneyimimizle sunduğumuz hizmetler",
                    items: [
                        {
                            icon: "bi-tools",
                            title: "Enjeksiyon Kalıpları",
                            description: "Plastik enjeksiyon kalıpları tasarımı ve üretiminde uzmanız"
                        },
                        {
                            icon: "bi-hammer",
                            title: "Kompresyon Kalıpları",
                            description: "Yüksek kaliteli kompresyon kalıpları üretimi"
                        },
                        {
                            icon: "bi-cpu",
                            title: "Özel Kalıplar",
                            description: "Müşteri ihtiyaçlarına özel kalıp tasarımı ve üretimi"
                        }
                    ]
                }
            ]
        }
    },
    {
        title: "Misyon & Vizyon",
        slug: "misyon-vizyon",
        metaTitle: "Misyon & Vizyon - Standart Kalıp",
        metaDescription: "Kalıp sanayisinde 25 yıllık deneyimimizle, müşterilerimize en yüksek kalitede ürünler sunmak misyonumuzdur.",
        isActive: true,
        order: 2,
        content: {
            heroTitle: "Misyon & Vizyon",
            heroSubtitle: "Geleceğe yönelik hedeflerimiz ve değerlerimiz",
            sections: [
                {
                    type: "mission",
                    title: "Misyonumuz",
                    subtitle: "Neden varız?",
                    content: [
                        "Kalıp sanayisinde 25 yıllık deneyimimizle, müşterilerimize en yüksek kalitede ürünler sunmak ve üretim süreçlerinde yenilikçi çözümler geliştirmek misyonumuzdur. Teknolojik gelişmeleri yakından takip ederek, sektördeki lider konumumuzu sürdürmeyi hedefliyoruz.",
                        "Modern üretim tesislerimiz ve uzman kadromuzla, enjeksiyon kalıplarından kompresyon kalıplarına kadar geniş bir ürün yelpazesi sunarak, müşterilerimizin üretim ihtiyaçlarını karşılamayı amaçlıyoruz."
                    ],
                    image: {
                        alt: "Kalite Önceliğimiz",
                        overlay: "Kalite Önceliğimiz"
                    }
                },
                {
                    type: "vision",
                    title: "Vizyonumuz",
                    subtitle: "Nereye gidiyoruz?",
                    content: [
                        "Türkiye'nin ve bölgenin en güvenilir kalıp üreticisi olarak, uluslararası pazarlarda tanınan bir marka haline gelmek vizyonumuzdur. Sürekli araştırma ve geliştirme faaliyetleriyle sektörde yenilikçi çözümlerin öncüsü olmayı hedefliyoruz.",
                        "Çevre dostu üretim yöntemleri ve sürdürülebilir teknolojilerle, gelecek nesillere daha yaşanabilir bir dünya bırakmak için sorumluluklarımızı yerine getiriyoruz."
                    ],
                    image: {
                        alt: "Geleceğe Odaklanıyoruz",
                        overlay: "Geleceğe Odaklanıyoruz"
                    }
                },
                {
                    type: "values",
                    title: "Değerlerimiz",
                    subtitle: "Çalışmalarımızın temelini oluşturan değerlerimiz",
                    items: [
                        {
                            icon: "bi-award",
                            title: "Kalite",
                            description: "En yüksek kalite standartlarında üretim yaparak müşteri memnuniyetini sağlıyoruz."
                        },
                        {
                            icon: "bi-lightbulb",
                            title: "İnovasyon",
                            description: "Sürekli araştırma ve geliştirme ile sektörde yenilikçi çözümler sunuyoruz."
                        },
                        {
                            icon: "bi-people",
                            title: "Güvenilirlik",
                            description: "Müşterilerimizle uzun vadeli iş ortaklıkları kurarak güven esaslı çalışıyoruz."
                        },
                        {
                            icon: "bi-clock",
                            title: "Zamanında Teslimat",
                            description: "Belirlenen sürelerde kaliteli üretim yaparak teslimat zamanlarına uyuyoruz."
                        },
                        {
                            icon: "bi-gear",
                            title: "Teknoloji",
                            description: "Modern teknoloji ve gelişmiş makinelerle üretim süreçlerimizi optimize ediyoruz."
                        },
                        {
                            icon: "bi-shield-check",
                            title: "Sürdürülebilirlik",
                            description: "Çevre dostu üretim yöntemleriyle sürdürülebilir geleceğe katkı sağlıyoruz."
                        }
                    ]
                }
            ]
        }
    },
    {
        title: "Tarihçemiz",
        slug: "tarihcemiz",
        metaTitle: "Tarihçemiz - Standart Kalıp",
        metaDescription: "1999 yılında kurulan Standart Kalıp'ın 25 yıllık başarı hikayesi ve kilometre taşları.",
        isActive: true,
        order: 3,
        content: {
            heroTitle: "Tarihçemiz",
            heroSubtitle: "1999'dan bugüne 25 yıllık başarı hikayesi",
            sections: [
                {
                    type: "intro",
                    title: "25 Yıllık Başarı Hikayemiz",
                    subtitle: "Sürekli gelişim ve yenilik",
                    content: [
                        "1999 yılında kurulan Standart Kalıp, kalıp sanayisinde çeyrek asırlık deneyimi ile Türkiye'nin önde gelen kalıp üreticilerinden biri haline gelmiştir. Sürekli gelişim ve yenilik anlayışımızla sektörümüzde öncü olmaya devam ediyoruz."
                    ],
                    stats: [
                        {
                            number: "25",
                            label: "Yıllık Deneyim"
                        },
                        {
                            number: "500+",
                            label: "Tamamlanan Proje"
                        },
                        {
                            number: "15",
                            label: "Ülkeye İhracat"
                        },
                        {
                            number: "50+",
                            label: "Uzman Personel"
                        }
                    ]
                },
                {
                    type: "timeline",
                    title: "Kilometre Taşlarımız",
                    milestones: [
                        {
                            year: "1999",
                            title: "Kuruluş",
                            description: "Standart Kalıp, kalıp sanayisinde yenilikçi çözümler sunmak amacıyla kuruldu. İlk tesisimiz 500 m² alanda faaliyete başladı."
                        },
                        {
                            year: "2003",
                            title: "Tesis Genişletme",
                            description: "Artan talep üzerine üretim kapasitemizi artırmak için tesisimizi 1.500 m²'ye genişlettik."
                        },
                        {
                            year: "2007",
                            title: "ISO 9001 Belgesi",
                            description: "Kalite yönetim sistemimizi uluslararası standartlara uygun hale getirerek ISO 9001:2000 belgesini aldık."
                        },
                        {
                            year: "2010",
                            title: "Teknoloji Yatırımı",
                            description: "CNC işleme merkezleri ve EDM makineleri ile üretim teknolojimizi güçlendirdik."
                        },
                        {
                            year: "2014",
                            title: "İhracat Başlangıcı",
                            description: "Avrupa pazarına açılarak ihracat faaliyetlerimize başladık. İlk uluslararası müşterilerimizle çalışmaya başladık."
                        },
                        {
                            year: "2017",
                            title: "Yeni Tesis",
                            description: "5.000 m² alanda modern tesisimizi açarak üretim kapasitemizi 5 katına çıkardık."
                        },
                        {
                            year: "2020",
                            title: "Dijital Dönüşüm",
                            description: "Endüstri 4.0 teknolojileri ile üretim süreçlerimizi dijitalleştirdik. Otomatik kalite kontrol sistemlerini devreye aldık."
                        },
                        {
                            year: "2024",
                            title: "25. Yıl",
                            description: "Sektördeki 25 yıllık deneyimimizle Türkiye'nin önde gelen kalıp üreticilerinden biri haline geldik."
                        }
                    ]
                },
                {
                    type: "growth",
                    title: "Büyüme Hikayemiz",
                    subtitle: "Sürekli gelişim",
                    content: [
                        "Küçük bir atölyede başlayan yolculuğumuz, bugün modern tesislerimiz ve ileri teknoloji makinelerimizle devam ediyor. Her geçen yıl kapasitemizi artırarak müşterilerimize daha iyi hizmet sunmayı hedefliyoruz.",
                        "Teknolojik gelişmeleri yakından takip ederek, sektördeki yeniliklerin öncüsü olmaya devam ediyoruz. Ar-Ge yatırımlarımızla geleceğin kalıp teknolojilerini bugünden geliştiriyoruz."
                    ],
                    achievements: [
                        "Türkiye'nin önde gelen kalıp üreticisi",
                        "15 ülkeye ihracat yapan güvenilir marka",
                        "ISO 9001:2015 kalite güvencesi",
                        "Endüstri 4.0 teknolojileri ile donatılmış tesis"
                    ],
                    image: {
                        alt: "Sürekli Büyüyen Başarı",
                        overlay: "Sürekli Büyüyen Başarı"
                    }
                }
            ]
        }
    },
    {
        title: "Sertifikalarımız",
        slug: "sertifikalarimiz",
        metaTitle: "Sertifikalarımız - Standart Kalıp",
        metaDescription: "Standart Kalıp'ın sahip olduğu kalite, çevre ve güvenlik sertifikaları ile uluslararası standartlara uygunluk belgeleri.",
        isActive: true,
        order: 4,
        content: {
            heroTitle: "Sertifikalarımız",
            heroSubtitle: "Kalite ve güvenilirlik belgelerimiz",
            sections: [
                {
                    type: "intro",
                    title: "Kalite ve Güvenilirlik Belgelendirmelerimiz",
                    subtitle: "Uluslararası standartlarda hizmet",
                    content: [
                        "Standart Kalıp olarak, üretim kalitemizi ve güvenilirliğimizi uluslararası sertifikalarla kanıtlıyoruz. Sahip olduğumuz belgeler, müşterilerimize sunduğumuz hizmetin kalitesinin garantisidir."
                    ]
                },
                {
                    type: "certificates",
                    title: "Sertifikalarımız",
                    items: [
                        {
                            name: "ISO 9001:2015",
                            title: "Kalite Yönetim Sistemi",
                            description: "Uluslararası kalite standartlarına uygun üretim ve hizmet kalitesi sertifikası",
                            year: "2023",
                            authority: "TÜV SÜD",
                            validity: "2026",
                            status: "active"
                        },
                        {
                            name: "ISO 14001:2015",
                            title: "Çevre Yönetim Sistemi",
                            description: "Çevre dostu üretim süreçleri ve sürdürülebilirlik sertifikası",
                            year: "2023",
                            authority: "SGS",
                            validity: "2026",
                            status: "active"
                        },
                        {
                            name: "OHSAS 18001",
                            title: "İş Sağlığı ve Güvenliği",
                            description: "İşyeri güvenliği ve çalışan sağlığı yönetim sistemi sertifikası",
                            year: "2022",
                            authority: "Bureau Veritas",
                            validity: "2025",
                            status: "active"
                        },
                        {
                            name: "CE Marking",
                            title: "Avrupa Uygunluk Belgesi",
                            description: "Avrupa Birliği kalite ve güvenlik standartlarına uygunluk sertifikası",
                            year: "2023",
                            authority: "Notified Body",
                            validity: "Sürekli",
                            status: "active"
                        },
                        {
                            name: "TSE ISO 3834",
                            title: "Kaynak Kalite Belgesi",
                            description: "Kaynak işlemlerinde kalite güvencesi ve süreç kontrol sertifikası",
                            year: "2023",
                            authority: "TSE",
                            validity: "2026",
                            status: "active"
                        },
                        {
                            name: "API Q1",
                            title: "Petrol Endüstrisi Kalite",
                            description: "Petrol ve gaz endüstrisi için özel kalite yönetim sistemi sertifikası",
                            year: "2022",
                            authority: "API",
                            validity: "2025",
                            status: "active"
                        }
                    ]
                },
                {
                    type: "features",
                    title: "Sertifikalarımızın Getirdikleri",
                    items: [
                        {
                            icon: "bi-shield-check",
                            title: "Kalite Güvencesi",
                            description: "Tüm üretim süreçlerimizde uluslararası kalite standartlarını uyguluyoruz"
                        },
                        {
                            icon: "bi-leaf",
                            title: "Çevre Dostu Üretim",
                            description: "Sürdürülebilir üretim yöntemleri ile çevreye saygılı üretim yapıyoruz"
                        },
                        {
                            icon: "bi-people",
                            title: "İş Güvenliği",
                            description: "Çalışanlarımızın güvenliği ve sağlığı için en yüksek standartları uyguluyoruz"
                        },
                        {
                            icon: "bi-globe",
                            title: "Uluslararası Standartlar",
                            description: "Global pazarlarda kabul gören sertifikalarla kalitemizi kanıtlıyoruz"
                        }
                    ]
                },
                {
                    type: "standards",
                    title: "Kalite Standartlarımız",
                    subtitle: "25 yıllık kalite deneyimi",
                    content: [
                        "25 yıllık deneyimimiz boyunca, kalite standartlarımızı sürekli geliştirdik. Sahip olduğumuz sertifikalar, müşterilerimize sunduğumuz hizmetin kalitesinin en güçlü kanıtıdır.",
                        "Uluslararası standartlara uygun üretim süreçlerimiz sayesinde, küresel pazarlarda rekabet edebilir durumda olmaktan gurur duyuyoruz."
                    ]
                }
            ]
        }
    },
    {
        title: "Tesislerimiz",
        slug: "tesislerimiz",
        metaTitle: "Tesislerimiz - Standart Kalıp",
        metaDescription: "7.000 m² kapalı alanda, modern teknoloji ile donatılmış üretim tesislerimiz ve makine parkımız.",
        isActive: true,
        order: 5,
        content: {
            heroTitle: "Tesislerimiz",
            heroSubtitle: "Modern teknoloji ile donatılmış üretim tesisleri",
            sections: [
                {
                    type: "intro",
                    title: "Modern Üretim Tesislerimiz",
                    subtitle: "Son teknoloji ile donatılmış altyapı",
                    content: [
                        "7.000 m² kapalı alanda, son teknoloji makineler ve ekipmanlarla donatılmış tesislerimizde, kalıp sanayisinin en zorlu ihtiyaçlarını karşılıyoruz. Modern altyapımız ve deneyimli kadromuzla sektörde öncü konumdayız."
                    ],
                    stats: [
                        {
                            icon: "bi-building",
                            number: "7.000",
                            label: "m² Kapalı Alan"
                        },
                        {
                            icon: "bi-gear",
                            number: "50+",
                            label: "Modern Makine"
                        },
                        {
                            icon: "bi-people",
                            number: "50+",
                            label: "Uzman Personel"
                        },
                        {
                            icon: "bi-clock",
                            number: "24/7",
                            label: "Üretim Kapasitesi"
                        }
                    ]
                },
                {
                    type: "facilities",
                    title: "Tesis Alanlarımız",
                    items: [
                        {
                            name: "Ana Üretim Tesisi",
                            area: "5.000 m²",
                            location: "İstanbul / Türkiye",
                            type: "Üretim",
                            capacity: "1000 kalıp/yıl",
                            features: [
                                "CNC İşleme Merkezleri",
                                "EDM Makineleri",
                                "Kalite Kontrol Laboratuvarı",
                                "Otomatik Depo Sistemi"
                            ]
                        },
                        {
                            name: "Ar-Ge Merkezi",
                            area: "1.200 m²",
                            location: "İstanbul / Türkiye",
                            type: "Ar-Ge",
                            capacity: "50 proje/yıl",
                            features: [
                                "3D Tasarım Stüdyosu",
                                "Prototip Üretim",
                                "Test Laboratuvarı",
                                "Simülasyon Merkezi"
                            ]
                        },
                        {
                            name: "Kalite Kontrol Merkezi",
                            area: "800 m²",
                            location: "İstanbul / Türkiye",
                            type: "Kalite",
                            capacity: "100 test/gün",
                            features: [
                                "3D Ölçüm Makineleri",
                                "Malzeme Test Laboratuvarı",
                                "Hassasiyet Ölçüm",
                                "Sertifikalandırma"
                            ]
                        },
                        {
                            name: "Depo ve Lojistik",
                            area: "2.000 m²",
                            location: "İstanbul / Türkiye",
                            type: "Lojistik",
                            capacity: "500 ton kapasite",
                            features: [
                                "Otomatik Depo Sistemi",
                                "İklim Kontrollü Alanlar",
                                "Yükleme Rampaları",
                                "Güvenlik Sistemleri"
                            ]
                        }
                    ]
                },
                {
                    type: "equipment",
                    title: "Makine Parkımız",
                    categories: [
                        {
                            category: "CNC Makineleri",
                            items: [
                                "5 Eksen CNC İşleme Merkezleri",
                                "Yatay İşleme Merkezleri",
                                "Dikey İşleme Merkezleri",
                                "Torna Tezgahları"
                            ]
                        },
                        {
                            category: "EDM Makineleri",
                            items: [
                                "Tel Erozyon Makineleri",
                                "Daldırma Erozyon Makineleri",
                                "Hassas Erozyon Sistemleri",
                                "Otomatik Kıvılcık Erozyonu"
                            ]
                        },
                        {
                            category: "Ölçüm ve Kontrol",
                            items: [
                                "3D Koordinat Ölçüm Makineleri",
                                "Optik Ölçüm Sistemleri",
                                "Yüzey Pürüzlülük Ölçümü",
                                "Malzeme Test Cihazları"
                            ]
                        },
                        {
                            category: "Yardımcı Ekipmanlar",
                            items: [
                                "Kalıp Montaj Tezgahları",
                                "Isıl İşlem Fırınları",
                                "Yüzey İşlem Makineleri",
                                "Taşıma ve Kaldırma Sistemleri"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: "Kalite Yönetimi",
        slug: "kalite-yonetimi",
        metaTitle: "Kalite Yönetimi - Standart Kalıp",
        metaDescription: "ISO 9001:2015 Kalite Yönetim Sistemi ile 25 yıllık kalite deneyimimiz, sürekli iyileştirme anlayışımız.",
        isActive: true,
        order: 6,
        content: {
            heroTitle: "Kalite Yönetimi",
            heroSubtitle: "ISO 9001:2015 Kalite Yönetim Sistemi",
            sections: [
                {
                    type: "intro",
                    title: "ISO 9001:2015 Kalite Yönetim Sistemi",
                    subtitle: "25 yıllık deneyimimizle sürekli gelişen kalite anlayışımız",
                    content: [
                        "Kalıp Standart Elemanları, Kalıp, Özel Amaçlı Makine ve Aparat Tasarımı, İmalatı, Tedarığı ve Satışı'nın yapılması konularında faaliyet gösteren firmamız kuruluşun amaç ve bağlamına uygun ve stratejik yönünü destekleyecek şekilde Kalite Yönetim Sistemini en üst düzeye ulaştırabilmek için kalite politikasını belirlemiştir."
                    ]
                },
                {
                    type: "quality-categories",
                    title: "Kalite Kategorileri",
                    categories: [
                        {
                            id: 1,
                            name: "Kalite Politikası",
                            isActive: true,
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
                            }
                        },
                        {
                            id: 2,
                            name: "Kalite Sertifikaları",
                            isActive: false,
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
                            }
                        },
                        {
                            id: 3,
                            name: "Laboratuvar",
                            isActive: false,
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
                            }
                        },
                        {
                            id: 4,
                            name: "Kalite Prosedürleri",
                            isActive: false,
                            content: {
                                title: "Kalite Kontrol Prosedürlerimiz",
                                description: "Üretim sürecinin her aşamasında uygulanan detaylı kalite kontrol prosedürlerimiz:",
                                points: [
                                    "Hammadde Giriş Kontrol Prosedürleri",
                                    "Süreç İçi Kalite Kontrol Adımları",
                                    "Son Ürün Muayene ve Test Prosedürleri",
                                    "Hatalı Ürün Değerlendirme ve Düzeltici Faaliyet Prosedürleri",
                                    "Müşteri Şikayet Yönetim Prosedürleri",
                                    "Kalimasyon ve Validasyon Prosedürleri"
                                ]
                            }
                        },
                        {
                            id: 5,
                            name: "Sürekli İyileştirme",
                            isActive: false,
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
                            }
                        }
                    ]
                }
            ]
        }
    }
];

const seedPages = async () => {
    try {
        await Page.deleteMany({});

        for (const page of pages) {
            const newPage = new Page(page);
            await newPage.save();
            console.log(`✓ ${page.title} sayfası eklendi`);
        }

        console.log("✅ Tüm sayfalar başarıyla eklendi");
    } catch (error) {
        console.error("❌ Sayfalar eklenirken hata oluştu:", error);
    }
};

module.exports = seedPages;
