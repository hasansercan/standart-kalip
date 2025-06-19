import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../../config/apiConfig";

const { TextArea } = Input;
const { Option } = Select;

const CreateQualityManagementPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState(['']);

    // Bootstrap ikonları listesi
    const iconOptions = [
        { value: 'bi-award', label: '🏆 Ödül' },
        { value: 'bi-certificate', label: '📜 Sertifika' },
        { value: 'bi-gear', label: '⚙️ Ekipman' },
        { value: 'bi-list-check', label: '✅ Liste' },
        { value: 'bi-arrow-up-circle', label: '⬆️ İyileştirme' },
        { value: 'bi-lightbulb', label: '💡 İnovasyon' },
        { value: 'bi-shield-check', label: '🛡️ Güvenlik' },
        { value: 'bi-people', label: '👥 Takım' },
        { value: 'bi-graph-up', label: '📈 Büyüme' },
        { value: 'bi-check-circle', label: '✓ Onay' },
        { value: 'bi-star', label: '⭐ Kalite' },
        { value: 'bi-globe', label: '🌍 Global' }
    ];

    // Renk seçenekleri
    const colorOptions = [
        { value: '#8B1538', label: 'Kırmızı (Ana Renk)' },
        { value: '#059669', label: 'Yeşil' },
        { value: '#7C3AED', label: 'Mor' },
        { value: '#DC2626', label: 'Kırmızı' },
        { value: '#F59E0B', label: 'Turuncu' },
        { value: '#06B6D4', label: 'Mavi' },
        { value: '#10B981', label: 'Açık Yeşil' },
        { value: '#F97316', label: 'Koyu Turuncu' }
    ];

    const handlePointAdd = () => {
        setPoints([...points, '']);
    };

    const handlePointRemove = (index) => {
        if (points.length > 1) {
            const newPoints = points.filter((_, i) => i !== index);
            setPoints(newPoints);
        }
    };

    const handlePointChange = (index, value) => {
        const newPoints = [...points];
        newPoints[index] = value;
        setPoints(newPoints);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Boş noktaları filtrele
            const filteredPoints = points.filter(point => point.trim() !== '');

            if (filteredPoints.length === 0) {
                message.error('En az bir özellik eklemelisiniz');
                setLoading(false);
                return;
            }

            const categoryData = {
                name: values.name,
                content: {
                    title: values.title,
                    description: values.description,
                    points: filteredPoints
                },
                icon: values.icon || 'bi-check-circle',
                color: values.color || '#8B1538',
                order: values.order || 0,
                metadata: {
                    metaTitle: values.metaTitle,
                    metaDescription: values.metaDescription,
                    keywords: values.keywords ? values.keywords.split(',').map(k => k.trim()) : []
                }
            };

            const response = await fetch(buildApiUrl('/quality-management'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                message.success('Kategori başarıyla oluşturuldu');
                navigate('/admin/quality-management');
            } else {
                const errorData = await response.json();
                message.error(errorData.message || 'Kategori oluşturulurken hata oluştu');
            }
        } catch (error) {
            console.error('Create error:', error);
            message.error('Kategori oluşturulurken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link to="/admin/quality-management">
                    <Button icon={<ArrowLeftOutlined />}>
                        Geri Dön
                    </Button>
                </Link>
                <h1 style={{ margin: 0 }}>Yeni Kalite Kategorisi Ekle</h1>
            </div>

            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        icon: 'bi-check-circle',
                        color: '#8B1538',
                        order: 0
                    }}
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Kategori Adı"
                                name="name"
                                rules={[
                                    { required: true, message: 'Kategori adı gereklidir' },
                                    { min: 3, message: 'Kategori adı en az 3 karakter olmalıdır' }
                                ]}
                            >
                                <Input placeholder="Örn: Kalite Politikası" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="İçerik Başlığı"
                                name="title"
                                rules={[
                                    { required: true, message: 'İçerik başlığı gereklidir' },
                                    { min: 3, message: 'İçerik başlığı en az 3 karakter olmalıdır' }
                                ]}
                            >
                                <Input placeholder="Örn: Kalite Politikamız" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label="İkon"
                                name="icon"
                            >
                                <Select placeholder="İkon seçin">
                                    {iconOptions.map(option => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Renk"
                                name="color"
                            >
                                <Select placeholder="Renk seçin">
                                    {colorOptions.map(option => (
                                        <Option key={option.value} value={option.value}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        backgroundColor: option.value,
                                                        borderRadius: '2px'
                                                    }}
                                                ></div>
                                                {option.label}
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Sıra"
                                name="order"
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Açıklama"
                        name="description"
                        rules={[
                            { required: true, message: 'Açıklama gereklidir' },
                            { min: 10, message: 'Açıklama en az 10 karakter olmalıdır' }
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Kategori hakkında detaylı açıklama yazın..."
                        />
                    </Form.Item>

                    {/* Özellikler/Noktalar */}
                    <Form.Item label="Özellikler">
                        {points.map((point, index) => (
                            <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <Input
                                    value={point}
                                    onChange={(e) => handlePointChange(index, e.target.value)}
                                    placeholder={`${index + 1}. özellik`}
                                />
                                {points.length > 1 && (
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handlePointRemove(index)}
                                    />
                                )}
                            </div>
                        ))}
                        <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={handlePointAdd}
                            style={{ width: '100%', marginTop: '8px' }}
                        >
                            Özellik Ekle
                        </Button>
                    </Form.Item>

                    {/* SEO Meta Bilgileri */}
                    <Card title="SEO Ayarları" size="small" style={{ marginBottom: '24px' }}>
                        <Form.Item
                            label="Meta Başlık"
                            name="metaTitle"
                        >
                            <Input placeholder="SEO için sayfa başlığı" />
                        </Form.Item>

                        <Form.Item
                            label="Meta Açıklama"
                            name="metaDescription"
                        >
                            <TextArea
                                rows={2}
                                placeholder="SEO için sayfa açıklaması"
                                maxLength={160}
                                showCount
                            />
                        </Form.Item>

                        <Form.Item
                            label="Anahtar Kelimeler"
                            name="keywords"
                        >
                            <Input placeholder="Virgülle ayırarak yazın. Örn: kalite, ISO 9001, sertifika" />
                        </Form.Item>
                    </Card>

                    <Form.Item>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Kategori Oluştur
                            </Button>
                            <Link to="/admin/quality-management">
                                <Button>İptal</Button>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateQualityManagementPage;
