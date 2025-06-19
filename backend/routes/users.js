const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware.js");
const { validateCreateUser, validateUpdateUser } = require("../middleware/validation.js");

// Yeni kullanıcı oluşturma (Create) - Admin tarafından
router.post("/", authenticateToken, requireAdmin, validateCreateUser, async (req, res) => {
  try {
    const { username, email, password, role, avatar } = req.body;

    // Email zaten kayıtlı mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Bu email adresi zaten kayıtlı." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      avatar: avatar || "/img/avatars/avatar1.jpg",
      isActive: true
    });

    await newUser.save();

    // Şifreyi response'dan çıkar
    const { password: _, ...userResponse } = newUser.toObject();
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Tüm kullanıcıları getirme (Read - All)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir kullanıcıyı getirme (Read - Single)
router.get("/:userId", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı güncelleme (Update)
router.put("/:userId", authenticateToken, requireAdmin, validateUpdateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password, role, avatar, isActive } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Email değişikliği kontrolü
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Bu email adresi zaten kullanılıyor." });
      }
    }

    // Güncelleme verileri
    const updateData = {
      username: username || user.username,
      email: email || user.email,
      role: role || user.role,
      avatar: avatar || user.avatar,
      isActive: isActive !== undefined ? isActive : user.isActive
    };

    // Şifre güncellenmişse hashle
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı silme (Delete) - Admin hesabı silinmez
router.delete("/:userId", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Admin hesabı silinmesini engelle
    if (user.role === "admin") {
      return res.status(403).json({ error: "Admin hesabı silinemez." });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı aktif/pasif durumu değiştirme
router.patch("/:userId/status", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isActive } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Admin hesabı pasif edilmesini engelle
    if (user.role === "admin" && !isActive) {
      return res.status(403).json({ error: "Admin hesabı pasif edilemez." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
