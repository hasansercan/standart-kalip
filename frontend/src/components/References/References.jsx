import React, { useEffect, useState } from 'react';
import './References.css';

const References = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // Responsive items per page ayarı
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setItemsPerPage(2);
            } else if (window.innerWidth <= 768) {
                setItemsPerPage(4);
            } else if (window.innerWidth <= 1024) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(8);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Referans firmaları verisi (admin panelden gelecek)
    const referencesData = [
        {
            id: 1,
            name: "Arıkan Metal",
            logo: "/img/brands/brand1.png",
            sector: "Otomotiv",
            isActive: true,
            sortOrder: 1
        },
        {
            id: 2,
            name: "Alba Plastik",
            logo: "/img/brands/brand2.png",
            sector: "Plastik",
            isActive: true,
            sortOrder: 2
        },
        {
            id: 3,
            name: "Ege Otomotiv",
            logo: "/img/brands/brand3.png",
            sector: "Otomotiv",
            isActive: true,
            sortOrder: 3
        },
        {
            id: 4,
            name: "Akoğlu Sanayi",
            logo: "/img/brands/brand4.png",
            sector: "Sanayi",
            isActive: true,
            sortOrder: 4
        },
        {
            id: 5,
            name: "AK-Pres",
            logo: "/img/brands/brand5.png",
            sector: "Pres",
            isActive: true,
            sortOrder: 5
        },
        {
            id: 6,
            name: "Ak Teknik",
            logo: "/img/brands/brand1.png",
            sector: "Teknik",
            isActive: true,
            sortOrder: 6
        },
        {
            id: 7,
            name: "AKA Otomotiv",
            logo: "/img/brands/brand2.png",
            sector: "Otomotiv",
            isActive: true,
            sortOrder: 7
        },
        {
            id: 8,
            name: "AK Yapak",
            logo: "/img/brands/brand3.png",
            sector: "Tekstil",
            isActive: true,
            sortOrder: 8
        },
        {
            id: 9,
            name: "Metal Sanayi A.Ş.",
            logo: "/img/brands/brand4.png",
            sector: "Metal",
            isActive: true,
            sortOrder: 9
        },
        {
            id: 10,
            name: "Teknik Makina",
            logo: "/img/brands/brand5.png",
            sector: "Makina",
            isActive: true,
            sortOrder: 10
        },
        {
            id: 11,
            name: "Endüstri Grup",
            logo: "/img/brands/brand1.png",
            sector: "Endüstri",
            isActive: true,
            sortOrder: 11
        },
        {
            id: 12,
            name: "Kalıp Teknoloji",
            logo: "/img/brands/brand2.png",
            sector: "Kalıp",
            isActive: true,
            sortOrder: 12
        }
    ];

    // Sadece aktif referansları göster ve sıralama düzenine göre sırala
    const activeReferences = referencesData
        .filter(ref => ref.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);

    const totalSlides = Math.ceil(activeReferences.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [totalSlides]);

    return (
        <section className="references">
            <div className="container">
                <div className="section-title">
                    <h2>Referanslarımız</h2>
                    <p>Güvenilir iş ortaklarımız ve değerli müşterilerimiz</p>
                </div>

                <div className="references-slider">
                    <div className="references-slider-wrapper">
                        <div
                            className="references-slides"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                display: 'flex',
                                transition: 'transform 0.6s ease-in-out'
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="references-slide">
                                    {activeReferences
                                        .slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage)
                                        .map((reference) => (
                                            <div key={reference.id} className="reference-item">
                                                <div className="reference-logo">
                                                    <img
                                                        src={reference.logo}
                                                        alt={reference.name}
                                                        onError={(e) => {
                                                            e.target.src = '/img/brands/brand1.png'; // Fallback image
                                                        }}
                                                    />
                                                </div>
                                                <div className="reference-info">
                                                    <h4>{reference.name}</h4>
                                                    <span className="sector">{reference.sector}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {totalSlides > 1 && (
                        <>
                            <button className="references-nav-btn references-prev" onClick={prevSlide}>
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="references-nav-btn references-next" onClick={nextSlide}>
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {totalSlides > 1 && (
                        <div className="references-dots">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`references-dot ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="references-stats">
                    <div className="stat-item">
                        <div className="stat-number">{activeReferences.length}+</div>
                        <div className="stat-label">Referans Firma</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Yıllık Deneyim</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Tamamlanan Proje</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">Müşteri Memnuniyeti</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default References;
