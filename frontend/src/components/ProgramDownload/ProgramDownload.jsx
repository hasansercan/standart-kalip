import React from 'react';
import './ProgramDownload.css';

const ProgramDownload = () => {
    const programData = {
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

    const handleDownload = () => {
        // Download logic will be implemented
        alert('Program indirme işlemi başlatılacak...');
    };

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
                                {programData.features.map((feature, index) => (
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
                                                <div className="design-area">
                                                    <div className="design-object obj1"></div>
                                                    <div className="design-object obj2"></div>
                                                    <div className="design-object obj3"></div>
                                                </div>
                                                <div className="properties-panel">
                                                    <div className="property"></div>
                                                    <div className="property"></div>
                                                    <div className="property"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="laptop-base"></div>
                            </div>
                        </div>

                        <div className="system-requirements">
                            <h4>Sistem Gereksinimleri</h4>
                            <ul>
                                {programData.systemRequirements.map((req, index) => (
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
