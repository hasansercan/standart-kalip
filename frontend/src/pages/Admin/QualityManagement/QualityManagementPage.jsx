import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, message, Modal, Popconfirm, Row, Space, Switch, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../../../config/apiConfig";

const QualityManagementPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [stats, setStats] = useState({
        totalCategories: 0,
        activeCategories: 0,
        inactiveCategories: 0
    });

    useEffect(() => {
        fetchCategories();
        fetchStats();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(buildApiUrl('/quality-management/admin'));
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                message.error('Kategoriler yüklenirken hata oluştu');
            }
        } catch (error) {
            console.error('Categories fetch error:', error);
            message.error('Kategoriler yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(buildApiUrl('/quality-management/stats/dashboard'));
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Stats fetch error:', error);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await fetch(buildApiUrl(`/quality-management/${id}/toggle`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                message.success(`Kategori ${!currentStatus ? 'aktif' : 'pasif'} hale getirildi`);
                fetchCategories();
                fetchStats();
            } else {
                message.error('Durum değiştirilirken hata oluştu');
            }
        } catch (error) {
            console.error('Toggle status error:', error);
            message.error('Durum değiştirilirken hata oluştu');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(buildApiUrl(`/quality-management/${id}`), {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Kategori başarıyla silindi');
                fetchCategories();
                fetchStats();
            } else {
                message.error('Kategori silinirken hata oluştu');
            }
        } catch (error) {
            console.error('Delete error:', error);
            message.error('Kategori silinirken hata oluştu');
        }
    };

    const handlePreview = (category) => {
        setSelectedCategory(category);
        setPreviewVisible(true);
    };

    const columns = [
        {
            title: 'Sıra',
            dataIndex: 'order',
            key: 'order',
            width: 80,
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: 'Kategori Adı',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={`bi ${record.icon}`} style={{ color: record.color, fontSize: '16px' }}></i>
                    {text}
                </div>
            ),
        },
        {
            title: 'İçerik',
            dataIndex: ['content', 'title'],
            key: 'content',
            ellipsis: true,
        },
        {
            title: 'Durum',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 120,
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => handleToggleStatus(record._id, isActive)}
                    checkedChildren="Aktif"
                    unCheckedChildren="Pasif"
                />
            ),
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => new Date(date).toLocaleDateString('tr-TR'),
        },
        {
            title: 'İşlemler',
            key: 'actions',
            width: 200,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(record)}
                    >
                        Önizle
                    </Button>
                    <Link to={`/admin/quality-management/update/${record._id}`}>
                        <Button type="default" size="small" icon={<EditOutlined />}>
                            Düzenle
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Bu kategoriyi silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button type="primary" danger size="small" icon={<DeleteOutlined />}>
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Kalite Yönetimi</h1>
                <Link to="/admin/quality-management/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Yeni Kategori Ekle
                    </Button>
                </Link>
            </div>

            {/* İstatistikler */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '24px', margin: '0' }}>{stats.totalCategories}</h3>
                            <p style={{ margin: '0', color: '#666' }}>Toplam Kategori</p>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '24px', margin: '0', color: '#52c41a' }}>{stats.activeCategories}</h3>
                            <p style={{ margin: '0', color: '#666' }}>Aktif Kategori</p>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '24px', margin: '0', color: '#ff4d4f' }}>{stats.inactiveCategories}</h3>
                            <p style={{ margin: '0', color: '#666' }}>Pasif Kategori</p>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Kategoriler Tablosu */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            {/* Önizleme Modal */}
            <Modal
                title="Kategori Önizleme"
                open={previewVisible}
                onCancel={() => setPreviewVisible(false)}
                footer={null}
                width={800}
            >
                {selectedCategory && (
                    <div>
                        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className={`bi ${selectedCategory.icon}`} style={{
                                color: selectedCategory.color,
                                fontSize: '20px'
                            }}></i>
                            <h2 style={{ margin: 0 }}>{selectedCategory.content.title}</h2>
                            <Tag color={selectedCategory.isActive ? 'green' : 'red'}>
                                {selectedCategory.isActive ? 'Aktif' : 'Pasif'}
                            </Tag>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <h4>Açıklama:</h4>
                            <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                                {selectedCategory.content.description}
                            </p>
                        </div>

                        <div>
                            <h4>Özellikler:</h4>
                            <ul>
                                {selectedCategory.content.points.map((point, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {selectedCategory.metadata && (
                            <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
                                <h4>Meta Bilgiler:</h4>
                                <p><strong>Başlık:</strong> {selectedCategory.metadata.metaTitle}</p>
                                <p><strong>Açıklama:</strong> {selectedCategory.metadata.metaDescription}</p>
                                {selectedCategory.metadata.keywords && (
                                    <p><strong>Anahtar Kelimeler:</strong> {selectedCategory.metadata.keywords.join(', ')}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default QualityManagementPage;
