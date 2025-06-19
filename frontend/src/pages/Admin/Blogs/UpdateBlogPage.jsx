import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, InputNumber, message, Select, Spin, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const UpdateBlogPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [slugPreview, setSlugPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // Blog verilerini getir
    useEffect(() => {
        const fetchBlog = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/blogs/${id}`);
                if (response.ok) {
                    const blog = await response.json();

                    // Form alanlarını doldur
                    form.setFieldsValue({
                        title: blog.title,
                        content: blog.content,
                        excerpt: blog.excerpt,
                        featuredImage: blog.featuredImage,
                        author: blog.author,
                        tags: blog.tags ? blog.tags.join(', ') : '',
                        category: blog.category,
                        isPublished: blog.isPublished,
                        readTime: blog.readTime
                    });

                    setImageUrl(blog.featuredImage);
                    setSlugPreview(blog.slug);
                } else {
                    message.error("Blog verisi alınamadı");
                    navigate("/admin/blogs");
                }
            } catch (error) {
                message.error("Blog verisi alınamadı");
                navigate("/admin/blogs");
            } finally {
                setDataLoading(false);
            }
        };

        fetchBlog();
    }, [id, apiUrl, form, navigate]);

    // Slug oluşturma fonksiyonu
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    // Resim yükleme fonksiyonu
    const handleImageUpload = async (file) => {
        setImageUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${apiUrl}/api/blogs/upload`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setImageUrl(data.imagePath);
                form.setFieldsValue({ featuredImage: data.imagePath });
                message.success('Resim başarıyla yüklendi!');
            } else {
                message.error('Resim yükleme başarısız.');
            }
        } catch (error) {
            message.error('Resim yükleme sırasında hata oluştu.');
        } finally {
            setImageUploading(false);
        }

        return false; // Prevent default upload behavior
    };

    // Resim silme fonksiyonu
    const handleImageRemove = () => {
        setImageUrl("");
        form.setFieldsValue({ featuredImage: "" });
        message.success('Resim kaldırıldı');
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Tags'i array'e çevir
            const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()) : [];

            const blogData = {
                ...values,
                tags: tagsArray
            };

            const response = await fetch(`${apiUrl}/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                message.success("Blog yazısı başarıyla güncellendi.");
                navigate("/admin/blogs");
            } else {
                message.error("Blog güncelleme başarısız.");
            }
        } catch (error) {
            message.error("Blog güncelleme sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        if (title) {
            const slug = generateSlug(title);
            setSlugPreview(slug);
        } else {
            setSlugPreview("");
        }
    };

    const blogCategories = [
        "Teknoloji",
        "Kalite",
        "İnovasyon",
        "Ar-Ge",
        "Üretim",
        "Çevre",
        "Sürdürülebilirlik",
        "İş Geliştirme",
        "Hizmet",
        "Eğitim"
    ];

    // Upload button
    const uploadButton = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <PlusOutlined style={{ fontSize: '24px', color: '#8b2635', marginBottom: '8px' }} />
            <div style={{ color: '#666', fontSize: '14px' }}>
                Resim Yükle
            </div>
            <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
                (JPEG, PNG, WebP)
            </div>
        </div>
    );

    if (dataLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="update-blog-page">
            <h2>Blog Yazısını Güncelle</h2>
            <Form
                form={form}
                name="updateBlog"
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 800 }}
            >
                <Form.Item
                    label="Başlık"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen blog başlığını girin!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Blog başlığını girin"
                        onChange={handleTitleChange}
                        size="large"
                    />
                </Form.Item>

                {slugPreview && (
                    <div style={{
                        marginBottom: 16,
                        padding: 12,
                        background: '#f5f5f5',
                        borderRadius: 8,
                        border: '1px solid #d9d9d9'
                    }}>
                        <strong>URL Önizleme:</strong> <code style={{ color: '#8b2635' }}>/blog/{slugPreview}</code>
                    </div>
                )}

                <Form.Item
                    label="Öne Çıkan Resim"
                    name="featuredImage"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen blog için bir resim yükleyin!",
                        },
                    ]}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="blog-image-uploader"
                            showUploadList={false}
                            beforeUpload={handleImageUpload}
                            loading={imageUploading}
                            style={{ width: '100%' }}
                        >
                            {imageUrl ? (
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Image
                                        src={imageUrl}
                                        alt="Blog resmi"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                        preview={true}
                                    />
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        onClick={handleImageRemove}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            zIndex: 1
                                        }}
                                    />
                                </div>
                            ) : (
                                uploadButton
                            )}
                        </Upload>

                        {imageUploading && (
                            <div style={{ textAlign: 'center', color: '#666' }}>
                                Resim yükleniyor...
                            </div>
                        )}

                        <div style={{ fontSize: '12px', color: '#666' }}>
                            • Maksimum dosya boyutu: 5MB<br />
                            • Desteklenen formatlar: JPEG, PNG, WebP<br />
                            • Önerilen boyut: 1200x600 piksel
                        </div>
                    </div>
                </Form.Item>

                <Form.Item
                    label="Kısa Açıklama (Excerpt)"
                    name="excerpt"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen kısa açıklama girin!",
                        },
                    ]}
                    help="Bu açıklama blog listelerinde görünecek"
                >
                    <TextArea rows={3} placeholder="Blog yazısının kısa açıklaması" />
                </Form.Item>

                <Form.Item
                    label="İçerik"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen blog içeriğini girin!",
                        },
                    ]}
                    help="HTML etiketleri kullanabilirsiniz (h2, h3, p, ul, li, blockquote vb.)"
                >
                    <TextArea
                        rows={12}
                        placeholder="Blog içeriğini buraya yazın. HTML etiketleri kullanabilirsiniz."
                    />
                </Form.Item>

                <Form.Item
                    label="Kategori"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen kategori seçin!",
                        },
                    ]}
                >
                    <Select placeholder="Kategori seçin" size="large">
                        {blogCategories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Yazar"
                    name="author"
                >
                    <Input placeholder="Yazar adı" size="large" />
                </Form.Item>

                <Form.Item
                    label="Etiketler"
                    name="tags"
                    help="Virgülle ayırarak birden fazla etiket girebilirsiniz"
                >
                    <Input placeholder="teknoloji, kalite, üretim" size="large" />
                </Form.Item>

                <Form.Item
                    label="Okuma Süresi (dakika)"
                    name="readTime"
                >
                    <InputNumber min={1} max={60} placeholder="5" size="large" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Yayında"
                    name="isPublished"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} size="large">
                        Blog Yazısını Güncelle
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate("/admin/blogs")}
                        size="large"
                    >
                        İptal
                    </Button>
                </Form.Item>
            </Form>

            <style>{`
                .blog-image-uploader .ant-upload {
                    width: 100% !important;
                    height: 200px !important;
                }
                .blog-image-uploader .ant-upload-select {
                    width: 100% !important;
                    height: 200px !important;
                    border: 2px dashed #d9d9d9 !important;
                    border-radius: 8px !important;
                }
                .blog-image-uploader .ant-upload-select:hover {
                    border-color: #8b2635 !important;
                }
            `}</style>
        </div>
    );
};

export default UpdateBlogPage;
