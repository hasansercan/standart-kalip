import { DeleteOutlined, EyeOutlined, MailOutlined, ReloadOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Modal, Popconfirm, Row, Space, Statistic, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const MessagePage = () => {
    const { apiRequest } = useAuth();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ total: 0, unread: 0, pending: 0 });

    const columns = [
        {
            title: "Durum",
            dataIndex: "isRead",
            key: "isRead",
            width: 80,
            render: (isRead) => (
                <Badge status={isRead ? "success" : "error"} text={isRead ? "Okundu" : "Okunmadı"} />
            ),
        },
        {
            title: "Ad Soyad",
            dataIndex: "name",
            key: "name",
            width: 150,
            render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
        },
        {
            title: "E-posta",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Telefon",
            dataIndex: "phone",
            key: "phone",
            width: 130,
            render: (text) => text || "-",
        },
        {
            title: "Konu",
            dataIndex: "subject",
            key: "subject",
            width: 200,
            render: (text) => (
                <div style={{ maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {text}
                </div>
            ),
        },
        {
            title: "Mesaj",
            dataIndex: "message",
            key: "message",
            render: (text) => (
                <div style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {text}
                </div>
            ),
        },
        {
            title: "Durum",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status) => {
                const statusMap = {
                    pending: { color: "orange", text: "Bekliyor" },
                    replied: { color: "green", text: "Yanıtlandı" },
                    closed: { color: "red", text: "Kapatıldı" },
                };
                const statusInfo = statusMap[status] || { color: "default", text: status };
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
        },
        {
            title: "Tarih",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            render: (text) => new Date(text).toLocaleDateString("tr-TR"),
        },
        {
            title: "İşlemler",
            key: "actions",
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handleViewMessage(record)}
                    />
                    {!record.isRead && (
                        <Button
                            icon={<MailOutlined />}
                            size="small"
                            onClick={() => handleMarkAsRead(record._id)}
                        />
                    )}
                    <Popconfirm
                        title="Mesajı silmek istediğinize emin misiniz?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiRequest("/api/contacts");
            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Veriler yüklenirken hata oluştu.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            message.error("Veriler yüklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await apiRequest("/api/contacts/stats/dashboard");
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Stats fetch error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await apiRequest(`/api/contacts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Mesaj başarıyla silindi.");
                fetchData();
                fetchStats();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            message.error("Silme işlemi başarısız.");
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const response = await apiRequest(`/api/contacts/${id}/read`, {
                method: "PATCH",
            });

            if (response.ok) {
                message.success("Mesaj okundu olarak işaretlendi.");
                fetchData();
                fetchStats();
            } else {
                message.error("İşlem başarısız.");
            }
        } catch (error) {
            console.error("Mark as read error:", error);
            message.error("İşlem başarısız.");
        }
    };

    const handleViewMessage = (record) => {
        Modal.info({
            title: `Mesaj Detayları - ${record.name}`,
            width: 600,
            content: (
                <div>
                    <p><strong>Ad Soyad:</strong> {record.name}</p>
                    <p><strong>E-posta:</strong> {record.email}</p>
                    <p><strong>Telefon:</strong> {record.phone || "-"}</p>
                    <p><strong>Konu:</strong> {record.subject}</p>
                    <p><strong>Tarih:</strong> {new Date(record.createdAt).toLocaleString("tr-TR")}</p>
                    <div style={{ marginTop: 20 }}>
                        <strong>Mesaj:</strong>
                        <div style={{
                            marginTop: 10,
                            padding: 15,
                            background: "#f5f5f5",
                            borderRadius: 5,
                            whiteSpace: "pre-wrap"
                        }}>
                            {record.message}
                        </div>
                    </div>
                </div>
            ),
            onOk: () => {
                if (!record.isRead) {
                    handleMarkAsRead(record._id);
                }
            },
        });
    };

    useEffect(() => {
        fetchData();
        fetchStats();
    }, []);

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Mesaj" value={stats.total} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Okunmamış Mesaj"
                            value={stats.unread}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Bekleyen Mesaj"
                            value={stats.pending}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={() => { fetchData(); fetchStats(); }}
                    loading={loading}
                >
                    Yenile
                </Button>
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} / ${total} mesaj`,
                }}
                scroll={{ x: true }}
                rowClassName={(record) => (!record.isRead ? "unread-row" : "")}
            />

            <style>{`
        .unread-row {
          background-color: #fff7e6 !important;
        }
        .unread-row:hover {
          background-color: #ffe7ba !important;
        }
      `}</style>
        </div>
    );
};

export default MessagePage;
