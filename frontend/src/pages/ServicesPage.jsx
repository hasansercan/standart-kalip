import React, { useState } from "react";
import "./ServicesPage.css";

const ServicesPage = () => {
    // Admin panelinden yönetilebilir kalite kategorileri
    const [qualityCategories] = useState([
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
    ]);

    const [activeCategory, setActiveCategory] = useState(1);

    const getActiveContent = () => {
        return qualityCategories.find(cat => cat.id === activeCategory)?.content;
    };

    return (
        <div className="services-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Kalite Yönetimi</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Kalite Yönetimi</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quality Management Content */}
            <section className="quality-content-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>ISO 9001:2015 Kalite Yönetim Sistemi</h2>
                        <div className="section-line"></div>
                        <p>25 yıllık deneyimimizle sürekli gelişen kalite anlayışımız</p>
                    </div>

                    <div className="quality-layout">
                        {/* Sol Kategori Menüsü */}
                        <div className="categories-sidebar">
                            <div className="sidebar-header">
                                <h3>Kalite Kategorileri</h3>
                            </div>
                            <div className="category-list">
                                {qualityCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sağ İçerik Alanı */}
                        <div className="content-area">
                            {getActiveContent() && (
                                <div className="content-card">
                                    <div className="content-header">
                                        <h2>{getActiveContent().title}</h2>
                                        <div className="content-line"></div>
                                    </div>

                                    <div className="content-description">
                                        <p>{getActiveContent().description}</p>
                                    </div>

                                    <div className="content-points">
                                        <ul>
                                            {getActiveContent().points.map((point, index) => (
                                                <li key={index} className="point-item">
                                                    <div className="point-icon">
                                                        <i className="bi bi-check-circle"></i>
                                                    </div>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Standards Section */}
            <section className="quality-standards-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Kalite Standartlarımız</h2>
                        <div className="section-line"></div>
                        <p>Uluslararası geçerliliğe sahip sertifikalarımız</p>
                    </div>

                    <div className="standards-grid">
                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="bi bi-award"></i>
                            </div>
                            <h3>ISO 9001:2015</h3>
                            <p>Kalite Yönetim Sistemi Sertifikası</p>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="bi bi-leaf"></i>
                            </div>
                            <h3>ISO 14001:2015</h3>
                            <p>Çevre Yönetim Sistemi Sertifikası</p>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h3>OHSAS 18001</h3>
                            <p>İş Sağlığı ve Güvenliği Yönetim Sistemi</p>
                        </div>

                        <div className="standard-card">
                            <div className="standard-icon">
                                <i className="bi bi-globe"></i>
                            </div>
                            <h3>CE Belgesi</h3>
                            <p>Avrupa Birliği Uygunluk Belgesi</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
