import { Button, Card, Form, message, Space, Spin, Switch, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";

const { Title, Text } = Typography;

const HomepageSettingsPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({});

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // Default component configurations
    const componentSettings = [
        {
            key: "homepage_sliders_enabled",
            label: "Slider Bölümü",
            description: "Ana sayfada slider bölümünü görüntüle"
        },
        {
            key: "homepage_categories_enabled",
            label: "Kategoriler Bölümü",
            description: "Ana sayfada kategoriler bölümünü görüntüle"
        },
        {
            key: "homepage_about_enabled",
            label: "Hakkımızda Bölümü",
            description: "Ana sayfada hakkımızda bölümünü görüntüle"
        },
        {
            key: "homepage_blogs_enabled",
            label: "Blog Bölümü",
            description: "Ana sayfada blog yazıları bölümünü görüntüle"
        },
        {
            key: "homepage_program_download_enabled",
            label: "Program İndirme Bölümü",
            description: "Ana sayfada program indirme bölümünü görüntüle"
        },
        {
            key: "homepage_references_enabled",
            label: "Referanslar Bölümü",
            description: "Ana sayfada referanslar bölümünü görüntüle"
        }
    ];

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/settings`);

            if (response.ok) {
                const data = await response.json();
                const settingsObj = {};

                data.forEach(setting => {
                    settingsObj[setting.settingKey] = setting.settingValue;
                });

                setSettings(settingsObj);
                form.setFieldsValue(settingsObj);
            } else {
                message.error("Ayarlar yüklenirken hata oluştu");
            }
        } catch (error) {
            console.error("Settings fetch error:", error);
            message.error("Ayarlar yüklenirken hata oluştu");
        } finally {
            setLoading(false);
        }
    }, [apiUrl, form]);

    const handleSubmit = async (values) => {
        setSaving(true);
        try {
            // Her ayarı ayrı ayrı güncelle
            const updatePromises = componentSettings.map(async (component) => {
                const settingValue = values[component.key] !== undefined ? values[component.key] : true;

                const response = await fetch(`${apiUrl}/api/settings`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        settingKey: component.key,
                        settingValue: settingValue,
                        description: component.description
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${component.label} ayarı güncellenirken hata oluştu`);
                }

                return response.json();
            });

            await Promise.all(updatePromises);

            setSettings(values);
            message.success("Ayarlar başarıyla güncellendi!");

        } catch (error) {
            console.error("Settings update error:", error);
            message.error(error.message || "Ayarlar güncellenirken hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Anasayfa Ayarları</Title>
            <Text type="secondary">
                Ana sayfada hangi bölümlerin görüntüleneceğini kontrol edebilirsiniz.
            </Text>

            <Card style={{ marginTop: '24px' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={settings}
                >
                    <div style={{ marginBottom: '24px' }}>
                        <Title level={4}>Bölüm Görünürlük Ayarları</Title>
                        <Text type="secondary">
                            Aşağıdaki bölümleri ana sayfada göstermek veya gizlemek için switch'leri kullanın.
                        </Text>
                    </div>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        {componentSettings.map((component) => (
                            <Card key={component.key} size="small" style={{ backgroundColor: '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <Text strong>{component.label}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            {component.description}
                                        </Text>
                                    </div>
                                    <Form.Item
                                        name={component.key}
                                        valuePropName="checked"
                                        style={{ margin: 0 }}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </div>
                            </Card>
                        ))}
                    </Space>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={saving}
                        >
                            {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default HomepageSettingsPage;
