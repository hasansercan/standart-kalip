import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../config/apiConfig";
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(buildApiUrl('/auth/login'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.role === "admin" || data.role === "moderator") {
                    localStorage.setItem("user", JSON.stringify(data));
                    message.success(data.role === "admin" ? "Admin girişi başarılı." : "Moderatör girişi başarılı.");
                    // Admin paneline yönlendir
                    navigate("/admin/dashboard");
                } else {
                    message.error("Bu alan sadece yöneticiler ve moderatörler için!");
                }
            } else {
                const errorResponse = await response.json();
                message.error(errorResponse.error || "Giriş başarısız. Bilgilerinizi kontrol edin.");
            }
        } catch (error) {
            message.error("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.");
        } finally {
            setLoading(false);
        }
    };

    const goToMainSite = () => {
        navigate("/");
    };

    return (
        <div className="admin-login-page">
            {/* Background */}
            <div className="admin-login-bg"></div>

            {/* Content */}
            <div className="admin-login-container">
                {/* Header */}
                <div className="admin-login-header">
                    <div className="admin-logo">
                        <span className="logo-main">standart</span>
                        <span className="logo-sub">KALIP</span>
                    </div>
                    <h1>Yönetim Paneli</h1>
                    <p>Sisteme giriş yapmak için bilgilerinizi giriniz</p>
                </div>

                {/* Login Form */}
                <div className="admin-login-form-container">
                    <form onSubmit={handleAdminLogin} className="admin-login-form">
                        <div className="form-group">
                            <label htmlFor="email">E-posta Adresi</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="admin@standartkalip.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Şifre</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="admin-login-btn"
                            disabled={loading}
                        >
                            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                        </button>
                    </form>

                    <div className="admin-login-footer">
                        <button
                            onClick={goToMainSite}
                            className="back-to-site-btn"
                        >
                            ← Ana Siteye Dön
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
