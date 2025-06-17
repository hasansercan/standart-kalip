const express = require("express");
const router = express.Router();
const Program = require("../models/Program.js");

// Yeni bir program oluşturma (Create)
router.post("/", async (req, res) => {
    try {
        const { name, version, description, features, systemRequirements, downloadLink, fileSize, lastUpdate, isActive } = req.body;

        const newProgram = new Program({
            name,
            version,
            description,
            features,
            systemRequirements,
            downloadLink,
            fileSize,
            lastUpdate,
            isActive
        });
        await newProgram.save();

        res.status(201).json(newProgram);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Tüm programları getirme (Read - All)
router.get("/", async (req, res) => {
    try {
        const programs = await Program.find();

        res.status(200).json(programs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Aktif programı getirme (Frontend için)
router.get("/active", async (req, res) => {
    try {
        const activeProgram = await Program.findOne({ isActive: true });

        if (!activeProgram) {
            return res.status(404).json({ error: "Aktif program bulunamadı." });
        }

        res.status(200).json(activeProgram);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Belirli bir programı getirme (Read - Single)
router.get("/:programId", async (req, res) => {
    try {
        const programId = req.params.programId;

        try {
            const program = await Program.findById(programId);

            res.status(200).json(program);
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "Program not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Program güncelleme (Update)
router.put("/:programId", async (req, res) => {
    try {
        const programId = req.params.programId;
        const updates = req.body;

        const existingProgram = await Program.findById(programId);

        if (!existingProgram) {
            return res.status(404).json({ error: "Program not found." });
        }

        const updatedProgram = await Program.findByIdAndUpdate(
            programId,
            updates,
            { new: true }
        );

        res.status(200).json(updatedProgram);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Program silme (Delete)
router.delete("/:programId", async (req, res) => {
    try {
        const programId = req.params.programId;

        const deletedProgram = await Program.findByIdAndRemove(programId);

        if (!deletedProgram) {
            return res.status(404).json({ error: "Program not found." });
        }

        res.status(200).json(deletedProgram);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Program aktif/pasif durumu değiştirme
router.put("/:programId/toggle", async (req, res) => {
    try {
        const programId = req.params.programId;

        // Önce tüm programları pasif yap
        await Program.updateMany({}, { isActive: false });

        // Sadece seçilen programı aktif yap
        const updatedProgram = await Program.findByIdAndUpdate(
            programId,
            { isActive: true },
            { new: true }
        );

        if (!updatedProgram) {
            return res.status(404).json({ error: "Program not found." });
        }

        res.status(200).json(updatedProgram);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
