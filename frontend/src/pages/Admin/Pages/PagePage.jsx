import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Popconfirm, Space, Switch, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";

const PagePage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewContent, setPreviewContent] = useState(null);

    const columns = [
        {
            title: "Başlık",
            dataIndex: "title",
            key: "title",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
            render: (text) => <code>{text}</code>,
        },
        {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={(checked) => handleStatusChange(record._id, checked)}
                    checkedChildren="Aktif"
                    unCheckedChildren="Pasif"
                />
            ),
        },
        {
            title: "Sıra",
            dataIndex: "order",
            key: "order",
            sorter: (a, b) => a.order - b.order,
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Oluşturma Tarihi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleDateString("tr-TR"),
        },
        {
            title: "İşlemler",
            key: "actions",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(record)}
                        size="small"
                    >
                        Önizle
                    </Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => window.location.href = `/admin/pages/update/${record._id}`}
                        size="small"
                    >
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Sayfayı Sil"
                        description="Bu sayfayı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                        >
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchPages = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/admin/all`);
            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            }
        } catch (error) {
            console.log("Sayfa verileri getirme hatası:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (pageId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/${pageId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Sayfa başarıyla silindi!");
                fetchPages();
            } else {
                message.error("Sayfa silinirken bir hata oluştu!");
            }
        } catch (error) {
            console.log("Sayfa silme hatası:", error);
            message.error("Bağlantı hatası!");
        }
    };

    const handleStatusChange = async (pageId, isActive) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/admin/${pageId}`);
            if (response.ok) {
                const pageData = await response.json();

                const updateResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/${pageId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...pageData,
                        isActive
                    }),
                });

                if (updateResponse.ok) {
                    message.success(`Sayfa durumu ${isActive ? 'aktif' : 'pasif'} olarak güncellendi!`);
                    fetchPages();
                } else {
                    message.error("Sayfa durumu güncellenirken bir hata oluştu!");
                }
            }
        } catch (error) {
            console.log("Sayfa durumu güncelleme hatası:", error);
            message.error("Bağlantı hatası!");
        }
    };

    const handlePreview = (record) => {
        setPreviewContent(record);
        setPreviewVisible(true);
    };

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    return (
        <div className="admin-panel-content">
            <div className="content-header">
                <h1>Sayfa Yönetimi</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => window.location.href = '/admin/pages/create'}
                >
                    Yeni Sayfa Ekle
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey="_id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} / ${total} sayfa`,
                }}
            />

            <Modal
                title={previewContent?.title}
                open={previewVisible}
                onCancel={() => setPreviewVisible(false)}
                footer={null}
                width={800}
            >
                {previewContent && (
                    <div>
                        <p><strong>Slug:</strong> {previewContent.slug}</p>
                        <p><strong>Meta Başlık:</strong> {previewContent.metaTitle}</p>
                        <p><strong>Meta Açıklama:</strong> {previewContent.metaDescription}</p>
                        <p><strong>Durum:</strong> {previewContent.isActive ? 'Aktif' : 'Pasif'}</p>
                        <p><strong>Sıra:</strong> {previewContent.order}</p>
                        <div>
                            <strong>İçerik Özeti:</strong>
                            <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
                                {JSON.stringify(previewContent.content, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PagePage;
