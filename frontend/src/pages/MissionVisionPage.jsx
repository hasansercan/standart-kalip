import "./MissionVisionPage.css";

const MissionVisionPage = () => {
    return (
        <div className="mission-vision-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Misyon & Vizyon</h1>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Misyon & Vizyon</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Misyonumuz</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                Kalıp sanayisinde 25 yıllık deneyimimizle, müşterilerimize en yüksek kalitede ürünler sunmak ve
                                üretim süreçlerinde yenilikçi çözümler geliştirmek misyonumuzdur. Teknolojik gelişmeleri yakından
                                takip ederek, sektördeki lider konumumuzu sürdürmeyi hedefliyoruz.
                            </p>
                            <p>
                                Modern üretim tesislerimiz ve uzman kadromuzla, enjeksiyon kalıplarından kompresyon kalıplarına
                                kadar geniş bir ürün yelpazesi sunarak, müşterilerimizin üretim ihtiyaçlarını karşılamayı
                                amaçlıyoruz.
                            </p>
                        </div>
                        <div className="image-content">
                            <div className="mission-image">
                                <div className="image-overlay">
                                    <h3>Kalite Önceliğimiz</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="vision-section">
                <div className="container">
                    <div className="content-wrapper reverse">
                        <div className="image-content">
                            <div className="vision-image">
                                <div className="image-overlay">
                                    <h3>Geleceğe Odaklanıyoruz</h3>
                                </div>
                            </div>
                        </div>
                        <div className="text-content">
                            <div className="section-header">
                                <h2>Vizyonumuz</h2>
                                <div className="section-line"></div>
                            </div>
                            <p>
                                Türkiye'nin ve bölgenin en güvenilir kalıp üreticisi olarak, uluslararası pazarlarda
                                tanınan bir marka haline gelmek vizyonumuzdur. Sürekli araştırma ve geliştirme
                                faaliyetleriyle sektörde yenilikçi çözümlerin öncüsü olmayı hedefliyoruz.
                            </p>
                            <p>
                                Çevre dostu üretim yöntemleri ve sürdürülebilir teknolojilerle, gelecek nesillere
                                daha yaşanabilir bir dünya bırakmak için sorumluluklarımızı yerine getiriyoruz.
                            </p>
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
                            <p>En yüksek kalite standartlarında üretim yaparak müşteri memnuniyetini sağlıyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-lightbulb"></i>
                            </div>
                            <h3>İnovasyon</h3>
                            <p>Sürekli araştırma ve geliştirme ile sektörde yenilikçi çözümler sunuyoruz.</p>
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
                                <i className="bi bi-clock"></i>
                            </div>
                            <h3>Zamanında Teslimat</h3>
                            <p>Belirlenen sürelerde kaliteli üretim yaparak teslimat zamanlarına uyuyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-gear"></i>
                            </div>
                            <h3>Teknoloji</h3>
                            <p>Modern teknoloji ve gelişmiş makinelerle üretim süreçlerimizi optimize ediyoruz.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h3>Sürdürülebilirlik</h3>
                            <p>Çevre dostu üretim yöntemleriyle sürdürülebilir geleceğe katkı sağlıyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MissionVisionPage;
