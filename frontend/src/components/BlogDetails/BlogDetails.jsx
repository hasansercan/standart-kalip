import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogDetails.css";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/blogs/slug/${slug}`);

        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else if (response.status === 404) {
          message.error("Blog yazısı bulunamadı.");
          navigate("/blog");
        } else {
          message.error("Blog yüklenirken hata oluştu.");
        }
      } catch (error) {
        message.error("Blog yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, apiUrl, navigate]);

  if (loading) {
    return (
      <section className="single-blog">
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            background: 'white',
            borderRadius: '20px',
            padding: '60px 20px'
          }}>
            <Spin size="large" />
            <p style={{ marginTop: 20, fontSize: '16px', color: '#64748b' }}>
              Blog yazısı yükleniyor...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="single-blog">
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            background: 'white',
            borderRadius: '20px',
            padding: '60px 20px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', color: '#475569', marginBottom: '10px' }}>
              Blog yazısı bulunamadı
            </h2>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
            </p>
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/blog")}
              size="large"
            >
              Blog Listesine Dön
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="single-blog">
      <div className="container">
        {/* Geri Dön Butonu */}
        <div style={{ marginBottom: '20px' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/blog")}
            style={{
              color: '#64748b',
              fontSize: '14px',
              padding: '4px 8px',
              height: 'auto'
            }}
          >
            Blog Listesine Dön
          </Button>
        </div>

        <article>
          <figure>
            <img src={blog.featuredImage} alt={blog.title} />
          </figure>
          <div className="blog-wrapper">
            <div className="blog-meta">
              <div className="blog-category">
                <Tag color="blue">{blog.category}</Tag>
              </div>
              <div className="blog-date">
                <i className="bi bi-calendar3"></i>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="blog-author">
                <i className="bi bi-person"></i>
                <span>{blog.author}</span>
              </div>
              <div className="blog-reading-time">
                <i className="bi bi-clock"></i>
                <span>{blog.readTime} dakika</span>
              </div>
              <div className="blog-views">
                <i className="bi bi-eye"></i>
                <span>{blog.views} görüntülenme</span>
              </div>
            </div>

            <h1 className="blog-title">{blog.title}</h1>

            <div className="blog-excerpt">
              <p>{blog.excerpt}</p>
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-tags">
                <h4>Etiketler</h4>
                {blog.tags.map((tag, index) => (
                  <Tag key={index} style={{ margin: '4px' }}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Blog Comments Section - Gelecekte eklenebilir */}
        <div className="blog-comments-section">
          <h3>💬 Yorumlar</h3>
          <p>
            Blog yorumları özelliği yakında eklenecek. O zamana kadar bizimle
            <a href="/contact" style={{ color: '#8b2635', marginLeft: '4px' }}>iletişime geçebilirsiniz</a>.
          </p>
        </div>

        {/* Related Blogs Section - Gelecekte eklenebilir */}
        <div className="related-blogs-section">
          <h3>📚 İlgili Blog Yazıları</h3>
          <p>
            Benzer konulardaki blog yazıları özelliği yakında eklenecek.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
