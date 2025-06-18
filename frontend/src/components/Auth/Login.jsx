import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Login API URL:', buildApiUrl('/auth/login')); // Debug
      console.log('Login Form Data:', formData); // Debug

      const response = await fetch(buildApiUrl('/auth/login'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('Login Response status:', response.status); // Debug
      console.log('Login Response ok:', response.ok); // Debug

      if (response.ok) {
        const data = await response.json();
        console.log('Login Response data:', data); // Debug
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş başarılı.");
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.text();
        console.log('Login Error response:', errorData); // Debug
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.error('Login error:', error); // Debug
      message.error("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              Username or email address <span className="required">*</span>
            </span>
            <input type="text" name="email" onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
