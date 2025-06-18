import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ setIsSearchShow }) => {
  const { pathname } = useLocation();
  const user = localStorage.getItem("user");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dynamicPages, setDynamicPages] = useState([]);

  // Dinamik sayfaları yükle
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages`);
        if (response.ok) {
          const pages = await response.json();
          setDynamicPages(pages);
        }
      } catch (error) {
        console.error('Sayfalar yüklenirken hata:', error);
      }
    };

    fetchPages();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDropdownEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="phone-desktop">📞 +90 212 123 45 67</span>
              <span className="email-desktop">📧 info@standartkalip.com</span>
              <span className="phone-mobile">📞 212 123 45 67</span>
            </div>
            <div className="top-bar-right">
              <span className="experience-text">🌟 25 YILLIK DENEYİM - KALİTELİ ÜRETİM</span>
              <span className="experience-mobile">🌟 25 YIL DENEYİM</span>
              <div className="language-links">
                <a href="#" className="active">TR</a>
                <a href="#">EN</a>
                <a href="#">DE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-main">standart</div>
              <div className="logo-sub">KALIP</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <Link to="/" className={pathname === "/" ? "active" : ""}>
                ANASAYFA
              </Link>

              {/* Kurumsal Dropdown */}
              <div
                className="dropdown"
                onMouseEnter={() => handleDropdownEnter('kurumsal')}
                onMouseLeave={handleDropdownLeave}
              >
                <span className={`dropdown-trigger ${pathname.includes("/about") || pathname.includes("/page/") ? "active" : ""}`}>
                  KURUMSAL
                  <i className="bi bi-chevron-down"></i>
                </span>

                <div className={`dropdown-menu ${activeDropdown === 'kurumsal' ? 'show' : ''}`}>
                  {dynamicPages.map((page) => (
                    <Link key={page._id} to={`/page/${page.slug}`}>
                      {page.title}
                    </Link>
                  ))}

                  {dynamicPages.length === 0 && (
                    <>
                      <Link to="/about">Hakkımızda</Link>
                      <Link to="/mission-vision">Misyon & Vizyon</Link>
                      <Link to="/history">Tarihçemiz</Link>
                      <Link to="/certificates">Sertifikalarımız</Link>
                      <Link to="/facilities">Tesislerimiz</Link>
                    </>
                  )}
                </div>
              </div>

              <Link to="/shop" className={pathname === "/shop" ? "active" : ""}>
                ÜRÜNLERİMİZ
              </Link>

              <Link to="/blog" className={pathname === "/blog" ? "active" : ""}>
                BLOG
              </Link>

              <Link to="/services" className={pathname === "/services" ? "active" : ""}>
                KALİTE YÖNETİMİ
              </Link>

              <Link to="/careers" className={pathname === "/careers" ? "active" : ""}>
                KARIYER
              </Link>

              <Link to="/contact" className={pathname === "/contact" ? "active" : ""}>
                İLETİŞİM
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="header-cta">
              <Link to="/contact" className="cta-button">
                TEKLİF AL
              </Link>

              {user && JSON.parse(user).role === "admin" && (
                <Link to="/admin/dashboard" className="admin-button">
                  Admin
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <span className={isMenuOpen ? "active" : ""}></span>
              <span className={isMenuOpen ? "active" : ""}></span>
              <span className={isMenuOpen ? "active" : ""}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <Link to="/" onClick={closeMenu} className={pathname === "/" ? "active" : ""}>
              ANASAYFA
            </Link>

            <div className="mobile-dropdown">
              <span className="mobile-dropdown-title">KURUMSAL</span>
              <div className="mobile-dropdown-content">
                {dynamicPages.map((page) => (
                  <Link key={page._id} to={`/page/${page.slug}`} onClick={closeMenu}>
                    {page.title}
                  </Link>
                ))}

                {dynamicPages.length === 0 && (
                  <>
                    <Link to="/about" onClick={closeMenu}>Hakkımızda</Link>
                    <Link to="/mission-vision" onClick={closeMenu}>Misyon & Vizyon</Link>
                    <Link to="/history" onClick={closeMenu}>Tarihçemiz</Link>
                    <Link to="/certificates" onClick={closeMenu}>Sertifikalarımız</Link>
                    <Link to="/facilities" onClick={closeMenu}>Tesislerimiz</Link>
                  </>
                )}
              </div>
            </div>

            <Link to="/shop" onClick={closeMenu} className={pathname === "/shop" ? "active" : ""}>
              ÜRÜNLERİMİZ
            </Link>

            <Link to="/blog" onClick={closeMenu} className={pathname === "/blog" ? "active" : ""}>
              BLOG
            </Link>

            <Link to="/services" onClick={closeMenu} className={pathname === "/services" ? "active" : ""}>
              KALİTE YÖNETİMİ
            </Link>

            <Link to="/careers" onClick={closeMenu} className={pathname === "/careers" ? "active" : ""}>
              KARIYER
            </Link>

            <Link to="/contact" onClick={closeMenu} className={pathname === "/contact" ? "active" : ""}>
              İLETİŞİM
            </Link>

            {user && JSON.parse(user).role === "admin" && (
              <Link to="/admin/dashboard" onClick={closeMenu} className="mobile-admin">
                👨‍💼 ADMİN PANELİ
              </Link>
            )}

            <Link to="/contact" onClick={closeMenu} className="mobile-cta">
              📞 TEKLİF AL
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  setIsSearchShow: Proptypes.func,
};

export default Header;
