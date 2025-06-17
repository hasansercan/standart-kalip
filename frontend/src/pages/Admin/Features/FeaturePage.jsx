import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturePage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const columns = [
        {
            title: "İkon",
            dataIndex: "icon",
            key: "icon",
            render: (icon) => (
                <i className={`fa-solid ${icon}`} style={{ fontSize: "24px", color: "#1890ff" }}></i>
            ),
        },
        {
            title: "Başlık",
            dataIndex: "title",
            key: "title",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Açıklama",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <span style={{ maxWidth: "300px", display: "inline-block" }}>
                    {text.length > 100 ? `${text.substring(0, 100)}...` : text}
                </span>
            ),
        },
        {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive) => (
                <Tag color={isActive ? "green" : "red"}>
                    {isActive ? "Aktif" : "Pasif"}
                </Tag>
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/admin/features/update/${record._id}`)}
                    >
                        Güncelle
                    </Button>
                    <Popconfirm
                        title="Özelliği Sil"
                        description="Özelliği silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteFeature(record._id)}
                    >
                        <Button type="primary" danger>
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchFeatures = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/features`);

            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("Veri getirme başarısız.");
            }
        } catch (error) {
            } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteFeature = async (featureId) => {
        try {
            const response = await fetch(`${apiUrl}/api/features/${featureId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Özellik başarıyla silindi.");
                fetchFeatures();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            }
    };

    useEffect(() => {
        fetchFeatures();
    }, [fetchFeatures]);

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />
    );
};

export default FeaturePage;
