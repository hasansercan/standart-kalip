import Proptypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/CartProvider";
import "./Header.css";

const Header = ({ setIsSearchShow }) => {
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem("user");
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
        }
    };

    fetchPages();
  }, []);

  // Scroll effect için
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      <div style={{
        backgroundColor: "#8B1538",
        color: "white",
        padding: "8px 0",
        fontSize: "14px"
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span>📞 +90 212 123 45 67</span>
              <span>📧 info@standartkalip.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span>🌟 25 YILLIK DENEYİM - KALİTELİ ÜRETİM</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href="#" style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "2px 8px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  fontSize: "12px"
                }}>TR</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "12px" }}>EN</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "12px" }}>DE</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        position: "sticky",
        top: "0",
        zIndex: "1000",
        backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "white",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 0",
            position: "relative"
          }}>

            {/* Logo */}
            <Link to="/" style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#8B1538",
                letterSpacing: "-1px"
              }}>
                standart
              </div>
              <div style={{
                fontSize: "1.2rem",
                color: "#666",
                fontWeight: "300",
                textTransform: "uppercase",
                letterSpacing: "2px"
              }}>
                KALIP
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{
              display: window.innerWidth > 992 ? "flex" : "none",
              alignItems: "center",
              gap: "40px"
            }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: pathname === "/" ? "#8B1538" : "#333",
                  fontWeight: pathname === "/" ? "600" : "500",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "relative",
                  padding: "10px 0",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                onMouseLeave={(e) => e.target.style.color = pathname === "/" ? "#8B1538" : "#333"}
              >
                ANASAYFA
                {pathname === "/" && <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "2px",
                  backgroundColor: "#8B1538"
                }}></div>}
              </Link>

              {/* Kurumsal Dropdown */}
              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => handleDropdownEnter('kurumsal')}
                onMouseLeave={handleDropdownLeave}
              >
                <div
                  style={{
                    textDecoration: "none",
                    color: pathname.includes("/about") || pathname.includes("/mission") || pathname.includes("/history") || pathname.includes("/certificates") || pathname.includes("/facilities") ? "#8B1538" : "#333",
                    fontWeight: pathname.includes("/about") ? "600" : "500",
                    fontSize: "15px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "color 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                  onMouseLeave={(e) => e.target.style.color = pathname.includes("/about") ? "#8B1538" : "#333"}
                >
                  KURUMSAL
                  <i className="bi bi-chevron-down" style={{ fontSize: "12px" }}></i>
                </div>

                {/* Kurumsal Dropdown Menu */}
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  backgroundColor: "white",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  padding: "20px 0",
                  minWidth: "220px",
                  opacity: activeDropdown === 'kurumsal' ? "1" : "0",
                  visibility: activeDropdown === 'kurumsal' ? "visible" : "hidden",
                  transform: `translateY(${activeDropdown === 'kurumsal' ? '0' : '-10px'})`,
                  transition: "all 0.3s ease",
                  zIndex: "999",
                  border: "1px solid #f0f0f0"
                }}>
                  {/* Dinamik Sayfalar */}
                  {dynamicPages.map((page) => (
                    <Link
                      key={page._id}
                      to={`/page/${page.slug}`}
                      style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#f8f9fa";
                        e.target.style.color = "#8B1538";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#333";
                      }}
                    >
                      {page.title}
                    </Link>
                  ))}

                  {/* Eğer dinamik sayfa yoksa statik sayfaları göster */}
                  {dynamicPages.length === 0 && (
                    <>
                      <Link to="/about" style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f8f9fa";
                          e.target.style.color = "#8B1538";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#333";
                        }}>
                        Hakkımızda
                      </Link>
                      <Link to="/mission-vision" style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f8f9fa";
                          e.target.style.color = "#8B1538";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#333";
                        }}>
                        Misyon & Vizyon
                      </Link>
                      <Link to="/history" style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f8f9fa";
                          e.target.style.color = "#8B1538";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#333";
                        }}>
                        Tarihçemiz
                      </Link>
                      <Link to="/certificates" style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f8f9fa";
                          e.target.style.color = "#8B1538";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#333";
                        }}>
                        Sertifikalarımız
                      </Link>
                      <Link to="/facilities" style={{
                        display: "block",
                        padding: "10px 20px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f8f9fa";
                          e.target.style.color = "#8B1538";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#333";
                        }}>
                        Tesislerimiz
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <Link
                to="/shop"
                style={{
                  textDecoration: "none",
                  color: pathname === "/shop" ? "#8B1538" : "#333",
                  fontWeight: pathname === "/shop" ? "600" : "500",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "relative",
                  padding: "10px 0",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                onMouseLeave={(e) => e.target.style.color = pathname === "/shop" ? "#8B1538" : "#333"}
              >
                ÜRÜNLERİMİZ
                {pathname === "/shop" && <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "2px",
                  backgroundColor: "#8B1538"
                }}></div>}
              </Link>

              <Link
                to="/services"
                style={{
                  textDecoration: "none",
                  color: pathname === "/services" ? "#8B1538" : "#333",
                  fontWeight: pathname === "/services" ? "600" : "500",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "relative",
                  padding: "10px 0",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                onMouseLeave={(e) => e.target.style.color = pathname === "/services" ? "#8B1538" : "#333"}
              >
                KALİTE YÖNETİMİ
                {pathname === "/services" && <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "2px",
                  backgroundColor: "#8B1538"
                }}></div>}
              </Link>

              <Link
                to="/careers"
                style={{
                  textDecoration: "none",
                  color: pathname === "/careers" ? "#8B1538" : "#333",
                  fontWeight: pathname === "/careers" ? "600" : "500",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "relative",
                  padding: "10px 0",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                onMouseLeave={(e) => e.target.style.color = pathname === "/careers" ? "#8B1538" : "#333"}
              >
                KARIYER
                {pathname === "/careers" && <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "2px",
                  backgroundColor: "#8B1538"
                }}></div>}
              </Link>

              <Link
                to="/contact"
                style={{
                  textDecoration: "none",
                  color: pathname === "/contact" ? "#8B1538" : "#333",
                  fontWeight: pathname === "/contact" ? "600" : "500",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  position: "relative",
                  padding: "10px 0",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#8B1538"}
                onMouseLeave={(e) => e.target.style.color = pathname === "/contact" ? "#8B1538" : "#333"}
              >
                İLETİŞİM
                {pathname === "/contact" && <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "2px",
                  backgroundColor: "#8B1538"
                }}></div>}
              </Link>
            </nav>

            {/* CTA Button */}
            <div style={{
              display: window.innerWidth > 992 ? "flex" : "none",
              alignItems: "center",
              gap: "20px"
            }}>
              <Link
                to="/contact"
                style={{
                  backgroundColor: "#8B1538",
                  color: "white",
                  padding: "12px 25px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease",
                  border: "2px solid #8B1538"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#8B1538";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#8B1538";
                  e.target.style.color = "white";
                }}
              >
                TEKLİF AL
              </Link>

              {/* Admin Panel Erişimi */}
              {user && JSON.parse(user).role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  style={{
                    color: "#dc3545",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #dc3545",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#dc3545";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#dc3545";
                  }}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              style={{
                display: window.innerWidth <= 992 ? "flex" : "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0"
              }}
            >
              <div style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#8B1538",
                margin: "2px 0",
                transition: "0.3s",
                transform: isMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
              }}></div>
              <div style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#8B1538",
                margin: "2px 0",
                transition: "0.3s",
                opacity: isMenuOpen ? "0" : "1"
              }}></div>
              <div style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#8B1538",
                margin: "2px 0",
                transition: "0.3s",
                transform: isMenuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
              }}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          display: isMenuOpen && window.innerWidth <= 992 ? "block" : "none",
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          backgroundColor: "white",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          borderTop: "1px solid #f0f0f0",
          zIndex: "999"
        }}>
          <div className="container">
            <nav style={{
              padding: "20px 0",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                ANASAYFA
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/about" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                KURUMSAL
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/products" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                ÜRÜNLERİMİZ
              </Link>
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/services" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                KALİTE YÖNETİMİ
              </Link>
              <Link
                to="/careers"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/careers" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                KARIYER
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: pathname === "/contact" ? "#8B1538" : "#333",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                İLETİŞİM
              </Link>

              <div style={{ marginTop: "20px" }}>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    backgroundColor: "#8B1538",
                    color: "white",
                    padding: "15px 30px",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    display: "inline-block",
                    textAlign: "center",
                    width: "100%"
                  }}
                >
                  TEKLİF AL
                </Link>
              </div>
            </nav>
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
