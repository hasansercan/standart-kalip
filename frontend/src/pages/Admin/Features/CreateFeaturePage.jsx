import { Button, Form, Input, Switch, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFeaturePage = () => {
    const [loading, setLoading] = useState(false);
    const [iconPreview, setIconPreview] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/features`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Özellik başarıyla oluşturuldu.");
                form.resetFields();
                setIconPreview("");
                navigate("/admin/features");
            } else {
                message.error("Özellik oluşturma başarısız.");
            }
        } catch (error) {
            console.log("Özellik oluşturma hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleIconChange = (e) => {
        setIconPreview(e.target.value);
    };

    return (
        <div className="create-feature-page">
            <h2>Yeni Özellik Oluştur</h2>
            <Form
                form={form}
                name="createFeature"
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Başlık"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen özellik başlığını girin!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Açıklama"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen özellik açıklamasını girin!",
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label={
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span>İkon (FontAwesome Class)</span>
                            {iconPreview && (
                                <i
                                    className={`fa-solid ${iconPreview}`}
                                    style={{ fontSize: "20px", color: "#1890ff" }}
                                ></i>
                            )}
                        </div>
                    }
                    name="icon"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen ikon class'ını girin!",
                        },
                    ]}
                    help="Örnek: fa-award, fa-shipping-fast, fa-headset vb."
                >
                    <Input
                        placeholder="fa-award"
                        onChange={handleIconChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Aktif"
                    name="isActive"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Özellik Oluştur
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate("/admin/features")}
                    >
                        İptal
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateFeaturePage;
