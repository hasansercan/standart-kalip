import {
  AppstoreOutlined,
  BookOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LaptopOutlined,
  LogoutOutlined,
  MenuOutlined,
  PictureOutlined,
  RollbackOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getUserRole();
  const userInfo = getUserInfo();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin/dashboard",
      roles: ["admin", "moderator"],
    },
    {
      key: "categories",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      roles: ["admin"],
      children: [
        {
          key: "categories-list",
          label: "Kategori Listesi",
          path: "/admin/categories",
        },
        {
          key: "categories-create",
          label: "Yeni Kategori",
          path: "/admin/categories/create",
        },
      ],
    },
    {
      key: "blogs",
      icon: <BookOutlined />,
      label: "Blog Yazıları",
      roles: ["admin", "moderator"],
      children: [
        {
          key: "blogs-list",
          label: "Blog Listesi",
          path: "/admin/blogs",
        },
        {
          key: "blogs-create",
          label: "Yeni Blog",
          path: "/admin/blogs/create",
        },
      ],
    },
    {
      key: "features",
      icon: <StarOutlined />,
      label: "Özellikler",
      roles: ["admin"],
      children: [
        {
          key: "features-list",
          label: "Özellik Listesi",
          path: "/admin/features",
        },
        {
          key: "features-create",
          label: "Yeni Özellik",
          path: "/admin/features/create",
        },
      ],
    },
    {
      key: "sliders",
      icon: <PictureOutlined />,
      label: "Sliderlar",
      roles: ["admin"],
      children: [
        {
          key: "sliders-list",
          label: "Slider Listesi",
          path: "/admin/sliders",
        },
        {
          key: "sliders-create",
          label: "Yeni Slider",
          path: "/admin/sliders/create",
        },
      ],
    },
    {
      key: "products",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      roles: ["admin"],
      children: [
        {
          key: "products-list",
          label: "Ürün Listesi",
          path: "/admin/products",
        },
        {
          key: "products-create",
          label: "Yeni Ürün",
          path: "/admin/products/create",
        },
      ],
    },
    {
      key: "programs",
      icon: <LaptopOutlined />,
      label: "Program Bilgileri",
      roles: ["admin"],
      children: [
        {
          key: "programs-list",
          label: "Program Listesi",
          path: "/admin/programs",
        },
        {
          key: "programs-create",
          label: "Yeni Program",
          path: "/admin/programs/create",
        },
      ],
    },
    {
      key: "references",
      icon: <TeamOutlined />,
      label: "Referanslar",
      roles: ["admin"],
      children: [
        {
          key: "references-list",
          label: "Referans Listesi",
          path: "/admin/references",
        },
        {
          key: "references-create",
          label: "Yeni Referans",
          path: "/admin/references/create",
        },
      ],
    },
    {
      key: "pages",
      icon: <FileTextOutlined />,
      label: "Sayfalar",
      roles: ["admin"],
      children: [
        {
          key: "pages-list",
          label: "Sayfa Listesi",
          path: "/admin/pages",
        },
        {
          key: "pages-create",
          label: "Yeni Sayfa",
          path: "/admin/pages/create",
        },
      ],
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Kullanıcılar",
      roles: ["admin"],
      children: [
        {
          key: "users-list",
          label: "Kullanıcı Listesi",
          path: "/admin/users",
        },
        {
          key: "users-create",
          label: "Yeni Kullanıcı",
          path: "/admin/users/create",
        },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/admin/orders",
      roles: ["admin"],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Ayarlar",
      roles: ["admin"],
      children: [
        {
          key: "settings-homepage",
          label: "Anasayfa Ayarları",
          path: "/admin/settings/homepage",
        },
      ],
    },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    !item.roles || item.roles.includes(userRole)
  );

  const getActiveKey = () => {
    const currentPath = location.pathname;
    for (const item of filteredMenuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === currentPath) {
            return child.key;
          }
        }
      } else {
        if (item.path === currentPath) {
          return item.key;
        }
      }
    }
    return "dashboard";
  };

  const getPageTitle = () => {
    const currentPath = location.pathname;
    for (const item of filteredMenuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === currentPath) {
            return child.label;
          }
        }
      } else {
        if (item.path === currentPath) {
          return item.label;
        }
      }
    }
    return "Dashboard";
  };

  const handleMenuClick = (path) => {
    navigate(path);
    // Mobile'da menu'ye tıkladıktan sonra sidebar'ı kapat
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  const handleSubmenuToggle = (key) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin");
  };

  const handleBackToSite = () => {
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    // Active submenu'yu otomatik aç
    const currentPath = location.pathname;
    for (const item of filteredMenuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === currentPath) {
            setActiveSubmenu(item.key);
            break;
          }
        }
      }
    }
  }, [location.pathname]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (userRole !== "admin") {
    return (window.location.href = "/");
  }

  return (
    <div className="custom-admin-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="sidebar-overlay active" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="admin-logo-container">
          <div className="admin-logo">
            <span className="logo-main">standart</span>
            <span className="logo-sub">KALIP</span>
          </div>
          <div className="admin-subtitle">YÖNETİM PANELİ</div>
        </div>

        {/* Menu */}
        <nav className="admin-nav">
          {filteredMenuItems.map((item) => (
            <div key={item.key} className="menu-item-container">
              {item.children ? (
                <div>
                  <div
                    className={`menu-item has-children ${activeSubmenu === item.key ? 'active' : ''}`}
                    onClick={() => handleSubmenuToggle(item.key)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="submenu-arrow">
                      <i className={`arrow ${activeSubmenu === item.key ? 'rotated' : ''}`}>▼</i>
                    </span>
                  </div>
                  <div className={`submenu ${activeSubmenu === item.key ? 'open' : ''}`}>
                    {item.children.map((child) => (
                      <div
                        key={child.key}
                        className={`submenu-item ${getActiveKey() === child.key ? 'active' : ''}`}
                        onClick={() => handleMenuClick(child.path)}
                      >
                        <span className="submenu-label">{child.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`menu-item ${getActiveKey() === item.key ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="admin-sidebar-footer">
          <div className="menu-item" onClick={handleBackToSite}>
            <span className="menu-icon"><RollbackOutlined /></span>
            <span className="menu-label">Ana Siteye Dön</span>
          </div>
          <div className="menu-item logout" onClick={handleLogout}>
            <span className="menu-icon"><LogoutOutlined /></span>
            <span className="menu-label">Çıkış Yap</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              <MenuOutlined />
            </button>
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>

          <div className="admin-header-right">
            <div className="admin-user-info">
              <div className="user-avatar">
                <img src={userInfo?.avatar} alt="Admin" />
              </div>
              <div className="user-details">
                <span className="user-name">{userInfo?.username}</span>
                <span className="user-role">Yönetici</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;
