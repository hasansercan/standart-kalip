import React, { useEffect, useState } from 'react';
import './ProgramDownload.css';

const ProgramDownload = () => {
    const [programData, setProgramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // Varsayılan program verisi (fallback)
    const defaultProgramData = {
        name: "Standart Kalıp CAD Program",
        version: "v2.5.1",
        description: "Endüstriyel kalıp tasarımı ve üretimi için özel olarak geliştirilmiş profesyonel CAD yazılımı. Tüm kalıp elemanlarınızı kolayca tasarlayın ve optimize edin.",
        features: [
            "Gelişmiş 3D Kalıp Tasarım Araçları",
            "Otomatik Hesaplama Modülleri",
            "Standart Parça Kütüphanesi",
            "Teknik Çizim ve Raporlama",
            "Maliyet Analizi Araçları"
        ],
        systemRequirements: [
            "Windows 10/11 (64-bit)",
            "8 GB RAM (16 GB önerilen)",
            "DirectX 11 uyumlu ekran kartı",
            "10 GB boş disk alanı"
        ],
        downloadLink: "#",
        fileSize: "2.8 GB",
        lastUpdate: "15 Ocak 2024"
    };

    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/api/programs/active`);

                if (response.ok) {
                    const data = await response.json();
                    setProgramData(data);
                } else {
                    // Eğer aktif program yoksa varsayılan veriyi kullan
                    console.log("Aktif program bulunamadı, varsayılan veri kullanılıyor");
                    setProgramData(defaultProgramData);
                }
            } catch (error) {
                console.error("Program verisi alınırken hata:", error);
                setError("Program bilgileri yüklenirken bir hata oluştu");
                setProgramData(defaultProgramData);
            } finally {
                setLoading(false);
            }
        };

        fetchProgramData();
    }, [apiUrl]);

    const handleDownload = () => {
        if (programData && programData.downloadLink && programData.downloadLink !== "#") {
            window.open(programData.downloadLink, '_blank');
        } else {
            alert('Program indirme işlemi başlatılacak...');
        }
    };

    if (loading) {
        return (
            <section className="program-download">
                <div className="container">
                    <div className="section-title">
                        <h2>Profesyonel Tasarım Yazılımı</h2>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="program-download">
                <div className="container">
                    <div className="section-title">
                        <h2>Profesyonel Tasarım Yazılımı</h2>
                        <p style={{ color: '#e74c3c' }}>{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    // Program verisi yoksa hiçbir şey render etme
    if (!programData) {
        return null;
    }

    return (
        <section className="program-download">
            <div className="container">
                <div className="section-title">
                    <h2>Profesyonel Tasarım Yazılımı</h2>
                    <p>Kalıp tasarımınızı bir üst seviyeye taşıyın</p>
                </div>

                <div className="download-content">
                    <div className="program-info">
                        <div className="program-header">
                            <div className="program-icon">
                                <i className="bi bi-laptop"></i>
                            </div>
                            <div className="program-details">
                                <h3>{programData.name}</h3>
                                <span className="version">{programData.version}</span>
                                <div className="update-info">
                                    <i className="bi bi-calendar3"></i>
                                    Son güncelleme: {programData.lastUpdate}
                                </div>
                            </div>
                        </div>

                        <div className="program-description">
                            <p>{programData.description}</p>
                        </div>

                        <div className="program-features">
                            <h4>Özellikler</h4>
                            <ul>
                                {programData.features && programData.features.map((feature, index) => (
                                    <li key={index}>
                                        <i className="bi bi-check-circle-fill"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="download-section">
                            <div className="download-info">
                                <span className="file-size">
                                    <i className="bi bi-download"></i>
                                    Dosya Boyutu: {programData.fileSize}
                                </span>
                                <span className="download-type">
                                    <i className="bi bi-windows"></i>
                                    Windows Sürümü
                                </span>
                            </div>

                            <button className="download-btn" onClick={handleDownload}>
                                <i className="bi bi-download"></i>
                                <span>Program İndir</span>
                                <div className="btn-shine"></div>
                            </button>
                        </div>
                    </div>

                    <div className="program-visual">
                        <div className="laptop-container">
                            <div className="laptop">
                                <div className="laptop-screen">
                                    <div className="program-interface">
                                        <div className="interface-header">
                                            <div className="window-controls">
                                                <span className="control minimize"></span>
                                                <span className="control maximize"></span>
                                                <span className="control close"></span>
                                            </div>
                                            <div className="program-title">Standart Kalıp CAD</div>
                                        </div>
                                        <div className="interface-content">
                                            <div className="toolbar">
                                                <div className="tool-group">
                                                    <div className="tool active"></div>
                                                    <div className="tool"></div>
                                                    <div className="tool"></div>
                                                    <div className="tool"></div>
                                                </div>
                                            </div>
                                            <div className="workspace">
                                                <div className="grid-pattern"></div>
                                                <div className="design-elements">
                                                    <div className="element rect"></div>
                                                    <div className="element circle"></div>
                                                    <div className="element line"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="system-requirements">
                            <h4>Sistem Gereksinimleri</h4>
                            <ul>
                                {programData.systemRequirements && programData.systemRequirements.map((req, index) => (
                                    <li key={index}>
                                        <i className="bi bi-gear-fill"></i>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramDownload;
