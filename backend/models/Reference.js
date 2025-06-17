const mongoose = require("mongoose");

const ReferenceSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        sector: { type: String, required: true },
        description: { type: String },
        website: { type: String },
        sortOrder: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const Reference = mongoose.model("Reference", ReferenceSchema);
module.exports = Reference;
