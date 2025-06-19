import {
  AppstoreOutlined,
  ContactsOutlined,
  FileTextOutlined,
  RiseOutlined,
  ShoppingOutlined,
  TeamOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Progress, Row, Spin, message } from "antd";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { buildApiUrl } from "../../config/apiConfig";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    overview: {},
    recent: {},
    monthly: [],
    applicationStatus: {}
  });
  const [weeklyTrends, setWeeklyTrends] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState({
    products: [],
    blogs: []
  });

  // API'den dashboard verilerini çek
  useEffect(() => {
    fetchDashboardData();
    fetchWeeklyTrends();
    fetchCategoryDistribution();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(buildApiUrl('/dashboard/stats'));
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        message.error('Dashboard verileri yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      message.error('Dashboard verileri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyTrends = async () => {
    try {
      const response = await fetch(buildApiUrl('/dashboard/weekly-trends'));
      if (response.ok) {
        const data = await response.json();
        setWeeklyTrends(data);
      }
    } catch (error) {
      console.error('Weekly trends fetch error:', error);
    }
  };

  const fetchCategoryDistribution = async () => {
    try {
      const response = await fetch(buildApiUrl('/dashboard/category-distribution'));
      if (response.ok) {
        const data = await response.json();
        setCategoryDistribution(data);
      }
    } catch (error) {
      console.error('Category distribution fetch error:', error);
    }
  };

  // Dinamik istatistik kartları
  const getStatsData = () => {
    const { overview } = dashboardData;

    return [
      {
        title: "Toplam Ürün",
        value: overview.totalProducts || 0,
        change: "+5.2%",
        trend: "up",
        icon: <AppstoreOutlined />,
        color: "#8B1538"
      },
      {
        title: "Toplam Blog",
        value: overview.totalBlogs || 0,
        change: "+8.1%",
        trend: "up",
        icon: <FileTextOutlined />,
        color: "#059669"
      },
      {
        title: "Aktif İş İlanları",
        value: overview.activeJobs || 0,
        change: "+12.3%",
        trend: "up",
        icon: <TeamOutlined />,
        color: "#DC2626"
      },
      {
        title: "Bekleyen Başvurular",
        value: overview.pendingApplications || 0,
        change: "+15.7%",
        trend: "up",
        icon: <ContactsOutlined />,
        color: "#7C3AED"
      }
    ];
  };

  // Başvuru durumu dağılımı için pie chart verisi
  const getApplicationStatusData = () => {
    const { applicationStatus } = dashboardData;
    const statusColors = {
      pending: "#FFA500",
      reviewing: "#1890FF",
      interview: "#722ED1",
      accepted: "#52C41A",
      rejected: "#FF4D4F"
    };

    const statusLabels = {
      pending: "Bekleyen",
      reviewing: "İnceleniyor",
      interview: "Mülakat",
      accepted: "Kabul",
      rejected: "Red"
    };

    return Object.entries(applicationStatus).map(([status, count]) => ({
      name: statusLabels[status] || status,
      value: count,
      color: statusColors[status] || "#8B1538"
    }));
  };

  // Son aktiviteler listesi
  const getRecentActivities = () => {
    const { recent } = dashboardData;
    const activities = [];

    // Son başvurular
    if (recent.applications) {
      recent.applications.forEach(app => {
        activities.push({
          id: app._id,
          type: 'application',
          title: `${app.firstName} ${app.lastName}`,
          description: `${app.jobTitle} pozisyonuna başvurdu`,
          time: new Date(app.appliedAt).toLocaleDateString('tr-TR'),
          status: app.status
        });
      });
    }

    // Son iletişim mesajları
    if (recent.contacts) {
      recent.contacts.forEach(contact => {
        activities.push({
          id: contact._id,
          type: 'contact',
          title: contact.name,
          description: contact.subject,
          time: new Date(contact.createdAt).toLocaleDateString('tr-TR'),
          status: contact.isRead ? 'read' : 'unread'
        });
      });
    }

    // Son bloglar
    if (recent.blogs) {
      recent.blogs.forEach(blog => {
        activities.push({
          id: blog._id,
          type: 'blog',
          title: blog.title,
          description: 'Yeni blog yazısı yayınlandı',
          time: new Date(blog.createdAt).toLocaleDateString('tr-TR'),
          status: 'published'
        });
      });
    }

    // Tarihe göre sırala ve ilk 10'unu al
    return activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10);
  };

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

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const statsData = getStatsData();
  const applicationStatusData = getApplicationStatusData();
  const recentActivities = getRecentActivities();

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
            <ShoppingOutlined /> Yeni Ürün
          </Button>
          <Button size="large" className="secondary-button">
            <FileTextOutlined /> Blog Ekle
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
          <Card title="Aylık Aktivite Analizi" className="chart-card">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={dashboardData.monthly}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="total"
                  stroke="#8B1538"
                  strokeWidth={3}
                  fill="url(#totalGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Başvuru Durumu Dağılımı" className="chart-card">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Weekly Trends */}
      {weeklyTrends.length > 0 && (
        <Row gutter={[24, 24]} className="trends-row">
          <Col xs={24}>
            <Card title="Haftalık Trend Analizi" className="chart-card">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#8B1538" strokeWidth={2} name="Başvurular" />
                  <Line type="monotone" dataKey="contacts" stroke="#059669" strokeWidth={2} name="İletişim" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recent Activities and Performance */}
      <Row gutter={[24, 24]} className="bottom-section">
        <Col xs={24} lg={14}>
          <Card title="Son Aktiviteler" className="table-card">
            <div className="recent-activities">
              {recentActivities.map((activity) => (
                <div key={`${activity.type}-${activity.id}`} className="activity-item">
                  <div className="activity-info">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className="activity-status">
                    <span className={`status-badge ${activity.status}`}>
                      {activity.status === 'pending' && 'Bekliyor'}
                      {activity.status === 'reviewing' && 'İnceleniyor'}
                      {activity.status === 'interview' && 'Mülakat'}
                      {activity.status === 'accepted' && 'Kabul'}
                      {activity.status === 'rejected' && 'Red'}
                      {activity.status === 'read' && 'Okundu'}
                      {activity.status === 'unread' && 'Okunmadı'}
                      {activity.status === 'published' && 'Yayında'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Button type="link">Tüm Aktiviteleri Görüntüle →</Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Sistem Özeti" className="performance-card">
            <div className="performance-item">
              <div className="performance-info">
                <span>Toplam İş İlanları</span>
                <span className="performance-value">{dashboardData.overview.totalJobs || 0}</span>
              </div>
              <Progress
                percent={Math.min(100, (dashboardData.overview.activeJobs / Math.max(1, dashboardData.overview.totalJobs)) * 100)}
                strokeColor="#8B1538"
                trailColor="#f0f0f0"
                size={8}
              />
            </div>

            <div className="performance-item">
              <div className="performance-info">
                <span>Başvuru Oranı</span>
                <span className="performance-value">{dashboardData.overview.totalJobApplications || 0}</span>
              </div>
              <Progress
                percent={Math.min(100, (dashboardData.overview.totalJobApplications / Math.max(1, dashboardData.overview.totalJobs * 10)) * 100)}
                strokeColor="#059669"
                trailColor="#f0f0f0"
                size={8}
              />
            </div>

            <div className="performance-item">
              <div className="performance-info">
                <span>İletişim Mesajları</span>
                <span className="performance-value">{dashboardData.overview.totalContacts || 0}</span>
              </div>
              <Progress
                percent={Math.min(100, ((dashboardData.overview.totalContacts - dashboardData.overview.unreadContacts) / Math.max(1, dashboardData.overview.totalContacts)) * 100)}
                strokeColor="#7C3AED"
                trailColor="#f0f0f0"
                size={8}
              />
            </div>

            <div className="achievement-badge">
              <TrophyOutlined />
              <span>Sistem başarıyla çalışıyor! 🎉</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
