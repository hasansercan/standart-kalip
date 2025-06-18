import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogItem from "./BlogItem";
import "./Blogs.css";

const Blogs = () => {
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
          setBlogs(data.slice(0, 6)); // En fazla 6 blog göster
        } else {
          console.error("Blog verileri yüklenirken hata oluştu.");
        }
      } catch (error) {
        console.error("Blog verileri yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [apiUrl]);

  if (loading) {
    return (
      <section className="blogs-section">
        <div className="container">
          <div className="blogs-loading">
            <div className="loading-spinner"></div>
            <p>Blog yazıları yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="blogs-section">
        <div className="container">
          <div className="blogs-header">
            <div className="header-badge">
              <span className="badge-icon">📖</span>
              <span className="badge-text">BLOG</span>
            </div>
            <h2 className="blogs-title">Haberler ve Makaleler</h2>
            <p className="blogs-description">
              Sektörel gelişmeler ve teknik bilgiler
            </p>
          </div>
          <div className="blogs-empty">
            <div className="empty-icon">📝</div>
            <h3>Henüz blog yazısı bulunmuyor</h3>
            <p>Yakında yeni içeriklerle buradayız!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blogs-section">
      <div className="container">
        {/* Section Header */}
        <div className="blogs-header">
          <div className="header-badge">
            <span className="badge-icon">📖</span>
            <span className="badge-text">BLOG & HABERLER</span>
          </div>
          <h2 className="blogs-title">Güncel Haberler ve Makaleler</h2>
          <p className="blogs-description">
            Kalıp sektöründeki en son gelişmeleri, teknik bilgileri ve uzman görüşlerini keşfedin.
            <br />
            İlham verici içeriklerimizle sektörün nabzını tutun.
          </p>
        </div>

        {/* Featured Blog */}
        {blogs[0] && (
          <div className="featured-blog">
            <div className="featured-blog-content">
              <div className="featured-blog-image">
                <img src={blogs[0].featuredImage} alt={blogs[0].title} />
                <div className="featured-overlay">
                  <div className="featured-category">
                    {blogs[0].category}
                  </div>
                  <div className="featured-date">
                    {new Date(blogs[0].createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              <div className="featured-blog-text">
                <div className="featured-meta">
                  <span className="author">
                    <i className="featured-author-icon">👤</i>
                    {blogs[0].author}
                  </span>
                  <span className="reading-time">
                    <i className="featured-time-icon">⏱️</i>
                    {blogs[0].readTime || 5} dk okuma
                  </span>
                  <span className="views">
                    <i className="featured-view-icon">👁️</i>
                    {blogs[0].views || 0} görüntüleme
                  </span>
                </div>
                <h3 className="featured-title">
                  <Link to={`/blog/${blogs[0].slug}`}>
                    {blogs[0].title}
                  </Link>
                </h3>
                <p className="featured-excerpt">
                  {blogs[0].excerpt || blogs[0].content?.substring(0, 200) + "..."}
                </p>
                {blogs[0].tags && blogs[0].tags.length > 0 && (
                  <div className="featured-tags">
                    {blogs[0].tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="featured-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link to={`/blog/${blogs[0].slug}`} className="featured-read-more">
                  <span>Makaleyi Oku</span>
                  <i className="featured-arrow">→</i>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {blogs.length > 1 && (
          <div className="blogs-grid">
            {blogs.slice(1, 6).map((blog, index) => (
              <BlogItem
                key={blog._id}
                blog={blog}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="blogs-cta">
          <Link to="/blog" className="view-all-blogs-btn">
            <span className="btn-text">Tüm Blog Yazılarını Görüntüle</span>
            <span className="btn-icon">📚</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
