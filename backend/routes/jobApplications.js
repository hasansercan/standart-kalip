const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication.js");
const Job = require("../models/Job.js");

// Tüm iş başvurularını getir (Admin)
router.get("/", async (req, res) => {
    try {
        const applications = await JobApplication.find()
            .populate('jobId', 'title department')
            .sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error("İş başvuruları getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Tek iş başvurusunu getir
router.get("/:id", async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id)
            .populate('jobId', 'title department location');

        if (!application) {
            return res.status(404).json({ error: "İş başvurusu bulunamadı" });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error("İş başvurusu getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Belirli iş ilanı için başvuruları getir
router.get("/job/:jobId", async (req, res) => {
    try {
        const applications = await JobApplication.find({ jobId: req.params.jobId })
            .sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error("İş başvuruları getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Yeni iş başvurusu oluştur
router.post("/", async (req, res) => {
    try {
        const {
            jobId,
            firstName,
            lastName,
            email,
            phone,
            address,
            experience,
            education,
            skills,
            coverLetter,
            resumeUrl,
            portfolio,
            linkedIn,
            availableStartDate,
            expectedSalary
        } = req.body;

        // Zorunlu alanlar kontrolü
        if (!jobId || !firstName || !lastName || !email || !phone || !address || !experience || !education || !coverLetter) {
            return res.status(400).json({ error: "Tüm zorunlu alanları doldurun" });
        }

        // İş ilanının var olup olmadığını kontrol et
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "İş ilanı bulunamadı" });
        }

        if (!job.isActive) {
            return res.status(400).json({ error: "Bu iş ilanı artık aktif değil" });
        }

        // Email format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Geçersiz e-posta formatı" });
        }

        // Aynı kişinin aynı işe daha önce başvurup başvurmadığını kontrol et
        const existingApplication = await JobApplication.findOne({
            jobId: jobId,
            email: email.toLowerCase()
        });

        if (existingApplication) {
            return res.status(400).json({ error: "Bu iş ilanına daha önce başvurmuşsunuz" });
        }

        const newApplication = new JobApplication({
            jobId,
            jobTitle: job.title,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            address: address.trim(),
            experience: experience.trim(),
            education: education.trim(),
            skills: Array.isArray(skills) ? skills : (skills ? [skills] : []),
            coverLetter: coverLetter.trim(),
            resumeUrl: resumeUrl ? resumeUrl.trim() : "",
            portfolio: portfolio ? portfolio.trim() : "",
            linkedIn: linkedIn ? linkedIn.trim() : "",
            availableStartDate: availableStartDate ? new Date(availableStartDate) : null,
            expectedSalary: expectedSalary ? expectedSalary.trim() : ""
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error("İş başvurusu oluşturulurken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İş başvurusu durumunu güncelle
router.patch("/:id/status", async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status, notes, reviewedBy } = req.body;

        const validStatuses = ["pending", "reviewing", "interview", "accepted", "rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Geçersiz durum" });
        }

        const updatedApplication = await JobApplication.findByIdAndUpdate(
            applicationId,
            {
                status,
                notes: notes || "",
                reviewedBy: reviewedBy || "",
                reviewedAt: new Date()
            },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ error: "İş başvurusu bulunamadı" });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error("İş başvurusu durumu güncellenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İş başvurusunu sil
router.delete("/:id", async (req, res) => {
    try {
        const applicationId = req.params.id;

        const deletedApplication = await JobApplication.findByIdAndDelete(applicationId);

        if (!deletedApplication) {
            return res.status(404).json({ error: "İş başvurusu bulunamadı" });
        }

        res.status(200).json({ message: "İş başvurusu başarıyla silindi" });
    } catch (error) {
        console.error("İş başvurusu silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İstatistikler
router.get("/stats/dashboard", async (req, res) => {
    try {
        const totalApplications = await JobApplication.countDocuments();
        const pendingApplications = await JobApplication.countDocuments({ status: "pending" });
        const reviewingApplications = await JobApplication.countDocuments({ status: "reviewing" });
        const interviewApplications = await JobApplication.countDocuments({ status: "interview" });
        const acceptedApplications = await JobApplication.countDocuments({ status: "accepted" });
        const rejectedApplications = await JobApplication.countDocuments({ status: "rejected" });

        res.status(200).json({
            total: totalApplications,
            pending: pendingApplications,
            reviewing: reviewingApplications,
            interview: interviewApplications,
            accepted: acceptedApplications,
            rejected: rejectedApplications,
        });
    } catch (error) {
        console.error("İstatistikler alınırken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

module.exports = router;
