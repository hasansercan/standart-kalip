const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { validateLogin } = require("../middleware/validation.js");
const { authenticateToken } = require("../middleware/authMiddleware.js");

// Rate limiting için login attempt tracking
const loginAttempts = new Map();

// IP bazlı rate limiting helper
const checkLoginAttempts = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: now };

  // 15 dakika içinde 5 başarısız deneme limiti
  if (attempts.count >= 5 && (now - attempts.lastAttempt) < 15 * 60 * 1000) {
    return res.status(429).json({
      error: "Too many login attempts. Please try again in 15 minutes.",
      code: "RATE_LIMITED"
    });
  }

  // Reset attempts if 15 minutes passed
  if ((now - attempts.lastAttempt) > 15 * 60 * 1000) {
    loginAttempts.delete(ip);
  }

  next();
};

// Token oluşturma helper
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Kullanıcı girişi (Login)
router.post("/login", checkLoginAttempts, validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;

    // Kullanıcı bulma (email case-insensitive)
    const user = await User.findOne({
      email: email.toLowerCase(),
      isActive: true
    });

    if (!user) {
      // Başarısız girişim kaydet
      const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
      loginAttempts.set(ip, { count: attempts.count + 1, lastAttempt: Date.now() });

      return res.status(401).json({
        error: "Invalid email or password.",
        code: "INVALID_CREDENTIALS"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Başarısız girişim kaydet
      const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
      loginAttempts.set(ip, { count: attempts.count + 1, lastAttempt: Date.now() });

      return res.status(401).json({
        error: "Invalid email or password.",
        code: "INVALID_CREDENTIALS"
      });
    }

    // Başarılı giriş - rate limit temizle
    loginAttempts.delete(ip);

    // JWT tokenları oluştur
    const { accessToken, refreshToken } = generateTokens(user._id);

    // HttpOnly cookie olarak refresh token gönder
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
    });

    // Son giriş zamanını güncelle
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date()
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
      expiresIn: 3600 // 1 saat
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Server error during login.",
      code: "SERVER_ERROR"
    });
  }
});

// Token yenileme endpoint'i
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        error: "Refresh token required",
        code: "REFRESH_TOKEN_REQUIRED"
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        error: "Invalid token type",
        code: "INVALID_TOKEN_TYPE"
      });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: "Invalid or inactive user",
        code: "INVALID_USER"
      });
    }

    // Yeni tokenlar oluştur
    const tokens = generateTokens(user._id);

    // Yeni refresh token'ı cookie olarak set et
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      accessToken: tokens.accessToken,
      expiresIn: 3600
    });
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired refresh token",
      code: "INVALID_REFRESH_TOKEN"
    });
  }
});

// Çıkış yapma
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // Refresh token cookie'sini temizle
    res.clearCookie('refreshToken');

    res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error during logout",
      code: "SERVER_ERROR"
    });
  }
});

// Kullanıcı profil bilgilerini getir
router.get("/me", authenticateToken, async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
        avatar: req.user.avatar,
        isActive: req.user.isActive
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      code: "SERVER_ERROR"
    });
  }
});

module.exports = router;
