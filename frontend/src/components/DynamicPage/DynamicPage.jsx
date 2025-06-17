import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DynamicPage.css";

const DynamicPage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    // Sayfa aktif değilse hata göster
                    if (!data.isActive) {
                        setError("Bu sayfa şu anda aktif değil.");
                        return;
                    }
                    setPage(data);
                } else if (response.status === 404) {
                    setError("Sayfa bulunamadı.");
                } else {
                    setError("Sayfa yüklenirken bir hata oluştu.");
                }
            } catch (error) {
                console.error("Sayfa yüklenirken hata oluştu:", error);
                setError("Bağlantı hatası oluştu.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    const renderSection = (section, index) => {
        switch (section.type) {
            case "intro":
                return (
                    <section key={index} className="intro-section">
                        <div className="container">
                            <div className="intro-content">
                                <div className="section-header center">
                                    <h2>{section.title}</h2>
                                    <div className="section-line"></div>
                                    {section.subtitle && <p>{section.subtitle}</p>}
                                </div>
                                {section.content && section.content.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                                {section.stats && (
                                    <div className="stats-grid">
                                        {section.stats.map((stat, i) => (
                                            <div key={i} className="stat-card">
                                                <div className="stat-icon">
                                                    <i className={`bi ${stat.icon || 'bi-star'}`}></i>
                                                </div>
                                                <div className="stat-number">{stat.number}</div>
                                                <div className="stat-label">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                );

            case "company-story":
                return (
                    <section key={index} className="company-story-section">
                        <div className="container">
                            <div className="content-wrapper">
                                <div className="text-content">
                                    <div className="section-header">
                                        <h2>{section.title}</h2>
                                        <div className="section-line"></div>
                                    </div>
                                    {section.content && section.content.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                                {section.image && (
                                    <div className="image-content">
                                        <div className="story-image">
                                            <div className="image-overlay">
                                                <h3>{section.image.overlay}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                );

            case "capacity":
                return (
                    <section key={index} className="capacity-section">
                        <div className="container">
                            <div className="content-wrapper reverse">
                                {section.image && (
                                    <div className="image-content">
                                        <div className="capacity-image">
                                            <div className="image-overlay">
                                                <h3>{section.image.overlay}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="text-content">
                                    <div className="section-header">
                                        <h2>{section.title}</h2>
                                        <div className="section-line"></div>
                                    </div>
                                    {section.stats && (
                                        <div className="capacity-stats">
                                            {section.stats.map((stat, i) => (
                                                <div key={i} className="stat-item">
                                                    <div className="stat-icon">
                                                        <i className={`bi ${stat.icon}`}></i>
                                                    </div>
                                                    <div className="stat-info">
                                                        <h4>{stat.value}</h4>
                                                        <p>{stat.label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case "values":
                return (
                    <section key={index} className="values-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                                {section.subtitle && <p>{section.subtitle}</p>}
                            </div>

                            {section.items && (
                                <div className="values-grid">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="value-card">
                                            <div className="value-icon">
                                                <i className={`bi ${item.icon}`}></i>
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "mission":
            case "vision":
                return (
                    <section key={index} className={`${section.type}-section`}>
                        <div className="container">
                            <div className="content-wrapper">
                                <div className="text-content">
                                    <div className="section-header">
                                        <h2>{section.title}</h2>
                                        <div className="section-line"></div>
                                    </div>
                                    {section.content && section.content.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                                {section.image && (
                                    <div className="image-content">
                                        <div className={`${section.type}-image`}>
                                            <div className="image-overlay">
                                                <h3>{section.image.overlay}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                );

            case "timeline":
                return (
                    <section key={index} className="timeline-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                            </div>

                            {section.milestones && (
                                <div className="timeline">
                                    {section.milestones.map((milestone, i) => (
                                        <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                                            <div className="timeline-content">
                                                <div className="year">{milestone.year}</div>
                                                <h3>{milestone.title}</h3>
                                                <p>{milestone.description}</p>
                                            </div>
                                            <div className="timeline-dot"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "growth":
                return (
                    <section key={index} className="growth-section">
                        <div className="container">
                            <div className="content-wrapper">
                                {section.image && (
                                    <div className="image-content">
                                        <div className="growth-image">
                                            <div className="image-overlay">
                                                <h3>{section.image.overlay}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="text-content">
                                    <div className="section-header">
                                        <h2>{section.title}</h2>
                                        <div className="section-line"></div>
                                    </div>
                                    {section.content && section.content.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}

                                    {section.achievements && (
                                        <div className="achievement-list">
                                            {section.achievements.map((achievement, i) => (
                                                <div key={i} className="achievement-item">
                                                    <i className="bi bi-check-circle"></i>
                                                    <span>{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case "certificates":
                return (
                    <section key={index} className="certificates-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                            </div>

                            {section.items && (
                                <div className="certificates-grid">
                                    {section.items.map((cert, i) => (
                                        <div key={i} className="certificate-card">
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
                                                <span className={`status ${cert.status || 'active'}`}>
                                                    {cert.status === 'active' ? 'Aktif' : 'Pasif'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "facilities":
                return (
                    <section key={index} className="facilities-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                            </div>

                            {section.items && (
                                <div className="facilities-grid">
                                    {section.items.map((facility, i) => (
                                        <div key={i} className="facility-card">
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

                                                {facility.features && (
                                                    <div className="facility-features">
                                                        <h4>Özellikler:</h4>
                                                        <ul>
                                                            {facility.features.map((feature, j) => (
                                                                <li key={j}>{feature}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "equipment":
                return (
                    <section key={index} className="equipment-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                            </div>

                            {section.categories && (
                                <div className="equipment-grid">
                                    {section.categories.map((category, i) => (
                                        <div key={i} className="equipment-category">
                                            <h3>{category.category}</h3>
                                            <ul>
                                                {category.items.map((item, j) => (
                                                    <li key={j}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "standards":
                return (
                    <section key={index} className="standards-section">
                        <div className="container">
                            <div className="content-wrapper">
                                <div className="text-content">
                                    <div className="section-header">
                                        <h2>{section.title}</h2>
                                        <div className="section-line"></div>
                                    </div>
                                    {section.content && section.content.map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case "features":
                return (
                    <section key={index} className="features-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                                {section.subtitle && <p>{section.subtitle}</p>}
                            </div>

                            {section.items && (
                                <div className="features-grid">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="feature-card">
                                            <div className="feature-icon">
                                                <i className={`bi ${item.icon}`}></i>
                                            </div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );

            case "quality-categories":
                return (
                    <section key={index} className="quality-content-section">
                        <div className="container">
                            <div className="section-header center">
                                <h2>{section.title}</h2>
                                <div className="section-line"></div>
                            </div>

                            <div className="quality-layout">
                                <div className="categories-sidebar">
                                    <div className="sidebar-header">
                                        <h3>Kalite Kategorileri</h3>
                                    </div>
                                    <div className="category-list">
                                        {section.categories && section.categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className={`category-item ${category.isActive ? 'active' : ''}`}
                                            >
                                                <i className="bi bi-chevron-right"></i>
                                                {category.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="content-area">
                                    {section.categories && section.categories.find(cat => cat.isActive) && (
                                        <div className="content-card">
                                            <div className="content-header">
                                                <h2>{section.categories.find(cat => cat.isActive).content.title}</h2>
                                                <div className="content-line"></div>
                                            </div>

                                            <div className="content-description">
                                                <p>{section.categories.find(cat => cat.isActive).content.description}</p>
                                            </div>

                                            <div className="content-points">
                                                <ul>
                                                    {section.categories.find(cat => cat.isActive).content.points.map((point, j) => (
                                                        <li key={j} className="point-item">
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
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="error-container">
                <h1>Sayfa Bulunamadı</h1>
                <p>{error || "Aradığınız sayfa mevcut değil."}</p>
                <a href="/" style={{
                    color: "#8B1538",
                    textDecoration: "none",
                    marginTop: "1rem",
                    display: "inline-block"
                }}>
                    Anasayfaya Dön
                </a>
            </div>
        );
    }

    return (
        <div className="dynamic-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>{page.content?.heroTitle || page.title}</h1>
                            {page.content?.heroSubtitle && (
                                <p style={{ fontSize: "1.2rem", marginTop: "1rem", opacity: "0.9" }}>
                                    {page.content.heroSubtitle}
                                </p>
                            )}
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>{page.title}</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Sections */}
            {page.content?.sections && page.content.sections.map((section, index) =>
                renderSection(section, index)
            )}
        </div>
    );
};

export default DynamicPage;
