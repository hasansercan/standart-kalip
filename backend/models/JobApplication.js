const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: [],
        },
        coverLetter: {
            type: String,
            required: true,
        },
        resumeUrl: {
            type: String,
        },
        portfolio: {
            type: String,
        },
        linkedIn: {
            type: String,
        },
        availableStartDate: {
            type: Date,
        },
        expectedSalary: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "reviewing", "interview", "accepted", "rejected"],
            default: "pending",
        },
        notes: {
            type: String,
        },
        reviewedBy: {
            type: String,
        },
        reviewedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
