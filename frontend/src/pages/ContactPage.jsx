import React, { useState } from "react";
import { buildApiUrl } from "../config/apiConfig";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Bot koruması için
  const [honeypot, setHoneypot] = useState("");
  const [mathQuestion, setMathQuestion] = useState({ question: "", answer: 0 });
  const [mathAnswer, setMathAnswer] = useState("");

  // Matematiksel soru oluştur
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    let question;

    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)} = ?`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }

    setMathQuestion({ question, answer });
  };

  // Component mount olduğunda matematik sorusu oluştur
  React.useEffect(() => {
    generateMathQuestion();
  }, []);

  // Yeni mesaj göndermek için formu sıfırla
  const handleNewMessage = () => {
    setIsSubmitted(false);
    setSubmitMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setMathAnswer("");
    setHoneypot("");
    generateMathQuestion();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Bot koruması kontrolleri
    if (honeypot.trim() !== "") {
      setSubmitMessage("Bot aktivitesi tespit edildi. Lütfen sayfayı yenileyin.");
      setIsSubmitting(false);
      return;
    }

    if (parseInt(mathAnswer) !== mathQuestion.answer) {
      setSubmitMessage("Matematik sorusunun cevabı yanlış. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
      generateMathQuestion();
      setMathAnswer("");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitMessage("Lütfen tüm zorunlu alanları doldurun.");
      setIsSubmitting(false);
      return;
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage("Lütfen geçerli bir e-posta adresi girin.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(buildApiUrl("/contacts"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          botProtection: {
            honeypot: honeypot,
            mathAnswer: parseInt(mathAnswer),
            expectedAnswer: mathQuestion.answer
          }
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSubmitMessage("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setMathAnswer("");
        setHoneypot("");
        generateMathQuestion();
      } else {
        const errorData = await response.json();
        setSubmitMessage(errorData.error || "Mesaj gönderilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
      setSubmitMessage("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1>İletişim</h1>
              <p>Sorularınız için bize ulaşın, size en iyi hizmeti sunmaktan mutluluk duyarız</p>
              <nav className="breadcrumb">
                <a href="/">Anasayfa</a> / <span>İletişim</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="section-header center">
            <h2>Bize Ulaşın</h2>
            <div className="section-line"></div>
            <p>Standart Kalıp ile iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz</p>
          </div>

          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
              <h3>Adres</h3>
              <p>Organize Sanayi Bölgesi<br />34000 İstanbul, Türkiye</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="bi bi-telephone"></i>
              </div>
              <h3>Telefon</h3>
              <p>+90 212 123 45 67<br />+90 212 123 45 68</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="bi bi-envelope"></i>
              </div>
              <h3>E-posta</h3>
              <p>info@standartkalip.com<br />sales@standartkalip.com</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="bi bi-clock"></i>
              </div>
              <h3>Çalışma Saatleri</h3>
              <p>Pazartesi - Cuma: 08:00 - 18:00<br />Cumartesi: 08:00 - 13:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="form-area">
              {!isSubmitted ? (
                <>
                  <div className="form-header">
                    <h2>Mesaj Gönderin</h2>
                    <p>Projeleriniz ve talepleriniz için bize yazın</p>
                  </div>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Ad Soyad</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Ad Soyad"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>E-posta</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="E-posta adresiniz"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Telefon</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Telefon numaranız"
                        />
                      </div>
                      <div className="form-group">
                        <label>Konu</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Mesaj konusu"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Mesajınız</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows="6"
                        placeholder="Mesajınızı buraya yazınız..."
                        required
                      ></textarea>
                    </div>

                    {/* Honeypot field - Bot'lar tarafından doldurulacak gizli alan */}
                    <div style={{ display: 'none' }}>
                      <label>Bu alanı doldurmayın</label>
                      <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </div>

                    {/* Matematik doğrulama */}
                    <div className="form-group">
                      <label>Güvenlik Doğrulaması *</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#333',
                          background: '#f5f5f5',
                          padding: '10px 15px',
                          borderRadius: '5px',
                          border: '1px solid #ddd'
                        }}>
                          {mathQuestion.question}
                        </span>
                      </div>
                      <input
                        type="number"
                        value={mathAnswer}
                        onChange={(e) => setMathAnswer(e.target.value)}
                        placeholder="Cevabı yazın"
                        required
                        style={{ maxWidth: '150px' }}
                      />
                      <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                        Yukarıdaki matematik sorusunun cevabını yazın
                      </small>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                      {!isSubmitting && <i className="bi bi-send"></i>}
                    </button>

                    {submitMessage && (
                      <div className={`submit-message ${submitMessage.includes("başarıyla") ? "success" : "error"}`}>
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <div className="success-container">
                  <div className="success-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="success-content">
                    <h2>Mesajınız Gönderildi!</h2>
                    <p>Teşekkür ederiz! Mesajınızı aldık ve en kısa sürede size dönüş yapacağız.</p>
                    <div className="success-details">
                      <div className="detail-item">
                        <i className="bi bi-clock"></i>
                        <span>Genellikle 24 saat içinde yanıtlıyoruz</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-envelope"></i>
                        <span>E-posta adresinize bilgi gelecek</span>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-telephone"></i>
                        <span>Acil durumlar için bizi arayabilirsiniz</span>
                      </div>
                    </div>
                    <div className="success-actions">
                      <button
                        onClick={handleNewMessage}
                        className="new-message-btn"
                      >
                        <i className="bi bi-plus-circle"></i>
                        Yeni Mesaj Gönder
                      </button>
                      <a href="/" className="home-btn">
                        <i className="bi bi-house"></i>
                        Ana Sayfaya Dön
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Map Area */}
            <div className="map-area">
              <div className="map-header">
                <h3>Konumumuz</h3>
                <p>Fabrikamızı ziyaret etmek için haritayı kullanabilirsiniz</p>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9633698339308!2d28.929441087738052!3d41.04793012296828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab1d021adf417%3A0xba3a3fdfdbb5f5d!2sEy%C3%BCp%20Sultan%20Camii!5e0!3m2!1str!2str!4v1665091191675!5m2!1str!2str"
                  width="100%"
                  height="400"
                  style={{ border: "0", borderRadius: "15px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="quick-contact-section">
        <div className="container">
          <div className="quick-contact-content">
            <div className="quick-contact-text">
              <h2>Hızlı Teklif Alın</h2>
              <p>Kalıp projeniz için ücretsiz ön teklif almak isterseniz, hemen bizi arayın</p>
            </div>
            <div className="quick-contact-actions">
              <a href="tel:+902121234567" className="call-btn">
                <i className="bi bi-telephone"></i>
                +90 212 123 45 67
              </a>
              <a href="mailto:info@standartkalip.com" className="email-btn">
                <i className="bi bi-envelope"></i>
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
