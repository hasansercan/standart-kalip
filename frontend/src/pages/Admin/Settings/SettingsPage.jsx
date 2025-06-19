import {
    DatabaseOutlined,
    GlobalOutlined,
    HomeOutlined,
    MailOutlined,
    SecurityScanOutlined,
    SettingOutlined
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const SettingsPage = () => {
    const settingsCards = [
        {
            title: "Ana Sayfa Ayarları",
            description: "Ana sayfa bileşenlerini aktif/pasif yapın ve düzenleyin",
            icon: <HomeOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
            link: "/admin/settings/homepage",
            color: "#1890ff"
        },
        {
            title: "Site Ayarları",
            description: "Site başlığı, açıklama ve genel ayarlar",
            icon: <GlobalOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
            link: "/admin/settings/site",
            color: "#52c41a",
            disabled: true
        },
        {
            title: "E-posta Ayarları",
            description: "SMTP ayarları ve e-posta şablonları",
            icon: <MailOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />,
            link: "/admin/settings/email",
            color: "#fa8c16",
            disabled: true
        },
        {
            title: "Güvenlik Ayarları",
            description: "Kullanıcı rolleri ve güvenlik seçenekleri",
            icon: <SecurityScanOutlined style={{ fontSize: '32px', color: '#f5222d' }} />,
            link: "/admin/settings/security",
            color: "#f5222d",
            disabled: true
        },
        {
            title: "Veritabanı Ayarları",
            description: "Backup ve veritabanı optimizasyonu",
            icon: <DatabaseOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
            link: "/admin/settings/database",
            color: "#722ed1",
            disabled: true
        },
        {
            title: "Genel Ayarlar",
            description: "Sistem geneli ayarlar ve konfigürasyonlar",
            icon: <SettingOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
            link: "/admin/settings/general",
            color: "#13c2c2",
            disabled: true
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1>Sistem Ayarları</h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Sisteminizin ayarlarını yönetin ve konfigüre edin
                </p>
            </div>

            <Row gutter={[24, 24]}>
                {settingsCards.map((card, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        {card.disabled ? (
                            <Card
                                hoverable={false}
                                style={{
                                    height: '200px',
                                    opacity: 0.6,
                                    cursor: 'not-allowed'
                                }}
                                styles={{
                                    body: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        textAlign: 'center'
                                    }
                                }}
                            >
                                <div style={{ marginBottom: '16px' }}>
                                    {card.icon}
                                </div>
                                <h3 style={{ marginBottom: '8px', color: '#999' }}>{card.title}</h3>
                                <p style={{ margin: 0, color: '#999' }}>{card.description}</p>
                                <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
                                    (Yakında Gelecek)
                                </p>
                            </Card>
                        ) : (
                            <Link to={card.link}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '200px',
                                        border: `2px solid ${card.color}20`,
                                        transition: 'all 0.3s ease'
                                    }}
                                    styles={{
                                        body: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            textAlign: 'center'
                                        }
                                    }}
                                >
                                    <div style={{ marginBottom: '16px' }}>
                                        {card.icon}
                                    </div>
                                    <h3 style={{ marginBottom: '8px', color: card.color }}>
                                        {card.title}
                                    </h3>
                                    <p style={{ margin: 0, color: '#666' }}>
                                        {card.description}
                                    </p>
                                </Card>
                            </Link>
                        )}
                    </Col>
                ))}
            </Row>

            {/* İstatistik Kartları */}
            <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                <Col span={24}>
                    <Card title="Sistem Durumu" style={{ textAlign: 'center' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <div>
                                    <h3 style={{ fontSize: '24px', margin: '0', color: '#52c41a' }}>Online</h3>
                                    <p style={{ margin: '0', color: '#666' }}>Sistem Durumu</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <h3 style={{ fontSize: '24px', margin: '0', color: '#1890ff' }}>v1.0.0</h3>
                                    <p style={{ margin: '0', color: '#666' }}>Sistem Versiyonu</p>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div>
                                    <h3 style={{ fontSize: '24px', margin: '0', color: '#fa8c16' }}>2024</h3>
                                    <p style={{ margin: '0', color: '#666' }}>Son Güncelleme</p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SettingsPage;
