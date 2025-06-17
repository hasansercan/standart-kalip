import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Spin, Switch } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const UpdatePagePage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [form] = Form.useForm();
    const { id } = useParams();

    useEffect(() => {
        fetchPageData();
    }, [id]);

    const fetchPageData = async () => {
        setDataLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/admin/${id}`);
            if (response.ok) {
                const data = await response.json();

                // Form alanlarını doldur
                form.setFieldsValue({
                    title: data.title,
                    slug: data.slug,
                    metaTitle: data.metaTitle,
                    metaDescription: data.metaDescription,
                    heroTitle: data.content?.heroTitle,
                    heroSubtitle: data.content?.heroSubtitle,
                    customContent: JSON.stringify(data.content, null, 2),
                    isActive: data.isActive,
                    order: data.order
                });
            } else {
                message.error("Sayfa verileri alınırken hata oluştu!");
            }
        } catch (error) {
            console.log("Sayfa verileri alma hatası:", error);
            message.error("Bağlantı hatası!");
        } finally {
            setDataLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            // JSON formatında content oluştur
            let content = {
                heroTitle: values.heroTitle || values.title,
                heroSubtitle: values.heroSubtitle || "",
                sections: []
            };

            // Eğer özel içerik varsa JSON olarak parse et
            if (values.customContent) {
                try {
                    const parsedContent = JSON.parse(values.customContent);
                    content = parsedContent;
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

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pageData),
            });

            if (response.ok) {
                message.success("Sayfa başarıyla güncellendi!");
                window.location.href = "/admin/pages";
            } else {
                const errorData = await response.json();
                message.error(errorData.error || "Sayfa güncellenirken bir hata oluştu!");
            }
        } catch (error) {
            console.log("Sayfa güncelleme hatası:", error);
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

    if (dataLoading) {
        return (
            <div className="admin-panel-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" />
            </div>
        );
    }

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
                <h1>Sayfa Düzenle</h1>
            </div>

            <Card>
                <Form
                    form={form}
                    name="updatePage"
                    onFinish={handleSubmit}
                    layout="vertical"
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
                        help="Sayfa içeriğini JSON formatında düzenleyin."
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
                            Sayfayı Güncelle
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UpdatePagePage;
