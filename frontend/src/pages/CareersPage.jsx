import React, { useState } from "react";
import "./CareersPage.css";

const CareersPage = () => {
    // Admin panelinden yönetilebilir açık pozisyonlar
    const [openPositions] = useState([
        {
            id: 1,
            title: "Kalıp Tasarım Mühendisi",
            department: "Mühendislik",
            location: "İstanbul",
            type: "Tam Zamanlı",
            experience: "3-5 Yıl",
            description: "Plastik enjeksiyon kalıpları tasarımı ve geliştirilmesi konusunda deneyimli mühendis aranmaktadır.",
            requirements: [
                "Makine Mühendisliği veya ilgili bölüm mezunu",
                "AutoCAD, SolidWorks, UG NX programlarında yetkin",
                "En az 3 yıl kalıp tasarımı deneyimi",
                "Takım çalışmasına yatkın",
                "İngilizce bilgisi (orta seviye)"
            ],
            isActive: true,
            postedDate: "2024-01-15"
        },
        {
            id: 2,
            title: "CNC Operatörü",
            department: "Üretim",
            location: "İstanbul",
            type: "Tam Zamanlı",
            experience: "2-4 Yıl",
            description: "CNC tezgahlarında kalıp parçalarının imalatı konusunda deneyimli operatör aranmaktadır.",
            requirements: [
                "Teknik lise veya meslek lisesi mezunu",
                "CNC programlama bilgisi",
                "Fanuc, Siemens kontrol sistemleri deneyimi",
                "Hassas ölçüm aletleri kullanımı",
                "Vardiya sisteminde çalışabilir"
            ],
            isActive: true,
            postedDate: "2024-01-10"
        },
        {
            id: 3,
            title: "Kalite Kontrol Teknisyeni",
            department: "Kalite",
            location: "İstanbul",
            type: "Tam Zamanlı",
            experience: "1-3 Yıl",
            description: "Kalıp ve mamul kalite kontrolü yapacak teknisyen aranmaktadır.",
            requirements: [
                "Makine veya Metal öğretmenliği mezunu",
                "Ölçüm cihazları kullanımı",
                "Koordinat ölçüm makinesi (CMM) deneyimi",
                "ISO 9001 standartları bilgisi",
                "Detaylara dikkat"
            ],
            isActive: true,
            postedDate: "2024-01-08"
        },
        {
            id: 4,
            title: "Satış Temsilcisi",
            department: "Satış",
            location: "İstanbul",
            type: "Tam Zamanlı",
            experience: "2-5 Yıl",
            description: "Endüstriyel müşterilerle iletişim kuracak satış temsilcisi aranmaktadır.",
            requirements: [
                "Üniversite mezunu (tercihen Mühendislik)",
                "B2B satış deneyimi",
                "Müşteri ilişkileri yönetimi",
                "İngilizce bilgisi (iyi seviye)",
                "Saha çalışmasına uygun"
            ],
            isActive: true,
            postedDate: "2024-01-05"
        }
    ]);

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        birthPlace: "",
        nationality: "",
        address: "",
        phone: "",
        email: "",
        gender: "",
        militaryStatus: "",
        educationLevel: "",
        educationInfo: "",
        motivation: "",
        cv: null
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Başvuru gönderildi:", formData);
        alert("Başvurunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
        setSelectedPosition(null);
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

                    <div className="row">
                        {openPositions.map((position) => (
                            <div key={position.id} className="col-lg-6 col-md-6" style={{ marginBottom: "30px" }}>
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
                                            {position.type}
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: "15px" }}>
                                        <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
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

                            {/* Hangi pozisyona çalışmak istiyorsunuz */}
                            <div style={{ marginBottom: "30px" }}>
                                <label style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px"
                                }}>
                                    Hangi pozisyona çalışmak istiyorsunuz?
                                </label>
                                <input
                                    type="text"
                                    value={selectedPosition.title}
                                    readOnly
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                />
                            </div>

                            {/* Kişisel Bilgileriniz */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Kişisel Bilgileriniz
                                </h4>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Ad Soyad"
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Soyad
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Soyad"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Doğum Tarihi
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Doğum Yeri
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.birthPlace}
                                            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Doğum Yeri"
                                        />
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Uyruk
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nationality}
                                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Uyruk"
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: "15px" }}>
                                    <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                        Adres
                                    </label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            fontSize: "14px",
                                            minHeight: "60px",
                                            resize: "vertical"
                                        }}
                                        placeholder="Adres"
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Cep Telefonu
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Cep Telefonu"
                                        />
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            E-Mail
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="E-Mail"
                                        />
                                    </div>
                                    <div className="col-md-4" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Cinsiyet
                                        </label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="erkek">Erkek</option>
                                            <option value="kadın">Kadın</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Askerlik Durumu
                                        </label>
                                        <select
                                            value={formData.militaryStatus}
                                            onChange={(e) => handleInputChange('militaryStatus', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="yapıldı">Yapıldı</option>
                                            <option value="muaf">Muaf</option>
                                            <option value="tecilli">Tecilli</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Öğrenim Bilgileriniz */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Öğrenim Bilgileriniz
                                </h4>

                                <div className="row">
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Öğrenim Durumu
                                        </label>
                                        <select
                                            value={formData.educationLevel}
                                            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="ilköğretim">İlköğretim</option>
                                            <option value="lise">Lise</option>
                                            <option value="önlisans">Önlisans</option>
                                            <option value="lisans">Lisans</option>
                                            <option value="yükseklisans">Yüksek Lisans</option>
                                            <option value="doktora">Doktora</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: "15px" }}>
                                        <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#333" }}>
                                            Okul / Üniversite
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.educationInfo}
                                            onChange={(e) => handleInputChange('educationInfo', e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                borderRadius: "4px",
                                                fontSize: "14px"
                                            }}
                                            placeholder="Okul / Üniversite"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Motivasyon */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    Neden Firmamızda Çalışmak İstiyorsunuz?
                                </h4>
                                <textarea
                                    value={formData.motivation}
                                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        minHeight: "100px",
                                        resize: "vertical"
                                    }}
                                    placeholder="Motivasyonunuzu ve hedeflerinizi kısaca açıklayınız..."
                                />
                            </div>

                            {/* CV Yükleme */}
                            <div style={{ marginBottom: "30px" }}>
                                <h4 style={{
                                    color: "#8b2635",
                                    marginBottom: "20px",
                                    fontSize: "1.1rem",
                                    borderBottom: "2px solid #8b2635",
                                    paddingBottom: "5px"
                                }}>
                                    CV Yükleme
                                </h4>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => handleInputChange('cv', e.target.files[0])}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "2px dashed #ddd",
                                        borderRadius: "4px",
                                        fontSize: "14px"
                                    }}
                                />
                                <small style={{ color: "#666", fontSize: "12px" }}>
                                    Kabul edilen formatlar: PDF, DOC, DOCX (Maksimum 5MB)
                                </small>
                            </div>

                            {/* Submit Button */}
                            <div style={{ textAlign: "center", marginTop: "30px" }}>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        border: "none",
                                        padding: "15px 40px",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
                                >
                                    Başvuruyu Tamamla
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
