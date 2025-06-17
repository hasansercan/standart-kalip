const mongoose = require("mongoose");

const PageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: Object,
            required: true,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
