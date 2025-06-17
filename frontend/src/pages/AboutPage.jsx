import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Hakkımızda</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Hakkımızda</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Story Section */}
            <section className="company-story-section">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Şirket Hikayemiz</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                1999 yılında kurulan Standart Kalıp, kalıp sanayisinde 25 yıllık deneyimi ile Türkiye'nin
                                önde gelen kalıp üreticilerinden biri haline gelmiştir. Modern teknoloji ve deneyimli
                                kadromuzla, müşterilerimizin ihtiyaçlarına en uygun çözümleri sunmaya devam ediyoruz.
                            </p>
                            <p>
                                ISO 9001:2015 kalite yönetim sistemi ile üretim süreçlerimizi sürekli iyileştirerek,
                                uluslararası standartlarda kaliteli ürünler üretmekteyiz. Ar-Ge departmanımızla sürekli
                                yeni teknolojiler geliştiriyor ve sektörde öncü rol oynuyoruz.
                            </p>
                        </div>
                        <div className="image-content">
                            <div className="story-image">
                                <div className="image-overlay">
                                    <h3>25 Yıllık Deneyim</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Production Capacity Section */}
            <section className="capacity-section">
                <div className="container">
                    <div className="content-wrapper reverse">
                        <div className="image-content">
                            <div className="capacity-image">
                                <div className="image-overlay">
                                    <h3>Modern Üretim Tesisleri</h3>
                                </div>
                            </div>
                        </div>
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Üretim Kapasitemiz</h2>
                                <div className="section-line"></div>
                            </div>
                            <div className="capacity-stats">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h4>15.000 m²</h4>
                                        <p>Fabrika Alanı</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h4>200+</h4>
                                        <p>Deneyimli Çalışan</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-clock"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h4>24/7</h4>
                                        <p>Üretim Hattı</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-gear"></i>
                                    </div>
                                    <div className="stat-info">
                                        <h4>Modern</h4>
                                        <p>Makine Parkı</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Değerlerimiz</h2>
                        <div className="section-line"></div>
                        <p>Çalışmalarımızın temelini oluşturan değerlerimiz</p>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-award"></i>
                            </div>
                            <h3>Kalite</h3>
                            <p>ISO 9001:2015 kalite yönetim sistemi ile üretim süreçlerimizi sürekli iyileştiriyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-lightbulb"></i>
                            </div>
                            <h3>İnovasyon</h3>
                            <p>Ar-Ge departmanımızla sürekli yeni teknolojiler geliştiriyor ve uyguluyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-recycle"></i>
                            </div>
                            <h3>Sürdürülebilirlik</h3>
                            <p>Çevre dostu üretim yöntemleri ile gelecek nesillere daha yaşanılır bir dünya bırakıyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-people"></i>
                            </div>
                            <h3>Güvenilirlik</h3>
                            <p>Müşterilerimizle uzun vadeli iş ortaklıkları kurarak güven esaslı çalışıyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-globe"></i>
                            </div>
                            <h3>Uluslararası Standartlar</h3>
                            <p>CE, ISO sertifikalarımızla uluslararası kalite standartlarında üretim yapıyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-clock-history"></i>
                            </div>
                            <h3>Zamanında Teslimat</h3>
                            <p>Belirlenen sürelerde kaliteli üretim yaparak teslimat zamanlarına uyuyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="expertise-section">
                <div className="container">
                    <div className="section-header center">
                        <h2>Uzmanlık Alanlarımız</h2>
                        <div className="section-line"></div>
                        <p>Kalıp sanayisinde 25 yıllık deneyimimizle sunduğumuz hizmetler</p>
                    </div>

                    <div className="expertise-grid">
                        <div className="expertise-card">
                            <div className="expertise-icon">
                                <i className="bi bi-tools"></i>
                            </div>
                            <h3>Enjeksiyon Kalıpları</h3>
                            <p>Plastik enjeksiyon kalıpları tasarımı ve üretiminde uzmanız</p>
                        </div>

                        <div className="expertise-card">
                            <div className="expertise-icon">
                                <i className="bi bi-hammer"></i>
                            </div>
                            <h3>Kompresyon Kalıpları</h3>
                            <p>Yüksek kaliteli kompresyon kalıpları üretimi</p>
                        </div>

                        <div className="expertise-card">
                            <div className="expertise-icon">
                                <i className="bi bi-cpu"></i>
                            </div>
                            <h3>Progresif Kalıplar</h3>
                            <p>Karmaşık progresif kalıp tasarımı ve imalatı</p>
                        </div>

                        <div className="expertise-card">
                            <div className="expertise-icon">
                                <i className="bi bi-wrench"></i>
                            </div>
                            <h3>Özel Amaçlı Makineler</h3>
                            <p>Müşteri ihtiyaçlarına özel makine tasarımı</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
