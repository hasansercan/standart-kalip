import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, message, Space, Spin, Upload } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Dragger } = Upload;

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImagePath, setUploadedImagePath] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Yüklenen görsel path'ini values'a ekle
      const submitData = {
        ...values,
        img: uploadedImagePath || values.img
      };

      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        form.resetFields();
        setImagePreview(null);
        setUploadedImagePath(null);
      } else {
        message.error("Kategori oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori oluşturma hatası:", error);
      message.error("Kategori oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const value = e.target.value;
    setImagePreview(value);
    // URL girildiğinde uploaded image path'i temizle
    setUploadedImagePath(null);
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  // Dosya yükleme özelliği
  const uploadProps = {
    name: 'image',
    multiple: false,
    action: `${apiUrl}/api/categories/upload`,
    accept: '.jpg,.jpeg,.png,.gif,.webp',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} dosyası başarıyla yüklendi.`);
        const imagePath = info.file.response.imagePath;
        setUploadedImagePath(imagePath);
        setImagePreview(imagePath);
        // Form'da img field'ını güncelle
        form.setFieldsValue({ img: imagePath });
      } else if (status === 'error') {
        message.error(`${info.file.name} dosya yükleme başarısız.`);
      }
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2>Yeni Kategori Oluştur</h2>
      </div>

      <Spin spinning={loading}>
        <Form
          name="createCategory"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          style={{ maxWidth: "800px" }}
        >
          <Form.Item
            label="Kategori İsmi"
            name="name"
            rules={[
              {
                required: true,
                message: "Lütfen kategori adını girin!",
              },
              { min: 2, message: "Kategori adı en az 2 karakter olmalıdır!" }
            ]}
          >
            <Input placeholder="Kategori adını girin" />
          </Form.Item>

          <Form.Item
            label="Kategori Görseli"
            name="img"
            rules={[
              {
                required: true,
                message: "Kategori görseli gereklidir!",
              },
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
                  placeholder="https://example.com/image.jpg veya /img/categories/category1.jpg"
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
                alt="Category Preview"
                style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover" }}
                placeholder="Görsel yüklenemedi"
              />
            </Form.Item>
          )}

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Kategori Oluştur
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
      </Spin>
    </div>
  );
};

export default CreateCategoryPage;
