import { Button, Image, message, Popconfirm, Space, Switch, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReferencePage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (logo, record) => (
                <Image
                    width={60}
                    height={60}
                    src={logo}
                    alt={record.name}
                    style={{ objectFit: "contain" }}
                    fallback="/img/brands/brand1.png"
                />
            ),
        },
        {
            title: "Firma Adı",
            dataIndex: "name",
            key: "name",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Sektör",
            dataIndex: "sector",
            key: "sector",
            render: (text) => (
                <span style={{
                    background: "#f0f9ff",
                    color: "#0369a1",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px"
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Website",
            dataIndex: "website",
            key: "website",
            render: (website) => (
                website ? (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        {website.length > 30 ? `${website.substring(0, 30)}...` : website}
                    </a>
                ) : "-"
            ),
        },
        {
            title: "Sıra",
            dataIndex: "sortOrder",
            key: "sortOrder",
            sorter: (a, b) => a.sortOrder - b.sortOrder,
        },
        {
            title: "Aktif",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => toggleReferenceStatus(record._id, !isActive)}
                    checkedChildren="Aktif"
                    unCheckedChildren="Pasif"
                />
            ),
        },
        {
            title: "İşlemler",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/admin/references/update/${record._id}`)}
                    >
                        Güncelle
                    </Button>
                    <Popconfirm
                        title="Referansı Sil"
                        description="Referansı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteReference(record._id)}
                    >
                        <Button type="primary" danger>
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchReferences = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/references`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Veri getirme başarısız.");
            }
        } catch (error) {
            console.log("Veri hatası:", error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteReference = async (referenceId) => {
        try {
            const response = await fetch(`${apiUrl}/api/references/${referenceId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Referans başarıyla silindi.");
                fetchReferences();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.log("Silme hatası:", error);
        }
    };

    const toggleReferenceStatus = async (referenceId, newStatus) => {
        try {
            const response = await fetch(`${apiUrl}/api/references/${referenceId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: newStatus }),
            });

            if (response.ok) {
                message.success("Referans durumu güncellendi.");
                fetchReferences();
            } else {
                message.error("Durum güncelleme başarısız.");
            }
        } catch (error) {
            console.log("Durum güncelleme hatası:", error);
        }
    };

    useEffect(() => {
        fetchReferences();
    }, [fetchReferences]);

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 800 }}
        />
    );
};

export default ReferencePage;
