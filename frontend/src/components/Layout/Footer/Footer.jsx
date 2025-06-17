import React from "react";
import "./Footer.css";

const Footer = () => {
  const companyInfo = {
    name: "Standart Kalıp",
    description: "Endüstriyel kalıp üretimi ve tasarımında 15 yıllık deneyim. Kalite, güvenilirlik ve inovasyonun buluştuğu nokta.",
    address: "Organize Sanayi Bölgesi, 45. Cadde No:12/A",
    city: "Konya, Türkiye",
    phone: "+90 332 123 45 67",
    fax: "+90 332 123 45 68",
    email: "info@standartkalip.com",
    workingHours: "Pazartesi - Cuma: 08:00 - 18:00"
  };

  const services = [
    "Kesim Üniteleri",
    "Sac Kalıp Elemanları",
    "Taşıma Elemanları",
    "Plastik Kalıp Elemanları",
    "Ana Sanayi Standartları"
  ];

  const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Ürünler", href: "/products" },
    { name: "Katalog İndir", href: "#" },
    { name: "İletişim", href: "/contact" }
  ];

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "OHSAS 18001",
    "CE Belgeli Ürünler"
  ];

  const currentYear = new Date().getFullYear();

  return (
    <React.Fragment>
      <footer className="footer">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-info">
                <h3>Teknik Bülten Aboneliği</h3>
                <p>Sektörel gelişmeler, yeni ürünler ve teknik bilgileri e-posta ile alın.</p>
              </div>
              <div className="newsletter-form">
                <form className="subscribe-form">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="E-posta adresinizi girin..."
                      required
                    />
                    <button type="submit" className="subscribe-btn">
                      <i className="bi bi-envelope"></i>
                      Abone Ol
                    </button>
                  </div>
                </form>
                <p className="privacy-note">
                  <i className="bi bi-shield-check"></i>
                  Bilgileriniz güvenle saklanır ve üçüncü taraflarla paylaşılmaz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              {/* Company Info */}
              <div className="footer-column company-info">
                <div className="footer-logo">
                  <h2>{companyInfo.name}</h2>
                  <span className="tagline">Kalıp Teknolojileri</span>
                </div>
                <p className="company-desc">{companyInfo.description}</p>

                <div className="contact-info">
                  <div className="contact-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div>
                      <span>{companyInfo.address}</span>
                      <span>{companyInfo.city}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                      <span>Faks: {companyInfo.fax}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill"></i>
                    <div>
                      <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                      <span>{companyInfo.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="footer-column">
                <h4>Ürün Kategorileri</h4>
                <ul className="footer-menu">
                  {services.map((service, index) => (
                    <li key={index}>
                      <a href={`/category/${service.toLowerCase().replace(/\s+/g, '-')}`}>
                        <i className="bi bi-chevron-right"></i>
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="footer-column">
                <h4>Hızlı Bağlantılar</h4>
                <ul className="footer-menu">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href}>
                        <i className="bi bi-chevron-right"></i>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="social-links">
                  <h5>Sosyal Medya</h5>
                  <div className="social-icons">
                    <a href="#" className="social-icon" title="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon" title="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="social-icon" title="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="social-icon" title="YouTube">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Certifications & Quality */}
              <div className="footer-column">
                <h4>Kalite Belgeleri</h4>
                <ul className="certifications-list">
                  {certifications.map((cert, index) => (
                    <li key={index}>
                      <i className="bi bi-award-fill"></i>
                      {cert}
                    </li>
                  ))}
                </ul>

                <div className="quality-badges">
                  <div className="quality-badge">
                    <i className="bi bi-shield-fill-check"></i>
                    <div>
                      <strong>Kalite Garantisi</strong>
                      <span>2 Yıl Garanti</span>
                    </div>
                  </div>
                  <div className="quality-badge">
                    <i className="bi bi-truck"></i>
                    <div>
                      <strong>Hızlı Teslimat</strong>
                      <span>7-14 İş Günü</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>
                  © {currentYear} <strong>{companyInfo.name}</strong>. Tüm hakları saklıdır.
                </p>
                <p className="developed-by">
                  Web sitesi profesyonel ekibimiz tarafından geliştirilmiştir.
                </p>
              </div>

              <div className="footer-links">
                <a href="/privacy-policy">Gizlilik Politikası</a>
                <a href="/terms">Kullanım Şartları</a>
                <a href="/cookies">Çerez Politikası</a>
                <a href="/kvkk">KVKK</a>
              </div>

              <div className="back-to-top">
                <button
                  className="back-to-top-btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <i className="bi bi-arrow-up"></i>
                  Yukarı Çık
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
