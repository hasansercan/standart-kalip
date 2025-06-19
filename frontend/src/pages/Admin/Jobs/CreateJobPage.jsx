import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../../config/apiConfig";

const { TextArea } = Input;
const { Option } = Select;

const CreateJobPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(buildApiUrl("/jobs"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("İş ilanı başarıyla oluşturuldu!");
                navigate("/admin/jobs");
            } else {
                const errorData = await response.json();
                message.error(errorData.error || "İş ilanı oluşturulurken hata oluştu!");
            }
        } catch (error) {
            console.error("Error creating job:", error);
            message.error("İş ilanı oluşturulurken hata oluştu!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <Space>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate("/admin/jobs")}
                    >
                        Geri Dön
                    </Button>
                    <h2 style={{ margin: 0 }}>Yeni İş İlanı Oluştur</h2>
                </Space>
            </div>

            <Card>
                <Form
                    form={form}
                    name="createJob"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{
                        postedBy: "İK Departmanı"
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="İş İlanı Başlığı"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen iş ilanı başlığını girin!",
                                    },
                                ]}
                            >
                                <Input placeholder="Örn: Kalıp Tasarım Mühendisi" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Departman"
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen departmanı girin!",
                                    },
                                ]}
                            >
                                <Input placeholder="Örn: Mühendislik" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Konum"
                                name="location"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen konumu girin!",
                                    },
                                ]}
                            >
                                <Input placeholder="Örn: İstanbul, Türkiye" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="İş Türü"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen iş türünü seçin!",
                                    },
                                ]}
                            >
                                <Select placeholder="İş türünü seçin">
                                    <Option value="full-time">Tam Zamanlı</Option>
                                    <Option value="part-time">Yarı Zamanlı</Option>
                                    <Option value="contract">Sözleşmeli</Option>
                                    <Option value="internship">Staj</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Deneyim"
                                name="experience"
                                rules={[
                                    {
                                        required: true,
                                        message: "Lütfen deneyim seviyesini girin!",
                                    },
                                ]}
                            >
                                <Input placeholder="Örn: 3-5 yıl" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Maaş (Opsiyonel)"
                                name="salary"
                            >
                                <Input placeholder="Örn: 25.000 - 35.000 TL" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Son Başvuru Tarihi (Opsiyonel)"
                                name="applicationDeadline"
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Tarihi seçin"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="İlan Veren"
                        name="postedBy"
                    >
                        <Input placeholder="Örn: İK Departmanı" />
                    </Form.Item>

                    <Form.Item
                        label="İş Açıklaması"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Lütfen iş açıklamasını girin!",
                            },
                        ]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="İş ilanının detaylı açıklamasını yazın..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Aranan Özellikler"
                        rules={[
                            {
                                required: true,
                                message: "En az bir özellik eklemelisiniz!",
                            },
                        ]}
                    >
                        <Form.List name="requirements">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: "flex",
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Özellik açıklaması gerekli",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Örn: Makine Mühendisliği mezunu" style={{ width: 400 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Özellik Ekle
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item
                        label="Sorumluluklar"
                        rules={[
                            {
                                required: true,
                                message: "En az bir sorumluluk eklemelisiniz!",
                            },
                        ]}
                    >
                        <Form.List name="responsibilities">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: "flex",
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Sorumluluk açıklaması gerekli",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Örn: 3D kalıp tasarımı ve modelleme" style={{ width: 400 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Sorumluluk Ekle
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item
                        label="Yan Haklar (Opsiyonel)"
                    >
                        <Form.List name="benefits">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: "flex",
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name]}
                                            >
                                                <Input placeholder="Örn: Özel sağlık sigortası" style={{ width: 400 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Yan Hak Ekle
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loading}
                                size="large"
                            >
                                İş İlanını Kaydet
                            </Button>
                            <Button
                                size="large"
                                onClick={() => navigate("/admin/jobs")}
                            >
                                İptal
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateJobPage;
