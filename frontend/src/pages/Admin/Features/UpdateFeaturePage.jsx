import { Button, Form, Input, Spin, Switch, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFeaturePage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [iconPreview, setIconPreview] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id: featureId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchSingleFeature = useCallback(async () => {
        setDataLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/features/${featureId}`);

            if (response.ok) {
                const data = await response.json();
                form.setFieldsValue(data);
                setIconPreview(data.icon);
            } else {
                message.error("Veri getirme başarısız.");
            }
        } catch (error) {
            } finally {
            setDataLoading(false);
        }
    }, [apiUrl, featureId, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/features/${featureId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Özellik başarıyla güncellendi.");
                navigate("/admin/features");
            } else {
                message.error("Özellik güncelleme başarısız.");
            }
        } catch (error) {
            } finally {
            setLoading(false);
        }
    };

    const handleIconChange = (e) => {
        setIconPreview(e.target.value);
    };

    useEffect(() => {
        fetchSingleFeature();
    }, [fetchSingleFeature]);

    if (dataLoading) {
        return <Spin size="large" />;
    }

    return (
        <div className="update-feature-page">
            <h2>Özellik Güncelle</h2>
            <Form
                form={form}
                name="updateFeature"
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
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Özellik Güncelle
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

export default UpdateFeaturePage;
