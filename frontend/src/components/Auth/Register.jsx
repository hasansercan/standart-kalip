import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../config/apiConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Register API URL:', buildApiUrl('/auth/register')); // Debug
      console.log('Register Form Data:', formData); // Debug

      const response = await fetch(buildApiUrl('/auth/register'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('Register Response status:', response.status); // Debug
      console.log('Register Response ok:', response.ok); // Debug

      if (response.ok) {
        const data = await response.json();
        console.log('Register Response data:', data); // Debug
        // const { password, ...rest } = data;

        localStorage.setItem("user", JSON.stringify(data));
        message.success("Kayıt başarılı.");
        navigate("/");
      } else {
        const errorData = await response.text();
        console.log('Register Error response:', errorData); // Debug
        message.error("Kayıt başarısız.");
      }
    } catch (error) {
      console.error('Register error:', error); // Debug
      message.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" onChange={handleInputChange} name="username" required />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input type="email" onChange={handleInputChange} name="email" required />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
              required
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
