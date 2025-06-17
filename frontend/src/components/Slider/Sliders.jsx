import { useEffect, useRef, useState } from "react";
import SliderItem from "./SliderItem";
import "./Sliders.css";

const Sliders = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null); // Interval'ı saklamak için ref
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fallback data - eğer API'den veri gelmezse
  const fallbackSlides = [
    {
      id: 1,
      image: "/img/slider/slider1.jpg",
      subtitle: "2025 FUARI",
      title: "Die & Mould China 2025 Fuarı",
      description: "04-07 Haziran 2025 tarihlerinde Şanghay/Çin'de düzenlenecek uluslararası kalıp fuarında W1 Hall E188 nolu standımızda siz değerli ziyaretçilerimizi bekleyoruz.",
      buttonText: "Detayları İncele",
      link: "#"
    },
    {
      id: 2,
      image: "/img/slider/slider2.jpg",
      subtitle: "KALİTE VE GÜVENİLİRLİK",
      title: "Standart Kalıp ile Mükemmellik",
      description: "Yılların deneyimi ve modern teknoloji ile ürettiğimiz kalıp elemanları ile işinizi kolaylaştırıyoruz.",
      buttonText: "Ürünlerimizi Keşfet",
      link: "#"
    },
    {
      id: 3,
      image: "/img/slider/slider3.jpg",
      subtitle: "YENİLİKÇİ ÇÖZÜMLER",
      title: "Endüstriyel Kalıp Teknolojileri",
      description: "Sektörün ihtiyaçlarına yönelik özel tasarım kalıp elemanları ve hızlı çözümler sunuyoruz.",
      buttonText: "İletişime Geçin",
      link: "#"
    }
  ];

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sliders/active`);

        if (response.ok) {
          const slidersData = await response.json();
          if (slidersData && slidersData.length > 0) {
            setSlidesData(slidersData);
          } else {
            // Eğer aktif slider yoksa fallback kullan
            setSlidesData(fallbackSlides);
          }
        } else {
          setSlidesData(fallbackSlides);
        }
      } catch (error) {
        setSlidesData(fallbackSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [apiUrl]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length);
  };

  // Otomatik geçişi başlatan fonksiyon
  const startSlider = () => {
    stopSlider(); // Önceki interval'ı temizle
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  // Otomatik geçişi durduran fonksiyon
  const stopSlider = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (slidesData.length > 1) {
      startSlider();
    }
    return () => stopSlider(); // Component unmount olduğunda temizle
  }, [slidesData.length]);

  if (loading) {
    return (
      <section className="slider">
        <div className="slider-elements" style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>Yükleniyor...</div>
        </div>
      </section>
    );
  }

  if (!slidesData || slidesData.length === 0) {
    return null;
  }

  return (
    <section
      className="slider"
      onMouseEnter={stopSlider}
      onMouseLeave={startSlider}
    >
      <div className="slider-elements">
        {slidesData.map((slide, index) => (
          index === currentSlide && (
            <SliderItem key={slide._id || slide.id} slide={slide} />
          )
        ))}

        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="slider-dots">
          {slidesData.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            >
              <span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sliders;
