const Contact = require("../models/Contact.js");

const contacts = [
    {
        name: "Ahmet Yılmaz",
        email: "ahmet.yilmaz@email.com",
        phone: "+90 532 123 45 67",
        subject: "Kalıp Talebi",
        message: "Merhaba, plastik enjeksiyon kalıbı yaptırmak istiyorum. 500 adet ürün için kalıp ihtiyacım var. Detaylı bilgi alabilir miyim?",
        isRead: false,
        status: "pending"
    },
    {
        name: "Fatma Kaya",
        email: "fatma.kaya@firma.com",
        phone: "+90 212 876 54 32",
        subject: "Referans Talep",
        message: "Daha önce yaptığınız işlerle ilgili referanslarınızı görebilir miyim? Özellikle otomotiv sektöründeki çalışmalarınızı merak ediyorum.",
        isRead: true,
        status: "replied"
    },
    {
        name: "Mehmet Demir",
        email: "mehmet.demir@email.com",
        phone: "+90 555 987 65 43",
        subject: "Fiyat Teklifi",
        message: "Metal stampa kalıbı için fiyat teklifi almak istiyorum. Kalıp boyutları 50x30 cm. Ne kadar sürede teslim edebilirsiniz?",
        isRead: false,
        status: "pending"
    },
    {
        name: "Zeynep Şen",
        email: "zeynep.sen@company.com",
        phone: "+90 216 345 67 89",
        subject: "Acil Kalıp İhtiyacı",
        message: "Acil olarak küçük bir plastik parça için kalıp yaptırmam gerekiyor. En kısa sürede görüşebilir miyiz? İletişim numaranızı rica ediyorum.",
        isRead: true,
        status: "pending"
    },
    {
        name: "Ali Özkan",
        email: "ali.ozkan@gmail.com",
        subject: "Genel Bilgi",
        message: "Kalıp üretimi konusunda bilgi almak istiyorum. Hangi materyallerle çalışıyorsunuz ve minimum sipariş miktarınız nedir?",
        isRead: false,
        status: "pending"
    }
];

const seedContacts = async () => {
    try {
        await Contact.deleteMany({});

        for (const contactData of contacts) {
            const contact = new Contact(contactData);
            await contact.save();
        }

        console.log("✅ Contact seeds başarıyla eklendi");
    } catch (error) {
        console.error("❌ Contact seeds eklenirken hata:", error);
    }
};

module.exports = seedContacts;
