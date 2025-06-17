const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String },
        image: { type: String, required: true },
        link: { type: String },
        buttonText: { type: String, default: "Detay" },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
