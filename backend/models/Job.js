const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["full-time", "part-time", "contract", "internship"],
            default: "full-time",
        },
        experience: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: [String],
            required: true,
        },
        responsibilities: {
            type: [String],
            required: true,
        },
        benefits: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        applicationDeadline: {
            type: Date,
        },
        postedBy: {
            type: String,
            default: "HR Department",
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
