import { useEffect, useState } from "react";
import "./About.css";

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // Default hakkımızda verisi - yönetim panelinden düzenlenecek
    const defaultAboutData = {
        id: "1",
        title: "Hakkımızda",
        content: `STANDART KALIP uzun yıllar kalıp sektörü içinde bulunarak edindiğimiz deneyim ve tecrübelerimizi kalıp sektörüne sunmak üzere kalıp standart elemanları üretimi ile faaliyete geçmiştir.

Üretmiş olduğumuz kalıp standart elemanları, günümüze kadar 150 ana grup ve 10.000'in üzerinde çeşitten oluşmaktadır. Üretimimizin büyük bölümünde otomotiv ana sanayinin kullandığı standartlarda üretim yapmaktayız. Ağırlık olarak otomotiv sektörü, beyaz eşya ve makine imalat sanayi sektörlerinde faaliyet göstermekteyiz.`,
        isActive: true
    };

    // Default özellikler - max 5 tane, yönetim panelinden düzenlenecek
    const defaultFeatures = [
        {
            id: "1",
            title: "KALİTE KONTROL",
            description: "Üretilen her yarı mamul ve bitmiş ürünün kalite laboratuvarlarında 3D ölçümü.",
            icon: "fa-award",
            isActive: true,
            sortOrder: 1
        },
        {
            id: "2",
            title: "SİNAİ HAKLAR/ARGE",
            description: "Patentli, faydalı modele sahip ürünler",
            icon: "fa-star",
            isActive: true,
            sortOrder: 2
        },
        {
            id: "3",
            title: "PROJE",
            description: "Devlet desteğiyle başarıyla kapatılan 8 Kosgeb Arge projesi, 1 Bebka projesi ve 4 Tübitak Arge projesi",
            icon: "fa-flask",
            isActive: true,
            sortOrder: 3
        },
        {
            id: "4",
            title: "TEDARİKÇİ",
            description: "Global OEM onaylı tedarikçisi",
            icon: "fa-handshake",
            isActive: true,
            sortOrder: 4
        }
    ];

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setLoading(true);

                // Hakkımızda verilerini al
                const aboutResponse = await fetch(`${apiUrl}/api/about`);
                if (aboutResponse.ok) {
                    const aboutData = await aboutResponse.json();
                    setAboutData(aboutData || defaultAboutData);
                } else {
                    setAboutData(defaultAboutData);
                }

                // Özellikler verilerini al
                const featuresResponse = await fetch(`${apiUrl}/api/features`);
                if (featuresResponse.ok) {
                    const featuresData = await featuresResponse.json();
                    const activeFeatures = featuresData.length > 0
                        ? featuresData.filter(f => f.isActive).sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 5)
                        : defaultFeatures;
                    setFeatures(activeFeatures);
                } else {
                    setFeatures(defaultFeatures);
                }

            } catch (error) {
                console.log("Hakkımızda verileri yükleme hatası:", error);
                setAboutData(defaultAboutData);
                setFeatures(defaultFeatures);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, [apiUrl]);

    if (loading) {
        return (
            <section className="about">
                <div className="container">
                    <div className="about-loading">
                        <div className="loading-spinner"></div>
                        <p>İçerik yükleniyor...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="about">
            <div className="container">
                {/* Hakkımızda Ana Bölüm */}
                <div className="about-main">
                    <div className="about-content">
                        <h2 className="about-title">{aboutData.title}</h2>
                        <div className="about-text">
                            {aboutData.content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="about-visual">
                        <div className="world-map">
                            <div className="map-container">
                                <div className="continent north-america"></div>
                                <div className="continent south-america"></div>
                                <div className="continent europe"></div>
                                <div className="continent africa"></div>
                                <div className="continent asia"></div>
                                <div className="continent australia"></div>

                                <div className="location-pin turkey">
                                    <div className="pin-marker"></div>
                                    <span className="pin-label">Türkiye</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Özellikler Bölümü */}
                <div className="about-features">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className="feature-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="feature-icon">
                                    <i className={`fa-solid ${feature.icon}`} style={{ fontSize: "32px", color: "white" }}></i>
                                </div>
                                <div className="feature-info">
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
