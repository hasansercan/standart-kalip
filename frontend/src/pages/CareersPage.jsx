import React, { useEffect, useState } from "react";
import { buildApiUrl } from "../config/apiConfig";
import "./CareersPage.css";

const CareersPage = () => {
    const [openPositions, setOpenPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        experience: "",
        education: "",
        skills: "",
        coverLetter: "",
        resumeUrl: "",
        portfolio: "",
        linkedIn: "",
        availableStartDate: "",
        expectedSalary: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    // İş ilanlarını API'den çek
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(buildApiUrl("/jobs"));
                if (response.ok) {
                    const jobs = await response.json();
                    setOpenPositions(jobs);
                } else {
                    console.error("İş ilanları getirilemedi");
                }
            } catch (error) {
                console.error("İş ilanları getirilirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

        // Form validasyonu
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
            !formData.address || !formData.experience || !formData.education || !formData.coverLetter) {
            setSubmitMessage("Lütfen tüm zorunlu alanları doldurun.");
            setIsSubmitting(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitMessage("Lütfen geçerli bir e-posta adresi girin.");
            setIsSubmitting(false);
            return;
        }

        try {
            const applicationData = {
                ...formData,
                jobId: selectedPosition._id,
                skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
            };

            const response = await fetch(buildApiUrl("/job-applications"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {
                setSubmitMessage("Başvurunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address: "",
                    experience: "",
                    education: "",
                    skills: "",
                    coverLetter: "",
                    resumeUrl: "",
                    portfolio: "",
                    linkedIn: "",
                    availableStartDate: "",
                    expectedSalary: ""
                });
                setTimeout(() => {
                    setSelectedPosition(null);
                    setSubmitMessage("");
                }, 3000);
            } else {
                const errorData = await response.json();
                setSubmitMessage(errorData.error || "Başvuru gönderilirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Başvuru gönderme hatası:", error);
            setSubmitMessage("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getJobTypeText = (type) => {
        const types = {
            "full-time": "Tam Zamanlı",
            "part-time": "Yarı Zamanlı",
            "contract": "Sözleşmeli",
            "internship": "Staj"
        };
        return types[type] || type;
    };

    return (
        <div className="careers-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Kariyer Fırsatları</h1>
                            <p>Standart Kalıp ailesine katılın, kariyerinizi bizimle şekillendirin</p>
                            <nav className="breadcrumb">
                                <a href="/">Anasayfa</a> / <span>Kariyer</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Açık Pozisyonlar */}
            <section style={{ padding: "60px 0", backgroundColor: "#f8f9fa" }}>
                <div className="container">
                    <h2 style={{
                        textAlign: "center",
                        marginBottom: "50px",
                        color: "#333",
                        fontSize: "2rem"
                    }}>
                        Açık Pozisyonlar
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "40px" }}>
                            <p>İş ilanları yükleniyor...</p>
                        </div>
                    ) : openPositions.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "40px" }}>
                            <p>Şu anda açık pozisyon bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {openPositions.map((position) => (
                                <div key={position._id} className="col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
                                    <div style={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        padding: "25px",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                        height: "100%",
                                        transition: "transform 0.3s ease"
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                                    >
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: "15px"
                                        }}>
                                            <h3 style={{
                                                color: "#8b2635",
                                                fontSize: "1.3rem",
                                                fontWeight: "600",
                                                margin: "0"
                                            }}>
                                                {position.title}
                                            </h3>
                                            <span style={{
                                                backgroundColor: "#28a745",
                                                color: "white",
                                                padding: "4px 12px",
                                                borderRadius: "15px",
                                                fontSize: "12px",
                                                fontWeight: "500"
                                            }}>
                                                {getJobTypeText(position.type)}
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: "15px" }}>
                                            <div style={{ display: "flex", gap: "20px", marginBottom: "10px", flexWrap: "wrap" }}>
                                                <span style={{ color: "#666", fontSize: "14px" }}>
                                                    📍 {position.location}
                                                </span>
                                                <span style={{ color: "#666", fontSize: "14px" }}>
                                                    🏢 {position.department}
                                                </span>
                                                <span style={{ color: "#666", fontSize: "14px" }}>
                                                    ⏱️ {position.experience}
                                                </span>
                                            </div>
                                            {position.salary && (
                                                <div style={{ color: "#666", fontSize: "14px" }}>
                                                    💰 {position.salary}
                                                </div>
                                            )}
                                        </div>

                                        <p style={{
                                            color: "#555",
                                            fontSize: "14px",
                                            lineHeight: "1.6",
                                            marginBottom: "20px"
                                        }}>
                                            {position.description}
                                        </p>

                                        <div style={{ marginBottom: "20px" }}>
                                            <h5 style={{ color: "#333", fontSize: "14px", marginBottom: "10px" }}>
                                                Aranan Özellikler:
                                            </h5>
                                            <ul style={{
                                                margin: "0",
                                                paddingLeft: "20px",
                                                color: "#666",
                                                fontSize: "13px"
                                            }}>
                                                {position.requirements.slice(0, 3).map((req, index) => (
                                                    <li key={index} style={{ marginBottom: "3px" }}>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => setSelectedPosition(position)}
                                            style={{
                                                backgroundColor: "#8b2635",
                                                color: "white",
                                                border: "none",
                                                padding: "10px 20px",
                                                borderRadius: "5px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s ease",
                                                width: "100%"
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#a91d3a"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "#8b2635"}
                                        >
                                            Başvuru Yap
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Başvuru Formu Modal */}
            {selectedPosition && (
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    zIndex: "9999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                }}>
                    <div style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        maxWidth: "800px",
                        width: "100%",
                        maxHeight: "90vh",
                        overflow: "auto",
                        position: "relative"
                    }}>
                        {/* Form Header */}
                        <div style={{
                            backgroundColor: "#8b2635",
                            color: "white",
                            padding: "20px",
                            borderRadius: "8px 8px 0 0",
                            position: "sticky",
                            top: "0",
                            zIndex: "10"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h3 style={{ margin: "0", fontSize: "1.3rem" }}>
                                    {selectedPosition.title} - Başvuru Formu
                                </h3>
                                <button
                                    onClick={() => setSelectedPosition(null)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "white",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        padding: "0",
                                        width: "30px",
                                        height: "30px"
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} style={{ padding: "30px" }}>
                            {submitMessage && (
                                <div style={{
                                    padding: "10px",
                                    marginBottom: "20px",
                                    borderRadius: "4px",
                                    backgroundColor: submitMessage.includes("başarıyla") ? "#d4edda" : "#f8d7da",
                                    color: submitMessage.includes("başarıyla") ? "#155724" : "#721c24",
                                    border: `1px solid ${submitMessage.includes("başarıyla") ? "#c3e6cb" : "#f5c6cb"}`
                                }}>
                                    {submitMessage}
                                </div>
                            )}

                            {/* Kişisel Bilgiler */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Kişisel Bilgiler
                                </h4>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Ad *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Adınız"
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Soyad *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Soyadınız"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            E-posta *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="+90 555 123 45 67"
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                        Adres *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            fontSize: "14px"
                                        }}
                                        placeholder="Tam adresiniz"
                                    />
                                </div>
                            </div>

                            {/* Profesyonel Bilgiler */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Profesyonel Bilgiler
                                </h4>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Deneyim *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.experience}
                                            onChange={(e) => handleInputChange('experience', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Örn: 3 yıl CNC operatörlüğü"
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Eğitim *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.education}
                                            onChange={(e) => handleInputChange('education', e.target.value)}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Örn: Makine Mühendisliği - İTÜ"
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                        Yetenekler (virgülle ayırın)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.skills}
                                        onChange={(e) => handleInputChange('skills', e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            fontSize: "14px"
                                        }}
                                        placeholder="Örn: AutoCAD, SolidWorks, CNC programlama"
                                    />
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                        Ön Yazı *
                                    </label>
                                    <textarea
                                        value={formData.coverLetter}
                                        onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                                        required
                                        rows={4}
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            fontSize: "14px",
                                            resize: "vertical"
                                        }}
                                        placeholder="Kendinizi tanıtın ve neden bu pozisyon için uygun olduğunuzu açıklayın..."
                                    />
                                </div>
                            </div>

                            {/* Ek Bilgiler */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Ek Bilgiler
                                </h4>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            CV URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.resumeUrl}
                                            onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="https://drive.google.com/..."
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Portfolio
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.portfolio}
                                            onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="https://portfolio.com"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.linkedIn}
                                            onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Başlama Tarihi
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.availableStartDate}
                                            onChange={(e) => handleInputChange('availableStartDate', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                        Beklenen Maaş
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.expectedSalary}
                                        onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            fontSize: "14px"
                                        }}
                                        placeholder="Örn: 25.000 TL"
                                    />
                                </div>
                            </div>

                            {/* Form Buttons */}
                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPosition(null)}
                                    style={{
                                        backgroundColor: "#6c757d",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "5px",
                                        fontSize: "14px",
                                        cursor: "pointer"
                                    }}
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: isSubmitting ? "#ccc" : "#8b2635",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "5px",
                                        fontSize: "14px",
                                        cursor: isSubmitting ? "not-allowed" : "pointer"
                                    }}
                                >
                                    {isSubmitting ? "Gönderiliyor..." : "Başvuru Gönder"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareersPage;
