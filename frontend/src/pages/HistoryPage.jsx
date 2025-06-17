import "./HistoryPage.css";

const HistoryPage = () => {
    const milestones = [
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
    ];

    return (
        <div className="history-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Tarihçemiz</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Tarihçemiz</span>
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
                            <h2>25 Yıllık Başarı Hikayemiz</h2>
                            <div className="section-line"></div>
                            <p>
                                1999 yılında kurulan Standart Kalıp, kalıp sanayisinde çeyrek asırlık deneyimi ile
                                Türkiye'nin önde gelen kalıp üreticilerinden biri haline gelmiştir. Sürekli gelişim
                                ve yenilik anlayışımızla sektörümüzde öncü olmaya devam ediyoruz.
                            </p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-number">25</div>
                                <div className="stat-label">Yıllık Deneyim</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">500+</div>
                                <div className="stat-label">Tamamlanan Proje</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">15</div>
                                <div className="stat-label">Ülkeye İhracat</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Uzman Personel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Kilometre Taşlarımız</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-content">
                                    <div className="year">{milestone.year}</div>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                                <div className="timeline-dot"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Growth Section */}
            <section className="growth-section">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="image-content">
                            <div className="growth-image">
                                <div className="image-overlay">
                                    <h3>Sürekli Büyüyen Başarı</h3>
                                </div>
                            </div>
                        </div>
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Büyüme Hikayemiz</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                Küçük bir atölyede başlayan yolculuğumuz, bugün modern tesislerimiz ve
                                ileri teknoloji makinelerimizle devam ediyor. Her geçen yıl kapasitemizi
                                artırarak müşterilerimize daha iyi hizmet sunmayı hedefliyoruz.
                            </p>
                            <p>
                                Teknolojik gelişmeleri yakından takip ederek, sektördeki yeniliklerin
                                öncüsü olmaya devam ediyoruz. Ar-Ge yatırımlarımızla geleceğin kalıp
                                teknolojilerini bugünden geliştiriyoruz.
                            </p>

                            <div className="achievement-list">
                                <div className="achievement-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Türkiye'nin önde gelen kalıp üreticisi</span>
                                </div>
                                <div className="achievement-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>15 ülkeye ihracat yapan güvenilir marka</span>
                                </div>
                                <div className="achievement-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>ISO 9001:2015 kalite güvencesi</span>
                                </div>
                                <div className="achievement-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Endüstri 4.0 teknolojileri ile donatılmış tesis</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HistoryPage;
