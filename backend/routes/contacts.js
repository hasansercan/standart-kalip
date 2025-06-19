const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.js");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware.js");
const { validateCreateContact } = require("../middleware/validation.js");

// Tüm mesajları getir (Admin için)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Contact listesi alınırken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Tek mesaj getir
router.get("/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ error: "Mesaj bulunamadı" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error("Mesaj getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Yeni mesaj oluştur
router.post("/", validateCreateContact, async (req, res) => {
    try {
        const { name, email, phone, subject, message, botProtection } = req.body;

        // Bot koruması kontrolleri
        if (botProtection) {
            // Honeypot field kontrolü
            if (botProtection.honeypot && botProtection.honeypot.trim() !== "") {
                return res.status(400).json({ error: "Bot aktivitesi tespit edildi" });
            }

            // Matematik sorusu kontrolü
            if (botProtection.mathAnswer !== botProtection.expectedAnswer) {
                return res.status(400).json({ error: "Güvenlik doğrulaması başarısız" });
            }
        }

        // Zorunlu alanlar kontrolü
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Tüm zorunlu alanları doldurun" });
        }

        // Email format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Geçersiz e-posta formatı" });
        }

        // Spam kontrolü - aynı IP'den kısa sürede çok fazla mesaj
        const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const recentMessages = await Contact.find({
            createdAt: { $gte: new Date(Date.now() - 60000) } // Son 1 dakika
        });

        if (recentMessages.length >= 3) {
            return res.status(429).json({ error: "Çok fazla mesaj gönderdiniz. Lütfen bekleyin." });
        }

        const newContact = new Contact({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : "",
            subject: subject.trim(),
            message: message.trim(),
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        console.error("Mesaj oluşturulurken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Mesaj durumunu güncelle
router.put("/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const contactId = req.params.id;
        const updates = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            updates,
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Mesaj bulunamadı" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        console.error("Mesaj güncellenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Mesajı okundu olarak işaretle
router.patch("/:id/read", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const contactId = req.params.id;

        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { isRead: true },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Mesaj bulunamadı" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        console.error("Mesaj okundu işaretlenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Mesajı sil
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const contactId = req.params.id;

        const deletedContact = await Contact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return res.status(404).json({ error: "Mesaj bulunamadı" });
        }

        res.status(200).json({ message: "Mesaj başarıyla silindi" });
    } catch (error) {
        console.error("Mesaj silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İstatistikler
router.get("/stats/dashboard", authenticateToken, requireAdmin, async (req, res) => {
    try {
        const totalMessages = await Contact.countDocuments();
        const unreadMessages = await Contact.countDocuments({ isRead: false });
        const pendingMessages = await Contact.countDocuments({ status: "pending" });

        res.status(200).json({
            total: totalMessages,
            unread: unreadMessages,
            pending: pendingMessages,
        });
    } catch (error) {
        console.error("İstatistikler alınırken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

module.exports = router;
