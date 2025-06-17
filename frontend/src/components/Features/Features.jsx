import { useEffect, useState } from "react";
import "./Features.css";

const Features = () => {
    const [features, setFeatures] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/features/active`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Features data:", data);
                    setFeatures(data);
                } else {
                    console.log("API response not ok, using fallback data");
                    setFallbackFeatures();
                }
            } catch (error) {
                console.log("Features yükleme hatası:", error);
                setFallbackFeatures();
            }
        };

        const setFallbackFeatures = () => {
            setFeatures([
                {
                    _id: 1,
                    icon: "fa-award",
                    title: "KALİTE KONTROL",
                    description: "En sıkı kalite kontrol süreçlerimizle üretilen ürünler"
                },
                {
                    _id: 2,
                    icon: "fa-star",
                    title: "SINAI HAKLARADE",
                    description: "Sınırsız kalite memnuniyet garanti süresi"
                },
                {
                    _id: 3,
                    icon: "fa-cogs",
                    title: "PROJE",
                    description: "Özel proje ve müşteri ihtiyaçlarına göre üretim"
                },
                {
                    _id: 4,
                    icon: "fa-headset",
                    title: "TEKNİK DESTEK",
                    description: "7/24 teknik destek ve müşteri hizmetleri"
                }
            ]);
        };

        fetchFeatures();
    }, [apiUrl]);

    return (
        <section className="features">
            <div className="container">
                <div className="features-grid">
                    {features.map((feature) => (
                        <div key={feature._id} className="feature-item">
                            <div className="feature-icon">
                                <i className={`fa-solid ${feature.icon}`} style={{ fontSize: "32px", color: "white" }}></i>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
