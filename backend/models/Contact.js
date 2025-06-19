const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "replied", "closed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
