import "./CertificatesPage.css";

const CertificatesPage = () => {
    const certificates = [
        {
            id: 1,
            name: "ISO 9001:2015",
            title: "Kalite Yönetim Sistemi",
            description: "Uluslararası kalite standartlarına uygun üretim ve hizmet kalitesi sertifikası",
            year: "2023",
            authority: "TÜV SÜD",
            validity: "2026"
        },
        {
            id: 2,
            name: "ISO 14001:2015",
            title: "Çevre Yönetim Sistemi",
            description: "Çevre dostu üretim süreçleri ve sürdürülebilirlik sertifikası",
            year: "2023",
            authority: "SGS",
            validity: "2026"
        },
        {
            id: 3,
            name: "OHSAS 18001",
            title: "İş Sağlığı ve Güvenliği",
            description: "İşyeri güvenliği ve çalışan sağlığı yönetim sistemi sertifikası",
            year: "2022",
            authority: "Bureau Veritas",
            validity: "2025"
        },
        {
            id: 4,
            name: "CE Marking",
            title: "Avrupa Uygunluk Belgesi",
            description: "Avrupa Birliği kalite ve güvenlik standartlarına uygunluk sertifikası",
            year: "2023",
            authority: "Notified Body",
            validity: "Sürekli"
        },
        {
            id: 5,
            name: "TSE ISO 3834",
            title: "Kaynak Kalite Belgesi",
            description: "Kaynak işlemlerinde kalite güvencesi ve süreç kontrol sertifikası",
            year: "2023",
            authority: "TSE",
            validity: "2026"
        },
        {
            id: 6,
            name: "API Q1",
            title: "Petrol Endüstrisi Kalite",
            description: "Petrol ve gaz endüstrisi için özel kalite yönetim sistemi sertifikası",
            year: "2022",
            authority: "API",
            validity: "2025"
        }
    ];

    const features = [
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
    ];

    return (
        <div className="certificates-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Sertifikalarımız</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Sertifikalarımız</span>
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
                            <h2>Kalite ve Güvenilirlik Belgelendirmelerimiz</h2>
                            <div className="section-line"></div>
                            <p>
                                Standart Kalıp olarak, üretim kalitemizi ve güvenilirliğimizi uluslararası
                                sertifikalarla kanıtlıyoruz. Sahip olduğumuz belgeler, müşterilerimize
                                sunduğumuz hizmetin kalitesinin garantisidir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificates Grid */}
            <section className="certificates-section">
                <div className="container">
                    <div className="certificates-grid">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="certificate-card">
                                <div className="certificate-header">
                                    <div className="certificate-badge">
                                        <i className="bi bi-award"></i>
                                    </div>
                                    <h3>{cert.name}</h3>
                                    <h4>{cert.title}</h4>
                                </div>

                                <div className="certificate-body">
                                    <p>{cert.description}</p>

                                    <div className="certificate-details">
                                        <div className="detail-item">
                                            <span className="label">Alındığı Yıl:</span>
                                            <span className="value">{cert.year}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Veren Kurum:</span>
                                            <span className="value">{cert.authority}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Geçerlilik:</span>
                                            <span className="value">{cert.validity}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="certificate-footer">
                                    <span className="status active">Aktif</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Sertifikalarımızın Getirdikleri</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    <i className={`bi ${feature.icon}`}></i>
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standards Section */}
            <section className="standards-section">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Kalite Standartlarımız</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                25 yıllık deneyimimiz boyunca, kalite standartlarımızı sürekli geliştirdik.
                                Sahip olduğumuz sertifikalar, müşterilerimize sunduğumuz hizmetin kalitesinin
                                en güçlü kanıtıdır.
                            </p>
                            <p>
                                Uluslararası standartlara uygun üretim süreçlerimiz sayesinde, küresel
                                pazarlarda rekabet edebilir durumda olmaktan gurur duyuyoruz.
                            </p>

                            <div className="standards-list">
                                <div className="standard-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Sürekli iyileştirme prensibi</span>
                                </div>
                                <div className="standard-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Müşteri memnuniyeti odaklı yaklaşım</span>
                                </div>
                                <div className="standard-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Risk yönetimi ve önleyici tedbirler</span>
                                </div>
                                <div className="standard-item">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Çevre dostu üretim süreçleri</span>
                                </div>
                            </div>
                        </div>

                        <div className="image-content">
                            <div className="standards-image">
                                <div className="image-overlay">
                                    <h3>Uluslararası Kalite Standartları</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CertificatesPage;
