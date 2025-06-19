import { message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Auth kontrolü - giriş yapmayan kullanıcıları login sayfasına yönlendir
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Loading durumu - auth kontrol edilirken loading göster
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Yükleniyor...
      </div>
    );
  }

  // Giriş yapmamış kullanıcı - hiçbir şey render etme
  if (!isAuthenticated) {
    return null;
  }

  // Menu items
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      key: "categories",
      label: "Kategoriler",
      icon: "📁",
      children: [
        { label: "Kategori Listesi", path: "/admin/categories" },
        { label: "Yeni Kategori", path: "/admin/categories/create" },
      ],
    },
    {
      key: "blogs",
      label: "Blog Yazıları",
      icon: "📝",
      children: [
        { label: "Blog Listesi", path: "/admin/blogs" },
        { label: "Yeni Blog", path: "/admin/blogs/create" },
      ],
    },
    {
      key: "features",
      label: "Özellikler",
      icon: "⭐",
      children: [
        { label: "Özellik Listesi", path: "/admin/features" },
        { label: "Yeni Özellik", path: "/admin/features/create" },
      ],
    },
    {
      key: "sliders",
      label: "Sliderlar",
      icon: "🖼️",
      children: [
        { label: "Slider Listesi", path: "/admin/sliders" },
        { label: "Yeni Slider", path: "/admin/sliders/create" },
      ],
    },
    {
      key: "products",
      label: "Ürünler",
      icon: "💻",
      children: [
        { label: "Ürün Listesi", path: "/admin/products" },
        { label: "Yeni Ürün", path: "/admin/products/create" },
      ],
    },
    {
      key: "programs",
      label: "Program Bilgileri",
      icon: "📊",
      children: [
        { label: "Program Listesi", path: "/admin/programs" },
        { label: "Yeni Program", path: "/admin/programs/create" },
      ],
    },
    {
      key: "references",
      label: "Referanslar",
      icon: "👥",
      children: [
        { label: "Referans Listesi", path: "/admin/references" },
        { label: "Yeni Referans", path: "/admin/references/create" },
      ],
    },
    {
      key: "pages",
      label: "Sayfalar",
      icon: "📄",
      children: [
        { label: "Sayfa Listesi", path: "/admin/pages" },
        { label: "Yeni Sayfa", path: "/admin/pages/create" },
      ],
    },
    {
      key: "users",
      label: "Kullanıcılar",
      icon: "👤",
      children: [
        { label: "Kullanıcı Listesi", path: "/admin/users" },
        { label: "Yeni Kullanıcı", path: "/admin/users/create" },
      ],
    },
    {
      key: "quality",
      label: "Kalite Yönetimi",
      icon: "🔍",
      children: [
        { label: "Kalite Listesi", path: "/admin/quality-management" },
        { label: "Yeni Kalite", path: "/admin/quality-management/create" },
      ],
    },
    {
      key: "jobs",
      label: "İş İlanları",
      icon: "💼",
      children: [
        { label: "İlan Listesi", path: "/admin/jobs" },
        { label: "Yeni İlan", path: "/admin/jobs/create" },
      ],
    },
    {
      key: "job-applications",
      label: "İş Başvuruları",
      path: "/admin/job-applications",
      icon: "📋",
    },
    {
      key: "messages",
      label: "Mesajlar",
      path: "/admin/messages",
      icon: "💬",
    },
    {
      key: "settings",
      label: "Ayarlar",
      path: "/admin/settings",
      icon: "⚙️",
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/admin/dashboard") return "Dashboard";
    if (path.includes("/admin/categories")) return "Kategoriler";
    if (path.includes("/admin/blogs")) return "Blog Yazıları";
    if (path.includes("/admin/features")) return "Özellikler";
    if (path.includes("/admin/sliders")) return "Sliderlar";
    if (path.includes("/admin/products")) return "Ürünler";
    if (path.includes("/admin/programs")) return "Program Bilgileri";
    if (path.includes("/admin/references")) return "Referanslar";
    if (path.includes("/admin/pages")) return "Sayfalar";
    if (path.includes("/admin/users")) return "Kullanıcılar";
    if (path.includes("/admin/quality-management")) return "Kalite Yönetimi";
    if (path.includes("/admin/jobs")) return "İş İlanları";
    if (path.includes("/admin/job-applications")) return "İş Başvuruları";
    if (path.includes("/admin/messages")) return "Mesajlar";
    if (path.includes("/admin/settings")) return "Ayarlar";

    return "Yönetim Paneli";
  };

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isMenuActive = (item) => {
    if (item.path) return isActive(item.path);
    if (item.children) {
      return item.children.some(child => isActive(child.path));
    }
    return false;
  };

  const handleMenuClick = (path) => {
    if (path) {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  const handleSubmenuToggle = (key) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  const handleSubmenuItemClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Başarıyla çıkış yapıldı.");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to login
      navigate("/admin", { replace: true });
    }
  };

  const handleBackToSite = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Auto-open submenus based on current path
  useEffect(() => {
    const currentPath = location.pathname;

    menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child =>
          currentPath === child.path || currentPath.startsWith(child.path + "/")
        );
        if (hasActiveChild) {
          setActiveSubmenu(item.key);
        }
      }
    });
  }, [location.pathname]);

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="container">
          <div className="header-content">
            {/* Left side */}
            <div className="header-left">
              <button
                className={`mobile-menu-btn ${sidebarOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className="logo" onClick={() => navigate('/admin/dashboard')}>
                <div className="logo-main">standart</div>
                <div className="logo-sub">ADMIN</div>
              </div>
            </div>

            {/* Center - Page title */}
            <div className="header-center">
              <h1 className="page-title">{getPageTitle()}</h1>
            </div>

            {/* Right side - User info */}
            <div className="header-right">
              <div className="user-info">
                <div className="user-avatar">
                  <span>{user?.name?.charAt(0) || 'A'}</span>
                </div>
                <div className="user-details">
                  <div className="user-name">{user?.name || 'Admin'}</div>
                  <div className="user-role">{user?.role || 'Yönetici'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            {/* Navigation */}
            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <div key={item.key} className="menu-item-container">
                  {item.children ? (
                    <div className="dropdown-menu-item">
                      <div
                        className={`menu-item ${isMenuActive(item) ? 'active' : ''}`}
                        onClick={() => handleSubmenuToggle(item.key)}
                      >
                        <span className="menu-icon">{item.icon}</span>
                        <span className="menu-label">{item.label}</span>
                        <span className={`arrow ${activeSubmenu === item.key ? 'rotated' : ''}`}>
                          ▼
                        </span>
                      </div>
                      <div className={`submenu ${activeSubmenu === item.key ? 'open' : ''}`}>
                        {item.children.map((child, index) => (
                          <div
                            key={index}
                            className={`submenu-item ${isActive(child.path) ? 'active' : ''}`}
                            onClick={() => handleSubmenuItemClick(child.path)}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer Actions */}
            <div className="sidebar-footer">
              <div className="menu-item" onClick={handleBackToSite}>
                <span className="menu-icon">🌐</span>
                <span className="menu-label">Siteye Git</span>
              </div>
              <div className="menu-item logout" onClick={handleLogout}>
                <span className="menu-icon">🚪</span>
                <span className="menu-label">Çıkış Yap</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Main Content */}
      <main className="admin-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
