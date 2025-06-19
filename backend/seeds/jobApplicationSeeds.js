const JobApplication = require("../models/JobApplication.js");
const Job = require("../models/Job.js");

const seedJobApplications = async () => {
    try {
        await JobApplication.deleteMany({});

        // Önce iş ilanlarını al
        const jobs = await Job.find();

        if (jobs.length === 0) {
            console.log("❌ Önce iş ilanları oluşturulmalı");
            return;
        }

        const applications = [
            {
                jobId: jobs[0]._id, // CNC Operatörü
                jobTitle: jobs[0].title,
                firstName: "Mehmet",
                lastName: "Yıldız",
                email: "mehmet.yildiz@email.com",
                phone: "+90 532 123 45 67",
                address: "Küçükçekmece, İstanbul",
                experience: "3 yıl CNC operatörlüğü deneyimi",
                education: "Teknik Lise mezunu",
                skills: ["CNC tezgah kullanımı", "Teknik resim okuma", "Kalite kontrolü", "Fanuc sistemi"],
                coverLetter: "Merhaba, 3 yıllık CNC operatörlüğü deneyimim ile takımınıza katılmak istiyorum. Daha önce otomotiv sektöründe çalıştım ve kaliteli üretim konusunda deneyimliyim.",
                linkedIn: "linkedin.com/in/mehmetyildiz",
                availableStartDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                expectedSalary: "18.000 TL",
                status: "pending"
            },
            {
                jobId: jobs[1]._id, // Kalıp Tasarım Mühendisi
                jobTitle: jobs[1].title,
                firstName: "Ayşe",
                lastName: "Kaya",
                email: "ayse.kaya@email.com",
                phone: "+90 555 987 65 43",
                address: "Beşiktaş, İstanbul",
                experience: "4 yıl kalıp tasarım deneyimi",
                education: "Makine Mühendisliği mezunu - İTÜ",
                skills: ["SolidWorks", "AutoCAD", "Mold Flow", "3D Modelleme", "İngilizce"],
                coverLetter: "Makine mühendisliği mezunu olarak 4 yıldır kalıp tasarım alanında çalışmaktayım. SolidWorks ve AutoCAD programlarında ileri seviye bilgiye sahibim. Özellikle plastik enjeksiyon kalıpları konusunda uzmanım.",
                portfolio: "aysekalip.com",
                linkedIn: "linkedin.com/in/aysekaya",
                availableStartDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                expectedSalary: "30.000 TL",
                status: "reviewing",
                reviewedBy: "Mühendislik Müdürü",
                reviewedAt: new Date()
            },
            {
                jobId: jobs[2]._id, // Kalite Kontrol Uzmanı
                jobTitle: jobs[2].title,
                firstName: "Ali",
                lastName: "Demir",
                email: "ali.demir@email.com",
                phone: "+90 216 345 67 89",
                address: "Kadıköy, İstanbul",
                experience: "2 yıl kalite kontrol deneyimi",
                education: "Endüstri Mühendisliği mezunu - Boğaziçi Üniversitesi",
                skills: ["ISO 9001", "Kalite yönetimi", "İstatistiksel analiz", "Six Sigma", "MS Office"],
                coverLetter: "Endüstri mühendisliği mezunu olarak kalite yönetim sistemleri konusunda deneyimliyim. ISO 9001 sertifikasına sahibim ve Six Sigma eğitimi aldım. Kalite süreçlerini iyileştirme konusunda tutkulu bir mühendisim.",
                linkedIn: "linkedin.com/in/alidemir",
                availableStartDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                expectedSalary: "22.000 TL",
                status: "interview",
                notes: "Çok başarılı bir mülakat gerçekleştirdi. Teknik bilgisi yeterli.",
                reviewedBy: "Kalite Müdürü",
                reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                jobId: jobs[3]._id, // Satış Temsilcisi
                jobTitle: jobs[3].title,
                firstName: "Fatma",
                lastName: "Özkan",
                email: "fatma.ozkan@email.com",
                phone: "+90 533 222 33 44",
                address: "Şişli, İstanbul",
                experience: "3 yıl B2B satış deneyimi",
                education: "İşletme mezunu - Marmara Üniversitesi",
                skills: ["B2B Satış", "Müşteri İlişkileri", "CRM", "Sunum", "Pazarlama"],
                coverLetter: "3 yıldır makine sektöründe B2B satış yapıyorum. Müşteri ilişkileri konusunda güçlü bir networke sahibim. Hedef odaklı çalışırım ve başarı hikayelerim vardır.",
                linkedIn: "linkedin.com/in/fatmaozkan",
                availableStartDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                expectedSalary: "25.000 TL + Komisyon",
                status: "accepted",
                notes: "Başarılı satış geçmişi var. İşe alındı.",
                reviewedBy: "Satış Müdürü",
                reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                jobId: jobs[4]._id, // Stajyer Mühendis
                jobTitle: jobs[4].title,
                firstName: "Cem",
                lastName: "Aktaş",
                email: "cem.aktas@email.com",
                phone: "+90 545 111 22 33",
                address: "Beykoz, İstanbul",
                experience: "Öğrenci - Stajyer",
                education: "Makine Mühendisliği 4. sınıf - Yıldız Teknik Üniversitesi",
                skills: ["AutoCAD", "SolidWorks (temel)", "MATLAB", "Python", "Makine elemanları"],
                coverLetter: "Makine mühendisliği 4. sınıf öğrencisiyim. Kalıp sektörüne ilgi duyuyorum ve bu alanda deneyim kazanmak istiyorum. Öğrenmeye açık ve motiveli bir öğrenciyim.",
                availableStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: "pending"
            },
            {
                jobId: jobs[0]._id, // CNC Operatörü (ikinci başvuru)
                jobTitle: jobs[0].title,
                firstName: "Hasan",
                lastName: "Koç",
                email: "hasan.koc@email.com",
                phone: "+90 534 555 66 77",
                address: "Pendik, İstanbul",
                experience: "5 yıl CNC deneyimi",
                education: "Meslek Lisesi mezunu",
                skills: ["CNC Freze", "CNC Torna", "CAM programlama", "Kalite kontrolü"],
                coverLetter: "5 yıldır CNC sektöründe çalışmaktayım. Hem freze hem tornada tezgahlarında deneyimliyim. CAM programlama bilgim vardır.",
                availableStartDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                expectedSalary: "19.000 TL",
                status: "rejected",
                notes: "Deneyimi var ancak şirket kültürüne uygun değil.",
                reviewedBy: "Üretim Müdürü",
                reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        ];

        for (const applicationData of applications) {
            const application = new JobApplication(applicationData);
            await application.save();
        }

        console.log("✅ JobApplication seeds başarıyla eklendi");
    } catch (error) {
        console.error("❌ JobApplication seeds eklenirken hata:", error);
    }
};

module.exports = seedJobApplications;
