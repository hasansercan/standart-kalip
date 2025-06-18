import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Fallback kategoriler - eğer API'den veri gelmezse
  const fallbackCategories = [
    {
      id: "kesim",
      name: "Kesim Üniteleri",
      img: "/img/categories/categories1.png",
      description: "Hassas kesim işlemleri için özel tasarlanmış üniteler",
      icon: "⚙️"
    },
    {
      id: "sac",
      name: "Sac Kalıp Elemanları",
      img: "/img/categories/categories2.png",
      description: "Dayanıklı sac işleme kalıp elemanları",
      icon: "🔧"
    },
    {
      id: "tasima",
      name: "Taşıma Elemanları",
      img: "/img/categories/categories3.png",
      description: "Güvenli ve verimli taşıma çözümleri",
      icon: "📦"
    },
    {
      id: "plastik",
      name: "Plastik Kalıp Elemanları",
      img: "/img/categories/categories4.png",
      description: "Plastik enjeksiyon kalıp sistemleri",
      icon: "🏭"
    },
    {
      id: "standart",
      name: "Ana Sanayi Standartları",
      img: "/img/categories/categories5.png",
      description: "Endüstri standartlarına uygun kalıp elemanları",
      icon: "⭐"
    }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const categoriesData = await response.json();
          if (categoriesData && categoriesData.length > 0) {
            // API'den gelen kategorilere fallback icon'ları ekle
            const enrichedCategories = categoriesData.map((cat, index) => ({
              ...cat,
              icon: fallbackCategories[index]?.icon || "📦",
              description: cat.description || fallbackCategories[index]?.description || "Kaliteli ürün kategorisi"
            }));
            setCategories(enrichedCategories);
          } else {
            setCategories(fallbackCategories);
          }
        } else {
          setCategories(fallbackCategories);
        }
      } catch (error) {
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  if (loading) {
    return (
      <section className="categories-section">
        <div className="container">
          <div className="categories-loading">
            <div className="loading-spinner"></div>
            <p>Kategoriler yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="categories-header">
          <div className="header-badge">
            <span className="badge-icon">🏭</span>
            <span className="badge-text">ÜRÜNLERİMİZ</span>
          </div>
          <h2 className="categories-title">Ürün Kategorilerimiz</h2>
          <p className="categories-description">
            25 yıllık deneyimimizle kalıp standart elemanları üretiminde sektörün öncü firmalarından biriyiz.
            <br />
            Ürün kategorilerimizi keşfedin ve ihtiyacınıza uygun çözümü bulun.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.slice(0, 6).map((category, index) => (
            <div
              key={category._id || category.id}
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-card-inner">
                {/* Card Header */}
                <div className="category-header">
                  <div className="category-icon-wrapper">
                    {category.img ? (
                      <img
                        src={category.img}
                        alt={category.name}
                        className="category-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="category-icon-fallback" style={{ display: category.img ? 'none' : 'flex' }}>
                      {category.icon || "📦"}
                    </div>
                  </div>
                  <div className="category-number">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Card Content */}
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">
                    {category.description || "Yüksek kaliteli kalıp elemanları"}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="category-footer">
                  <Link
                    to={`/shop?category=${category._id || category.id}`}
                    className="category-link"
                  >
                    <span>Ürünleri İncele</span>
                    <i className="category-arrow">→</i>
                  </Link>
                </div>

                {/* Hover Effect */}
                <div className="category-hover-effect"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="categories-cta">
          <Link to="/shop" className="view-all-btn">
            <span className="btn-text">Tüm Ürünleri Görüntüle</span>
            <span className="btn-icon">🔍</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
