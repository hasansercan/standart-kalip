import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Switch } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const CreatePagePage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            // JSON formatında content oluştur
            const content = {
                heroTitle: values.heroTitle || values.title,
                heroSubtitle: values.heroSubtitle || "",
                sections: []
            };

            // Eğer özel içerik varsa JSON olarak parse et
            if (values.customContent) {
                try {
                    const parsedContent = JSON.parse(values.customContent);
                    Object.assign(content, parsedContent);
                } catch (error) {
                    message.error("Özel içerik geçerli bir JSON formatında değil!");
                    setLoading(false);
                    return;
                }
            }

            const pageData = {
                title: values.title,
                slug: values.slug,
                content: content,
                metaTitle: values.metaTitle || values.title,
                metaDescription: values.metaDescription || "",
                isActive: values.isActive !== undefined ? values.isActive : true,
                order: values.order || 0
            };

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pageData),
            });

            if (response.ok) {
                message.success("Sayfa başarıyla oluşturuldu!");
                window.location.href = "/admin/pages";
            } else {
                const errorData = await response.json();
                message.error(errorData.error || "Sayfa oluşturulurken bir hata oluştu!");
            }
        } catch (error) {
            console.log("Sayfa oluşturma hatası:", error);
            message.error("Bağlantı hatası!");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title) => {
        if (!title) return "";
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = generateSlug(title);
        form.setFieldsValue({ slug });
    };

    const defaultContentTemplate = `{
  "heroTitle": "Sayfa Başlığı",
  "heroSubtitle": "Sayfa alt başlığı",
  "sections": [
    {
      "type": "intro",
      "title": "Giriş Bölümü",
      "subtitle": "Alt başlık",
      "content": [
        "Bu bölümde sayfa hakkında genel bilgileri yazabilirsiniz.",
        "Birden fazla paragraf ekleyebilirsiniz."
      ]
    },
    {
      "type": "features",
      "title": "Özellikler",
      "items": [
        {
          "icon": "bi-award",
          "title": "Özellik 1",
          "description": "Özellik açıklaması"
        },
        {
          "icon": "bi-lightbulb",
          "title": "Özellik 2",
          "description": "Özellik açıklaması"
        }
      ]
    }
  ]
}`;

    return (
        <div className="admin-panel-content">
            <div className="content-header">
                <Button
                    icon={<LeftOutlined />}
                    onClick={() => window.location.href = '/admin/pages'}
                    style={{ marginRight: 16 }}
                >
                    Geri Dön
                </Button>
                <h1>Yeni Sayfa Oluştur</h1>
            </div>

            <Card>
                <Form
                    form={form}
                    name="createPage"
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        order: 0,
                        customContent: defaultContentTemplate
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Sayfa Başlığı"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen sayfa başlığını girin!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Örn: Hakkımızda"
                                    onChange={handleTitleChange}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Slug (URL)"
                                name="slug"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen sayfa slug'ını girin!",
                                    },
                                ]}
                            >
                                <Input placeholder="Örn: hakkimizda" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Meta Başlık"
                                name="metaTitle"
                            >
                                <Input placeholder="SEO için sayfa başlığı" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Sıra"
                                name="order"
                            >
                                <InputNumber
                                    min={0}
                                    placeholder="Sayfa sırası"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Meta Açıklama"
                        name="metaDescription"
                    >
                        <TextArea
                            rows={3}
                            placeholder="SEO için sayfa açıklaması"
                        />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Hero Başlığı"
                                name="heroTitle"
                            >
                                <Input placeholder="Sayfa üst bölüm başlığı" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Hero Alt Başlığı"
                                name="heroSubtitle"
                            >
                                <Input placeholder="Sayfa üst bölüm alt başlığı" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Özel İçerik (JSON Format)"
                        name="customContent"
                        help="Sayfa içeriğini JSON formatında yazın. Yukarıdaki örnek template'i düzenleyebilirsiniz."
                    >
                        <TextArea
                            rows={20}
                            placeholder="JSON formatında sayfa içeriği"
                            style={{ fontFamily: 'monospace' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Durum"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Switch
                            checkedChildren="Aktif"
                            unCheckedChildren="Pasif"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={<SaveOutlined />}
                            size="large"
                        >
                            Sayfa Oluştur
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreatePagePage;
