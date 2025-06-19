const express = require("express");
const router = express.Router();
const Job = require("../models/Job.js");

// Tüm aktif iş ilanlarını getir (Public)
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("İş ilanları getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Tüm iş ilanlarını getir (Admin)
router.get("/admin", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("İş ilanları getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Tek iş ilanı getir
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ error: "İş ilanı bulunamadı" });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error("İş ilanı getirilirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Yeni iş ilanı oluştur
router.post("/", async (req, res) => {
    try {
        const {
            title,
            department,
            location,
            type,
            experience,
            salary,
            description,
            requirements,
            responsibilities,
            benefits,
            applicationDeadline,
            postedBy
        } = req.body;

        // Zorunlu alanlar kontrolü
        if (!title || !department || !location || !experience || !description || !requirements || !responsibilities) {
            return res.status(400).json({ error: "Tüm zorunlu alanları doldurun" });
        }

        const newJob = new Job({
            title: title.trim(),
            department: department.trim(),
            location: location.trim(),
            type: type || "full-time",
            experience: experience.trim(),
            salary: salary ? salary.trim() : "",
            description: description.trim(),
            requirements: Array.isArray(requirements) ? requirements : [requirements],
            responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
            benefits: Array.isArray(benefits) ? benefits : (benefits ? [benefits] : []),
            applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
            postedBy: postedBy || "HR Department"
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error("İş ilanı oluşturulurken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İş ilanını güncelle
router.put("/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const updates = req.body;

        // Requirements ve responsibilities array'e çevir
        if (updates.requirements && !Array.isArray(updates.requirements)) {
            updates.requirements = [updates.requirements];
        }
        if (updates.responsibilities && !Array.isArray(updates.responsibilities)) {
            updates.responsibilities = [updates.responsibilities];
        }
        if (updates.benefits && !Array.isArray(updates.benefits)) {
            updates.benefits = updates.benefits ? [updates.benefits] : [];
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            updates,
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ error: "İş ilanı bulunamadı" });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        console.error("İş ilanı güncellenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İş ilanını aktif/pasif yap
router.patch("/:id/toggle", async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ error: "İş ilanı bulunamadı" });
        }

        job.isActive = !job.isActive;
        await job.save();

        res.status(200).json(job);
    } catch (error) {
        console.error("İş ilanı durumu güncellenirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İş ilanını sil
router.delete("/:id", async (req, res) => {
    try {
        const jobId = req.params.id;

        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ error: "İş ilanı bulunamadı" });
        }

        res.status(200).json({ message: "İş ilanı başarıyla silindi" });
    } catch (error) {
        console.error("İş ilanı silinirken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// İstatistikler
router.get("/stats/dashboard", async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ isActive: true });
        const inactiveJobs = await Job.countDocuments({ isActive: false });

        res.status(200).json({
            total: totalJobs,
            active: activeJobs,
            inactive: inactiveJobs,
        });
    } catch (error) {
        console.error("İstatistikler alınırken hata:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

module.exports = router;
