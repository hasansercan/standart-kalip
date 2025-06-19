const mongoose = require('mongoose');

const qualityManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    content: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        points: [{
            type: String,
            required: true
        }]
    },
    icon: {
        type: String,
        default: 'bi-check-circle'
    },
    color: {
        type: String,
        default: '#8B1538'
    },
    metadata: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    }
}, {
    timestamps: true
});

// Slug'ı otomatik oluştur
qualityManagementSchema.pre('save', function (next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    }
    next();
});

// Aktif kategorileri getir
qualityManagementSchema.statics.getActiveCategories = function () {
    return this.find({ isActive: true }).sort({ order: 1 });
};

const QualityManagement = mongoose.model('QualityManagement', qualityManagementSchema);

module.exports = QualityManagement;
