import { Button, Image, Popconfirm, Space, Switch, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SliderPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const columns = [
        {
            title: "Sıra",
            dataIndex: "order",
            key: "order",
            sorter: (a, b) => a.order - b.order,
            width: 80,
        },
        {
            title: "Görsel",
            dataIndex: "image",
            key: "image",
            render: (imageSrc) => (
                <Image src={imageSrc} alt="Slider" width={100} height={60} style={{ objectFit: 'cover' }} />
            ),
            width: 120,
        },
        {
            title: "Başlık",
            dataIndex: "title",
            key: "title",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Alt Başlık",
            dataIndex: "subtitle",
            key: "subtitle",
            render: (text) => <span>{text || "—"}</span>,
        },
        {
            title: "Açıklama",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <span style={{ maxWidth: 200, display: 'block' }}>
                    {text ? text.substring(0, 100) + "..." : "—"}
                </span>
            ),
        },
        {
            title: "Buton Metni",
            dataIndex: "buttonText",
            key: "buttonText",
            render: (text) => <span>{text || "—"}</span>,
        },
        {
            title: "Aktif",
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
            width: 100,
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
                        onClick={() => navigate(`/admin/sliders/update/${record._id}`)}
                    >
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Slider'ı Sil"
                        description="Bu slider'ı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteSlider(record._id)}
                    >
                        <Button type="primary" danger size="small">
                            Sil
                        </Button>
                    </Popconfirm>
                </Space>
            ),
            width: 150,
        },
    ];

    const handleStatusChange = async (sliderId, isActive) => {
        try {
            const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive }),
            });

            if (response.ok) {
                message.success("Slider durumu güncellendi.");
                setDataSource((prevSliders) =>
                    prevSliders.map((slider) =>
                        slider._id === sliderId ? { ...slider, isActive } : slider
                    )
                );
            } else {
                message.error("Durum güncelleme başarısız.");
            }
        } catch (error) {
            message.error("Durum güncelleme başarısız.");
        }
    };

    const deleteSlider = async (sliderId) => {
        try {
            const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Slider başarıyla silindi.");
                setDataSource((prevSliders) => {
                    return prevSliders.filter((slider) => slider._id !== sliderId);
                });
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            message.error("Silme işlemi başarısız.");
        }
    };

    useEffect(() => {
        const fetchSliders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/sliders`);

                if (!response.ok) {
                    message.error("Slider verisi getirme başarısız.");
                    return;
                }

                const slidersData = await response.json();
                setDataSource(slidersData);
            } catch (error) {
                message.error("Slider verisi getirme başarısız.");
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, [apiUrl]);

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={() => navigate("/admin/sliders/create")}
                    size="large"
                >
                    Yeni Slider Ekle
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
                scroll={{ x: 1000 }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} slider`,
                }}
            />
        </div>
    );
};

export default SliderPage;
