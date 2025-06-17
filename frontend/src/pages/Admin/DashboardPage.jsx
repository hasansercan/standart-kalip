import {
  DollarOutlined,
  EyeOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Progress, Row } from "antd";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data - bu veriler gerçek API'den gelecek
  const statsData = [
    {
      title: "Toplam Ziyaretçi",
      value: "12.847",
      change: "+12.5%",
      trend: "up",
      icon: <EyeOutlined />,
      color: "#8B1538"
    },
    {
      title: "Toplam Satış",
      value: "₺847.250",
      change: "+8.2%",
      trend: "up",
      icon: <DollarOutlined />,
      color: "#059669"
    },
    {
      title: "Yeni Siparişler",
      value: "127",
      change: "-2.1%",
      trend: "down",
      icon: <ShoppingCartOutlined />,
      color: "#DC2626"
    },
    {
      title: "Aktif Müşteriler",
      value: "2.847",
      change: "+15.3%",
      trend: "up",
      icon: <TeamOutlined />,
      color: "#7C3AED"
    }
  ];

  const salesData = [
    { month: "Ocak", sales: 120000, orders: 45, customers: 25 },
    { month: "Şubat", sales: 150000, orders: 52, customers: 32 },
    { month: "Mart", sales: 180000, orders: 48, customers: 28 },
    { month: "Nisan", sales: 220000, orders: 65, customers: 45 },
    { month: "Mayıs", sales: 190000, orders: 58, customers: 38 },
    { month: "Haziran", sales: 280000, orders: 72, customers: 52 },
  ];

  const categoryData = [
    { name: "Kalıp Üretimi", value: 45, color: "#8B1538" },
    { name: "Tasarım Hizmetleri", value: 25, color: "#059669" },
    { name: "Teknik Danışmanlık", value: 20, color: "#7C3AED" },
    { name: "Diğer", value: 10, color: "#DC2626" }
  ];

  const recentOrders = [
    { id: "#12847", customer: "Acme Şirketi", product: "Özel Kalıp", amount: "₺15.000", status: "Tamamlandı" },
    { id: "#12846", customer: "Beta Ltd.", product: "Tasarım Hizmeti", amount: "₺8.500", status: "İşlemde" },
    { id: "#12845", customer: "Gamma A.Ş.", product: "Teknik Danışmanlık", amount: "₺3.200", status: "Bekliyor" },
    { id: "#12844", customer: "Delta Corp", product: "Kalıp Revizyon", amount: "₺12.800", status: "Tamamlandı" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h1>Hoş Geldiniz! 👋</h1>
          <p>Standart Kalıp yönetim paneline hoş geldiniz. İşletmenizin genel durumunu buradan takip edebilirsiniz.</p>
          <div className="welcome-time">
            <span className="current-date">{formatDate(currentTime)}</span>
            <span className="current-time">{formatTime(currentTime)}</span>
          </div>
        </div>
        <div className="welcome-actions">
          <Button type="primary" size="large" className="primary-button">
            <ShoppingOutlined /> Yeni Sipariş
          </Button>
          <Button size="large" className="secondary-button">
            <UserOutlined /> Müşteri Ekle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="stats-row">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stats-card" hoverable>
              <div className="stats-content">
                <div className="stats-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stats-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span className={`stats-change ${stat.trend}`}>
                    <RiseOutlined /> {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row gutter={[24, 24]} className="charts-row">
        <Col xs={24} lg={16}>
          <Card title="Satış Analizi" className="chart-card">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B1538" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B1538" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#8B1538"
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Hizmet Dağılımı" className="chart-card">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders and Performance */}
      <Row gutter={[24, 24]} className="bottom-section">
        <Col xs={24} lg={14}>
          <Card title="Son Siparişler" className="table-card">
            <div className="recent-orders">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <h4>{order.id}</h4>
                    <p>{order.customer}</p>
                    <span className="product-name">{order.product}</span>
                  </div>
                  <div className="order-amount">
                    <strong>{order.amount}</strong>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Button type="link">Tüm Siparişleri Görüntüle →</Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Performans Özeti" className="performance-card">
            <div className="performance-item">
              <div className="performance-info">
                <span>Bu Ay Hedef</span>
                <span className="performance-value">₺500.000</span>
              </div>
              <Progress
                percent={68}
                strokeColor="#8B1538"
                trailColor="#f0f0f0"
                strokeWidth={8}
              />
            </div>

            <div className="performance-item">
              <div className="performance-info">
                <span>Müşteri Memnuniyeti</span>
                <span className="performance-value">94%</span>
              </div>
              <Progress
                percent={94}
                strokeColor="#059669"
                trailColor="#f0f0f0"
                strokeWidth={8}
              />
            </div>

            <div className="performance-item">
              <div className="performance-info">
                <span>Proje Tamamlama</span>
                <span className="performance-value">86%</span>
              </div>
              <Progress
                percent={86}
                strokeColor="#7C3AED"
                trailColor="#f0f0f0"
                strokeWidth={8}
              />
            </div>

            <div className="achievement-badge">
              <TrophyOutlined />
              <span>Bu ay hedefin %68'ine ulaştınız!</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
