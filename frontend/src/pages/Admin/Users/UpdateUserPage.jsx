import { Button, Form, Input, message, Select, Spin, Switch } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateUserPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const navigate = useNavigate();
    const { userId } = useParams();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchUser = useCallback(async () => {
        setDataLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/users/${userId}`);

            if (response.ok) {
                const data = await response.json();

                // Form alanlarını doldur
                form.setFieldsValue({
                    username: data.username,
                    email: data.email,
                    role: data.role,
                    isActive: data.isActive,
                });

                // Mevcut avatar'ı ayarla
                setAvatarUrl(data.avatar || "");
            } else {
                message.error("Kullanıcı bilgileri alınamadı.");
            }
        } catch (error) {
            } finally {
            setDataLoading(false);
        }
    }, [apiUrl, userId, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const submitData = {
                ...values,
                avatar: avatarUrl,
            };

            // Şifre boşsa gönderme
            if (!values.password) {
                delete submitData.password;
            }

            const response = await fetch(`${apiUrl}/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                message.success("Kullanıcı başarıyla güncellendi.");
                navigate("/admin/users");
            } else {
                const errorData = await response.json();
                message.error(errorData.error || "Kullanıcı güncellenirken bir hata oluştu.");
            }
        } catch (error) {
            message.error("Kullanıcı güncellenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const value = e.target.value;
        setAvatarUrl(value);
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (dataLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2>Kullanıcı Güncelle</h2>
            <Form
                form={form}
                name="updateUser"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Kullanıcı Adı"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen kullanıcı adını giriniz!",
                        },
                        {
                            min: 3,
                            message: "Kullanıcı adı en az 3 karakter olmalıdır!",
                        },
                    ]}
                >
                    <Input placeholder="Örn: John Doe" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen email adresini giriniz!",
                        },
                        {
                            type: "email",
                            message: "Geçerli bir email adresi giriniz!",
                        },
                    ]}
                >
                    <Input placeholder="ornek@email.com" />
                </Form.Item>

                <Form.Item
                    label="Yeni Şifre"
                    name="password"
                    help="Şifreyi değiştirmek istemiyorsanız boş bırakın"
                >
                    <Input.Password placeholder="Yeni şifre (opsiyonel)" />
                </Form.Item>

                <Form.Item
                    label="Rol"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen rolü seçiniz!",
                        },
                    ]}
                >
                    <Select placeholder="Kullanıcı rolünü seçin">
                        <Option value="user">Kullanıcı</Option>
                        <Option value="moderator">Moderatör</Option>
                        <Option value="admin">Yönetici</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Avatar URL">
                    <Input
                        placeholder="https://example.com/avatar.jpg"
                        value={avatarUrl}
                        onChange={handleAvatarChange}
                    />
                    {avatarUrl && (
                        <div style={{ marginTop: 10 }}>
                            <img
                                src={avatarUrl}
                                alt="Avatar Preview"
                                style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "1px solid #d9d9d9"
                                }}
                                onError={(e) => {
                                    e.target.src = '/img/avatars/avatar1.jpg';
                                }}
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Durum"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Aktif" unCheckedChildren="Pasif" />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Kullanıcı Güncelle
                        </Button>
                        <Button onClick={() => navigate("/admin/users")}>
                            İptal
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUserPage;
