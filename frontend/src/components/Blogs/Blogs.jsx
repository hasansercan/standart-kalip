import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import "./Blogs.css";

const Blogs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogsPerPage, setBlogsPerPage] = useState(3);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // API'den blog verilerini çek
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blogs/published`);

        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          message.error("Blog verileri yüklenirken hata oluştu.");
        }
      } catch (error) {
        message.error("Blog verileri yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiUrl]);

  // Responsive blog sayısı ayarı
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBlogsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setBlogsPerPage(2);
      } else {
        setBlogsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(blogs.length / blogsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="blogs">
        <div className="container">
          <div className="section-title">
            <h2>Haberler ve Makaleler</h2>
            <p>Sektörel gelişmeler ve teknik bilgiler</p>
          </div>
          <div className="blogs-loading">
            <Spin size="large" />
            <p>Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="blogs">
        <div className="container">
          <div className="section-title">
            <h2>Haberler ve Makaleler</h2>
            <p>Sektörel gelişmeler ve teknik bilgiler</p>
          </div>
          <div className="blogs-empty">
            <h2>Henüz blog yazısı bulunmuyor</h2>
            <p>Yakında yeni içeriklerle buradayız!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <h2>Haberler ve Makaleler</h2>
          <p>Sektörel gelişmeler ve teknik bilgiler</p>
        </div>

        <div className="blog-slider">
          <div className="blog-slider-wrapper">
            <div
              className="blog-slides"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                display: 'flex',
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="blog-slide">
                  {blogs
                    .slice(slideIndex * blogsPerPage, (slideIndex + 1) * blogsPerPage)
                    .map((blog) => (
                      <BlogItem key={blog._id} blog={blog} />
                    ))
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Sadece birden fazla slide varsa göster */}
          {totalSlides > 1 && (
            <>
              <button className="blog-nav-btn blog-prev" onClick={prevSlide} aria-label="Önceki blog yazıları">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="blog-nav-btn blog-next" onClick={nextSlide} aria-label="Sonraki blog yazıları">
                <i className="bi bi-chevron-right"></i>
              </button>

              {/* Dots Indicator */}
              <div className="blog-dots">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={`blog-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`${index + 1}. blog grubu`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
