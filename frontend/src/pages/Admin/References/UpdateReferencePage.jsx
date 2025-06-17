import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Spin, Switch, Upload, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;

const UpdateReferencePage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const { referenceId } = useParams();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchReference = useCallback(async () => {
        setDataLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/references/${referenceId}`);

            if (response.ok) {
                const data = await response.json();

                // Form alanlarını doldur
                form.setFieldsValue({
                    name: data.name,
                    sector: data.sector,
                    description: data.description,
                    website: data.website,
                    sortOrder: data.sortOrder,
                    isActive: data.isActive,
                });

                // Mevcut logo'yu ayarla
                setImageUrl(data.logo);
            } else {
                message.error("Referans bilgileri alınamadı.");
            }
        } catch (error) {
            } finally {
            setDataLoading(false);
        }
    }, [apiUrl, referenceId, form]);

    const onFinish = async (values) => {
        if (!imageUrl) {
            message.error("Lütfen bir logo yükleyiniz!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/references/${referenceId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    logo: imageUrl,
                }),
            });

            if (response.ok) {
                message.success("Referans başarıyla güncellendi.");
                navigate("/admin/references");
            } else {
                message.error("Referans güncellenirken bir hata oluştu.");
            }
        } catch (error) {
            } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`${apiUrl}/api/references/upload`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setImageUrl(data.imagePath);
                message.success("Logo başarıyla yüklendi.");
            } else {
                message.error("Logo yükleme başarısız.");
            }
        } catch (error) {
            message.error("Logo yükleme başarısız.");
        }

        return false; // Otomatik upload'u engelle
    };

    const uploadProps = {
        name: "image",
        multiple: false,
        accept: "image/*",
        beforeUpload: handleImageUpload,
        showUploadList: false,
    };

    useEffect(() => {
        fetchReference();
    }, [fetchReference]);

    if (dataLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Referans Güncelle</h2>
            <Form
                form={form}
                name="updateReference"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Firma Adı"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen firma adını giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: Arıkan Metal" />
                </Form.Item>

                <Form.Item
                    label="Sektör"
                    name="sector"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen sektörü giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: Otomotiv, Plastik, Metal..." />
                </Form.Item>

                <Form.Item
                    label="Açıklama"
                    name="description"
                >
                    <TextArea
                        rows={3}
                        placeholder="Referans firma hakkında kısa açıklama..."
                    />
                </Form.Item>

                <Form.Item
                    label="Website"
                    name="website"
                >
                    <Input placeholder="https://www.example.com" />
                </Form.Item>

                <Form.Item
                    label="Sıra Numarası"
                    name="sortOrder"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen sıra numarasını giriniz!",
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Görüntülenme sırası (0, 1, 2...)"
                    />
                </Form.Item>

                <Form.Item label="Logo">
                    {imageUrl && (
                        <div style={{ marginBottom: 10 }}>
                            <img
                                src={imageUrl}
                                alt="Mevcut Logo"
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "contain",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: 6,
                                    padding: 8
                                }}
                            />
                        </div>
                    )}
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>
                            {imageUrl ? "Logo Değiştir" : "Logo Seç"}
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Aktif Durumu"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Aktif" unCheckedChildren="Pasif" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Referans Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateReferencePage;
