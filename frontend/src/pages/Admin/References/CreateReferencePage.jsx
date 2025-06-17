import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Switch, Upload, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateReferencePage = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        if (!imageUrl) {
            message.error("Lütfen bir logo yükleyiniz!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/references`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    logo: imageUrl,
                }),
            });

            if (response.ok) {
                message.success("Referans başarıyla oluşturuldu.");
                navigate("/admin/references");
            } else {
                message.error("Referans oluşturulurken bir hata oluştu.");
            }
        } catch (error) {
            console.log("Referans oluşturma hatası:", error);
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
            console.log("Logo yükleme hatası:", error);
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

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Yeni Referans Ekle</h2>
            <Form
                form={form}
                name="createReference"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    isActive: true,
                    sortOrder: 0,
                }}
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

                <Form.Item label="Logo Yükle">
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Logo Seç</Button>
                    </Upload>
                    {imageUrl && (
                        <div style={{ marginTop: 10 }}>
                            <img
                                src={imageUrl}
                                alt="Preview"
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
                        Referans Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateReferencePage;
