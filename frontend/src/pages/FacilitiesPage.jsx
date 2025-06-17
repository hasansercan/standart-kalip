import "./FacilitiesPage.css";

const FacilitiesPage = () => {
    const facilities = [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
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
    ];

    const equipment = [
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
                "Otomatik Kıvılcım Erozyonu"
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
    ];

    return (
        <div className="facilities-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Tesislerimiz</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Tesislerimiz</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="intro-section">
                <div className="container">
                    <div className="intro-content">
                        <div className="section-header center">
                            <h2>Modern Üretim Tesislerimiz</h2>
                            <div className="section-line"></div>
                            <p>
                                7.000 m² kapalı alanda, son teknoloji makineler ve ekipmanlarla donatılmış
                                tesislerimizde, kalıp sanayisinin en zorlu ihtiyaçlarını karşılıyoruz.
                                Modern altyapımız ve deneyimli kadromuzla sektörde öncü konumdayız.
                            </p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="bi bi-building"></i>
                                </div>
                                <div className="stat-number">7.000</div>
                                <div className="stat-label">m² Kapalı Alan</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="bi bi-gear"></i>
                                </div>
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Modern Makine</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="bi bi-people"></i>
                                </div>
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Uzman Personel</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="bi bi-clock"></i>
                                </div>
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Üretim Kapasitesi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Grid */}
            <section className="facilities-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Tesis Alanlarımız</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="facilities-grid">
                        {facilities.map((facility) => (
                            <div key={facility.id} className="facility-card">
                                <div className="facility-header">
                                    <div className="facility-icon">
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <h3>{facility.name}</h3>
                                    <span className="facility-type">{facility.type}</span>
                                </div>

                                <div className="facility-body">
                                    <div className="facility-info">
                                        <div className="info-item">
                                            <span className="label">Alan:</span>
                                            <span className="value">{facility.area}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Konum:</span>
                                            <span className="value">{facility.location}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Kapasite:</span>
                                            <span className="value">{facility.capacity}</span>
                                        </div>
                                    </div>

                                    <div className="facility-features">
                                        <h4>Özellikler:</h4>
                                        <ul>
                                            {facility.features.map((feature, index) => (
                                                <li key={index}>
                                                    <i className="bi bi-check-circle"></i>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="equipment-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Makine Parkımız</h2>
                        <div className="section-line"></div>
                        <p>Son teknoloji makineler ve ekipmanlarla donatılmış üretim hattımız</p>
                    </div>

                    <div className="equipment-grid">
                        {equipment.map((category, index) => (
                            <div key={index} className="equipment-card">
                                <div className="equipment-header">
                                    <h3>{category.category}</h3>
                                </div>
                                <div className="equipment-list">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="equipment-item">
                                            <i className="bi bi-gear-fill"></i>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="technology-section">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Endüstri 4.0 Teknolojileri</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                Dijital dönüşümün öncüsü olarak, üretim süreçlerimizi Endüstri 4.0
                                teknolojileri ile entegre ettik. Akıllı fabrika anlayışımızla,
                                verimliliği artırırken kaliteyi de en üst seviyede tutuyoruz.
                            </p>
                            <p>
                                IoT sensörler, otomatik kalite kontrol sistemleri ve yapay zeka
                                destekli üretim planlama araçlarımızla, geleceğin fabrikasını
                                bugünden inşa ediyoruz.
                            </p>

                            <div className="tech-features">
                                <div className="tech-item">
                                    <i className="bi bi-robot"></i>
                                    <div>
                                        <h4>Otomasyon Sistemleri</h4>
                                        <p>Tam otomatik üretim hatları</p>
                                    </div>
                                </div>
                                <div className="tech-item">
                                    <i className="bi bi-cloud-arrow-up"></i>
                                    <div>
                                        <h4>Bulut Tabanlı Monitoring</h4>
                                        <p>Gerçek zamanlı izleme ve kontrol</p>
                                    </div>
                                </div>
                                <div className="tech-item">
                                    <i className="bi bi-graph-up"></i>
                                    <div>
                                        <h4>Yapay Zeka Analitiği</h4>
                                        <p>Öngörücü bakım ve optimizasyon</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="image-content">
                            <div className="technology-image">
                                <div className="image-overlay">
                                    <h3>Geleceğin Fabrikası</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FacilitiesPage;
