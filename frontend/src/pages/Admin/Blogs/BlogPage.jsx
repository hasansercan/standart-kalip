import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const columns = [
        {
            title: "Resim",
            dataIndex: "featuredImage",
            key: "featuredImage",
            render: (imgSrc) => <img src={imgSrc} alt="Blog" width={100} height={60} style={{ objectFit: 'cover', borderRadius: '4px' }} />,
        },
        {
            title: "Başlık",
            dataIndex: "title",
            key: "title",
            render: (text) => <b style={{ maxWidth: '200px', display: 'inline-block' }}>{text}</b>,
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
            render: (slug) => (
                <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                    {slug}
                </code>
            ),
        },
        {
            title: "Kategori",
            dataIndex: "category",
            key: "category",
            render: (category) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "Yazar",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Durum",
            dataIndex: "isPublished",
            key: "isPublished",
            render: (isPublished) => (
                <Tag color={isPublished ? "green" : "orange"}>
                    {isPublished ? "Yayında" : "Taslak"}
                </Tag>
            ),
        },
        {
            title: "Görüntüleme",
            dataIndex: "views",
            key: "views",
            render: (views) => <span>{views || 0}</span>,
        },
        {
            title: "Tarih",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleDateString('tr-TR'),
        },
        {
            title: "İşlemler",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate(`/admin/blogs/update/${record._id}`)}
                    >
                        Düzenle
                    </Button>
                    <Button
                        type="default"
                        size="small"
                        onClick={() => window.open(`/blog/${record.slug}`, '_blank')}
                    >
                        Görüntüle
                    </Button>
                    <Popconfirm
                        title="Blog Yazısını Sil"
                        description="Bu blog yazısını silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteBlog(record._id)}
                    >
                        <Button type="primary" danger size="small">
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchBlogs = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/blogs`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Veri getirme başarısız.");
            }
        } catch (error) {
            message.error("Veri getirme sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteBlog = async (blogId) => {
        try {
            const response = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Blog yazısı başarıyla silindi.");
                fetchBlogs();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            message.error("Silme işlemi sırasında hata oluştu.");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <h2>Blog Yazıları</h2>
                <Button
                    type="primary"
                    onClick={() => navigate('/admin/blogs/create')}
                >
                    Yeni Blog Ekle
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
                scroll={{ x: 1200 }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} blog`,
                }}
            />
        </div>
    );
};

export default BlogPage;
