const mongoose = require("mongoose");

const FeatureSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Feature = mongoose.model("Feature", FeatureSchema);
module.exports = Feature;
