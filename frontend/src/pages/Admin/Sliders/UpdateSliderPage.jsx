import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, InputNumber, message, Space, Spin, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Dragger } = Upload;

const UpdateSliderPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadedImagePath, setUploadedImagePath] = useState(null);
    const navigate = useNavigate();
    const { id: sliderId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    // Geçici: Normal upload endpoint kullan
    const getUploadEndpoint = () => {
        return `${apiUrl}/api/sliders/upload`;

        // Cloudinary hazır olduğunda bu kısmı uncomment edin:
        // if (import.meta.env.PROD || apiUrl.includes('netlify')) {
        //     return `${apiUrl}/api/sliders/upload-cloud`;
        // }
        // return `${apiUrl}/api/sliders/upload`;
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const submitData = {
                ...values,
                image: uploadedImagePath || values.image
            };

            const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                message.success("Slider başarıyla güncellendi.");
                navigate("/admin/sliders");
            } else {
                message.error("Slider güncelleme başarısız.");
            }
        } catch (error) {
            message.error("Slider güncelleme başarısız.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        setImagePreview(value);
        setUploadedImagePath(null);
    };

    const handleCancel = () => {
        navigate("/admin/sliders");
    };

    const uploadProps = {
        name: 'image',
        multiple: false,
        action: getUploadEndpoint(),
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        onChange(info) {
            const { status } = info.file;
            if (status === 'uploading') {
                message.loading('Dosya yükleniyor...', 0);
            } else if (status === 'done') {
                message.destroy();
                message.success(`${info.file.name} dosyası başarıyla yüklendi.`);
                const imagePath = info.file.response.imagePath;
                setUploadedImagePath(imagePath);
                setImagePreview(imagePath);
                form.setFieldsValue({ image: imagePath });
            } else if (status === 'error') {
                message.destroy();
                message.error(`${info.file.name} dosya yükleme başarısız.`);
            }
        },
        onRemove() {
            setUploadedImagePath(null);
            setImagePreview(null);
            form.setFieldsValue({ image: null });
        }
    };

    useEffect(() => {
        const fetchSlider = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/sliders/${sliderId}`);

                if (!response.ok) {
                    message.error("Slider verisi alınamadı.");
                    return;
                }

                const sliderData = await response.json();
                form.setFieldsValue(sliderData);
                setImagePreview(sliderData.image);
            } catch (error) {
                message.error("Slider verisi alınamadı.");
            } finally {
                setDataLoading(false);
            }
        };

        if (sliderId) {
            fetchSlider();
        }
    }, [sliderId, apiUrl, form]);

    if (dataLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <h2>Slider Güncelle</h2>
            </div>

            <Form
                form={form}
                name="updateSlider"
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: "800px" }}
            >
                <Form.Item
                    label="Başlık"
                    name="title"
                    rules={[
                        { required: true, message: "Başlık gereklidir!" },
                        { min: 3, message: "Başlık en az 3 karakter olmalıdır!" }
                    ]}
                >
                    <Input placeholder="Slider başlığını girin" />
                </Form.Item>

                <Form.Item
                    label="Alt Başlık"
                    name="subtitle"
                >
                    <Input placeholder="Alt başlık (opsiyonel)" />
                </Form.Item>

                <Form.Item
                    label="Açıklama"
                    name="description"
                >
                    <TextArea
                        rows={4}
                        placeholder="Slider açıklaması (opsiyonel)"
                    />
                </Form.Item>

                <Form.Item
                    label="Görsel"
                    name="image"
                    rules={[
                        { required: true, message: "Görsel gereklidir!" }
                    ]}
                >
                    <div>
                        <Dragger {...uploadProps} style={{ marginBottom: 16 }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Dosyayı sürükleyip bırakın veya tıklayarak seçin</p>
                            <p className="ant-upload-hint">
                                Sadece JPG, JPEG, PNG, GIF, WEBP formatları desteklenir. Maksimum 5MB.
                            </p>
                        </Dragger>

                        <div style={{ marginTop: 16 }}>
                            <span style={{ color: '#666' }}>Veya URL girebilirsiniz:</span>
                            <Input
                                placeholder="https://example.com/image.jpg veya /img/slider/slider1.jpg"
                                onChange={handleImageChange}
                                style={{ marginTop: 8 }}
                            />
                        </div>
                    </div>
                </Form.Item>

                {imagePreview && (
                    <Form.Item label="Görsel Önizleme">
                        <Image
                            src={imagePreview}
                            alt="Slider Preview"
                            style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "cover" }}
                            placeholder="Görsel yüklenemedi"
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label="Link URL"
                    name="link"
                >
                    <Input placeholder="/products, /about vb. (opsiyonel)" />
                </Form.Item>

                <Form.Item
                    label="Buton Metni"
                    name="buttonText"
                >
                    <Input placeholder="Buton üzerinde görünecek metin" />
                </Form.Item>

                <Form.Item
                    label="Sıra"
                    name="order"
                    rules={[
                        { required: true, message: "Sıra numarası gereklidir!" },
                        { type: "number", min: 0, message: "Sıra numarası 0 veya büyük olmalıdır!" }
                    ]}
                >
                    <InputNumber
                        min={0}
                        placeholder="Slider sırası"
                        style={{ width: "100%" }}
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
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                        >
                            Slider Güncelle
                        </Button>
                        <Button
                            onClick={handleCancel}
                            size="large"
                        >
                            İptal
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateSliderPage;
