import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { buildApiUrl } from "../config/apiConfig";
import "./ServicesPage.css";

const ServicesPage = () => {
    const [qualityCategories, setQualityCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    // API'den kalite kategorilerini çek
    useEffect(() => {
        fetchQualityCategories();
    }, []);

    const fetchQualityCategories = async () => {
        try {
            const response = await fetch(buildApiUrl('/quality-management'));
            if (response.ok) {
                const data = await response.json();
                setQualityCategories(data);
                // İlk kategoriyi otomatik seç
                if (data.length > 0) {
                    setActiveCategory(data[0]._id);
                }
            } else {
                message.error('Kalite kategorileri yüklenirken hata oluştu');
            }
        } catch (error) {
            console.error('Quality categories fetch error:', error);
            message.error('Kalite kategorileri yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const getActiveContent = () => {
        return qualityCategories.find(cat => cat._id === activeCategory);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin size="large" />
            </div>
        );
    }

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

                    {qualityCategories.length > 0 && (
                        <div className="quality-layout">
                            {/* Sol Kategori Menüsü */}
                            <div className="categories-sidebar">
                                <div className="sidebar-header">
                                    <h3>Kalite Kategorileri</h3>
                                </div>
                                <div className="category-list">
                                    {qualityCategories.map((category) => (
                                        <div
                                            key={category._id}
                                            className={`category-item ${activeCategory === category._id ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(category._id)}
                                        >
                                            <i className={`bi ${category.icon || 'bi-chevron-right'}`}></i>
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
                                            <h2>{getActiveContent().content.title}</h2>
                                            <div className="content-line" style={{ backgroundColor: getActiveContent().color }}></div>
                                        </div>

                                        <div className="content-description">
                                            <p>{getActiveContent().content.description}</p>
                                        </div>

                                        <div className="content-points">
                                            <ul>
                                                {getActiveContent().content.points.map((point, index) => (
                                                    <li key={index} className="point-item">
                                                        <div className="point-icon" style={{ backgroundColor: getActiveContent().color }}>
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
                    )}

                    {qualityCategories.length === 0 && !loading && (
                        <div className="no-data">
                            <p>Henüz kalite kategorisi bulunmuyor.</p>
                        </div>
                    )}
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
