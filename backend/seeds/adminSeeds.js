const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
    try {
        // Admin kullanıcı var mı kontrol et
        const adminExists = await User.findOne({ email: "admin@standartkalip.com" });

        if (adminExists) {
            console.log("✅ Admin kullanıcı zaten mevcut");
            return;
        }

        // Admin kullanıcı oluştur
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const adminUser = new User({
            username: "admin",
            email: "admin@standartkalip.com",
            password: hashedPassword,
            role: "admin",
            avatar: "/img/avatars/admin.jpg",
            isActive: true,
            lastLogin: new Date()
        });

        await adminUser.save();
        console.log("✅ Admin kullanıcı başarıyla oluşturuldu:");
        console.log("   Email: admin@standartkalip.com");
        console.log("   Password: admin123");
        console.log("   ⚠️  Güvenlik için şifreyi değiştirmeyi unutmayın!");

    } catch (error) {
        console.error("❌ Admin kullanıcı oluşturulurken hata:", error);
    }
};

module.exports = seedAdmin;
