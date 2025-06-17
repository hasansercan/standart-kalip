import { useEffect, useState } from "react";
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
      img: "/img/categories/categories1.png"
    },
    {
      id: "sac",
      name: "Sac Kalıp Elemanları",
      img: "/img/categories/categories2.png"
    },
    {
      id: "tasima",
      name: "Taşıma Elemanları",
      img: "/img/categories/categories3.png"
    },
    {
      id: "plastik",
      name: "Plastik Kalıp Elemanları",
      img: "/img/categories/categories4.png"
    },
    {
      id: "standart",
      name: "Ana Sanayi Standartları",
      img: "/img/categories/categories5.png"
    }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const categoriesData = await response.json();
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData);
          } else {
            // Eğer kategori yoksa fallback kullan
            setCategories(fallbackCategories);
          }
        } else {
          console.log("Kategori verisi alınamadı, fallback veriler kullanılıyor");
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.log("Kategori verisi alma hatası:", error);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  const handleCategoryClick = (categoryId) => {
    // Shop sayfasına yönlendir
    window.location.href = `/shop?category=${categoryId}`;
  };

  if (loading) {
    return (
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrapper">
              <span className="section-badge">ÜRÜNLERİMİZ</span>
              <h2 className="section-title">Ürün Kategorilerimiz</h2>
              <p className="section-description">Yükleniyor...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <span className="section-badge">ÜRÜNLERİMİZ</span>
            <h2 className="section-title">Ürün Kategorilerimiz</h2>
            <p className="section-description">
              25 yıllık deneyimimizle kalıp standart elemanları üretiminde sektörün öncü firmalarından biriyiz.
              Ürün kategorilerimizi keşfedin ve ihtiyacınıza uygun çözümü bulun.
            </p>
          </div>
        </div>

        <div className="category-tabs">
          {categories.map((category) => (
            <div
              key={category._id || category.id}
              className="category-tab"
              onClick={() => handleCategoryClick(category._id || category.id)}
            >
              <div className="category-icon">
                {category.img ? (
                  <img
                    src={category.img}
                    alt={category.name}
                    onError={(e) => {
                      // Resim yüklenemezse fallback icon göster
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="category-icon-fallback" style={{ display: category.img ? 'none' : 'flex' }}>
                  📦
                </div>
              </div>
              <div className="category-name">
                {category.name}
              </div>
              <button
                className="category-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category._id || category.id);
                }}
              >
                Ürünleri İncele
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
