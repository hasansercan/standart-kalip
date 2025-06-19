import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateUserPage = () => {
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/api/users`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    avatar: avatarUrl || "/img/avatars/avatar1.jpg",
                }),
            });

            if (response.ok) {
                message.success("Kullanıcı başarıyla oluşturuldu.");
                navigate("/admin/users");
            } else {
                const errorData = await response.json();
                message.error(errorData.error || "Kullanıcı oluşturulurken bir hata oluştu.");
            }
        } catch (error) {
            message.error("Kullanıcı oluşturulurken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const value = e.target.value;
        setAvatarUrl(value);
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2>Yeni Kullanıcı Ekle</h2>
            <Form
                form={form}
                name="createUser"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    role: "user",
                }}
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
                    label="Şifre"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Lütfen şifreyi giriniz!",
                        },
                        {
                            min: 6,
                            message: "Şifre en az 6 karakter olmalıdır!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Minimum 6 karakter" />
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

                <Form.Item>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Kullanıcı Oluştur
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

export default CreateUserPage;
