import { useEffect, useState } from "react";
import "./ShopPage.css";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kategori verileri
  const categories = [
    {
      id: "all",
      name: "Tüm Ürünler",
      icon: "🔧"
    },
    {
      id: "kesim",
      name: "Kesim Üniteleri",
      icon: "⚙️"
    },
    {
      id: "sac",
      name: "Sac Kalıp Elemanları",
      icon: "🔩"
    },
    {
      id: "tasima",
      name: "Taşıma Elemanları",
      icon: "🚚"
    },
    {
      id: "plastik",
      name: "Plastik Kalıp Elemanları",
      icon: "🏗️"
    },
    {
      id: "standart",
      name: "Ana Sanayi Standartları",
      icon: "📏"
    }
  ];

  // Örnek ürün verileri
  const allProducts = [
    // Kesim Üniteleri
    {
      id: 1,
      name: "Hassas Kesim Ünitesi KU-100",
      category: "kesim",
      price: "2.500 TL",
      image: "/img/products/product1/1.png",
      description: "Yüksek hassasiyetli kesim işlemleri için ideal",
      specs: ["Hassasiyet: ±0.01mm", "Malzeme: Çelik", "Ağırlık: 2.5kg"]
    },
    {
      id: 2,
      name: "CNC Kesim Kalıbı KU-200",
      category: "kesim",
      price: "4.200 TL",
      image: "/img/products/product2/1.png",
      description: "CNC tezgahlar için özel tasarlanmış kesim kalıbı",
      specs: ["Boyut: 150x100mm", "Malzeme: Sertleştirilmiş Çelik", "Dayanıklılık: 50.000 çevrim"]
    },
    {
      id: 3,
      name: "Otomatik Kesim Sistemi KU-300",
      category: "kesim",
      price: "8.750 TL",
      image: "/img/products/product3/1.png",
      description: "Tam otomatik kesim sistemi, yüksek verimlilik",
      specs: ["Kapasite: 100 parça/saat", "Güç: 5kW", "Kontrol: PLC"]
    },

    // Sac Kalıp Elemanları
    {
      id: 4,
      name: "Sac Bükme Kalıbı SK-100",
      category: "sac",
      price: "1.850 TL",
      image: "/img/products/product4/1.png",
      description: "Sac bükme işlemleri için standart kalıp",
      specs: ["Açı: 90°", "Kalınlık: 0.5-3mm", "Malzeme: HRC 58-62"]
    },
    {
      id: 5,
      name: "Progresif Sac Kalıbı SK-200",
      category: "sac",
      price: "12.400 TL",
      image: "/img/products/product5/1.png",
      description: "Çoklu işlem progresif sac kalıbı",
      specs: ["İstasyon: 6 adım", "Hız: 200 atım/dk", "Ürün boyutu: 50x30mm"]
    },
    {
      id: 6,
      name: "Transfer Sac Kalıbı SK-300",
      category: "sac",
      price: "18.600 TL",
      image: "/img/products/product1/2.png",
      description: "Karmaşık sac parçalar için transfer kalıbı",
      specs: ["Transfer mesafesi: 80mm", "Hassasiyet: ±0.05mm", "Boyut: 400x300mm"]
    },

    // Taşıma Elemanları
    {
      id: 7,
      name: "Hidrolik Kaldırma Sistemi TK-100",
      category: "tasima",
      price: "5.200 TL",
      image: "/img/products/product2/2.png",
      description: "Ağır kalıplar için hidrolik kaldırma sistemi",
      specs: ["Kapasite: 5 ton", "Yükseklik: 200-1000mm", "Kontrol: Manuel"]
    },
    {
      id: 8,
      name: "Döner Tabla Sistemi TK-200",
      category: "tasima",
      price: "3.750 TL",
      image: "/img/products/product3/2.png",
      description: "360° döner tabla ile kolay pozisyonlama",
      specs: ["Çap: 500mm", "Yük kapasitesi: 1000kg", "Döner hız: 0.5-5 rpm"]
    },
    {
      id: 9,
      name: "Otomatik Konveyör TK-300",
      category: "tasima",
      price: "15.800 TL",
      image: "/img/products/product4/2.png",
      description: "Parça taşıma için otomatik konveyör sistemi",
      specs: ["Uzunluk: 5m", "Hız: 0.1-2 m/s", "Yük: 50kg/m"]
    },

    // Plastik Kalıp Elemanları
    {
      id: 10,
      name: "İnjeksiyon Kalıbı PK-100",
      category: "plastik",
      price: "9.500 TL",
      image: "/img/products/product5/2.png",
      description: "Plastik enjeksiyon kalıbı, tek kaviteli",
      specs: ["Kavite: 1", "Çevrim süresi: 30sn", "Malzeme: P20 çelik"]
    },
    {
      id: 11,
      name: "Çok Kaviteli Kalıp PK-200",
      category: "plastik",
      price: "24.700 TL",
      image: "/img/products/product1/3.png",
      description: "8 kaviteli yüksek verimli enjeksiyon kalıbı",
      specs: ["Kavite: 8", "Çevrim süresi: 25sn", "Soğutma: 12 kanal"]
    },
    {
      id: 12,
      name: "Sıcak Kanal Sistemi PK-300",
      category: "plastik",
      price: "18.900 TL",
      image: "/img/products/product2/3.png",
      description: "Sıcak kanal sistemli hassas kalıp",
      specs: ["Sıcaklık kontrolü: ±2°C", "Nozzle: 4 adet", "Heater güç: 2kW"]
    },

    // Ana Sanayi Standartları
    {
      id: 13,
      name: "DIN Standart Kalıp AS-100",
      category: "standart",
      price: "3.200 TL",
      image: "/img/products/product3/3.png",
      description: "DIN standardına uygun kalıp çözümü",
      specs: ["Standart: DIN 9861", "Tolerans: ISO 2768-m", "Sertlik: HRC 58-62"]
    },
    {
      id: 14,
      name: "ISO Sertifikalı Sistem AS-200",
      category: "standart",
      price: "7.800 TL",
      image: "/img/products/product4/3.png",
      description: "ISO standartlarında sertifikalı sistem",
      specs: ["Sertifika: ISO 9001", "Test raporu: Dahil", "Garanti: 2 yıl"]
    },
    {
      id: 15,
      name: "Özel Endüstri Çözümü AS-300",
      category: "standart",
      price: "15.600 TL",
      image: "/img/products/product5/3.png",
      description: "Müşteri ihtiyaçlarına özel tasarım",
      specs: ["Özel tasarım", "Proje süresi: 4-6 hafta", "Teknik destek: Dahil"]
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCategory === "all") {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(allProducts.filter(product => product.category === selectedCategory));
      }
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>Ürünlerimiz</h1>
              <nav className="breadcrumb">
                <a href="/">Anasayfa</a> / <span>Ürünlerimiz</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <section className="category-filter-section">
        <div className="container">
          <div className="section-header center">
            <h2>Ürün Kategorileri</h2>
            <div className="section-line"></div>
            <p>İhtiyacınıza uygun kategoriyi seçerek ürünlerimizi keşfedin</p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <h3>
              {selectedCategory === "all"
                ? "Tüm Ürünlerimiz"
                : categories.find(cat => cat.id === selectedCategory)?.name
              }
            </h3>
            <span className="product-count">
              {filteredProducts.length} ürün bulundu
            </span>
          </div>

          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Ürünler yükleniyor...</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-overlay">
                      <button className="btn-details">Detayları Gör</button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-description">{product.description}</p>

                    <div className="product-specs">
                      {product.specs.map((spec, index) => (
                        <span key={index} className="spec-item">
                          <i className="bi bi-check-circle"></i>
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      <button className="btn btn-primary">
                        <i className="bi bi-cart-plus"></i>
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="no-products">
              <i className="bi bi-inbox"></i>
              <h3>Bu kategoride henüz ürün bulunmuyor</h3>
              <p>Diğer kategorileri inceleyebilir veya daha sonra tekrar kontrol edebilirsiniz.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
