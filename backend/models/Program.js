const mongoose = require("mongoose");

const ProgramSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        version: { type: String, required: true },
        description: { type: String, required: true },
        features: [{ type: String, required: true }],
        systemRequirements: [{ type: String, required: true }],
        downloadLink: { type: String, required: true },
        fileSize: { type: String, required: true },
        lastUpdate: { type: String, required: true },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
