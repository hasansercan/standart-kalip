const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Category = require('../models/Category');
const Contact = require('../models/Contact');
const Feature = require('../models/Feature');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const Page = require('../models/Page');
const Product = require('../models/Product');
const Program = require('../models/Program');
const Reference = require('../models/Reference');
const Settings = require('../models/Settings');
const Slider = require('../models/Slider');
const User = require('../models/User');

// Dashboard genel istatistikleri
router.get('/stats', async (req, res) => {
    try {
        // Paralel olarak tüm istatistikleri çek
        const [
            totalProducts,
            totalBlogs,
            totalJobs,
            activeJobs,
            totalJobApplications,
            pendingApplications,
            totalContacts,
            unreadContacts,
            totalUsers,
            totalReferences,
            totalPrograms,
            recentBlogs,
            recentJobs,
            recentApplications,
            recentContacts
        ] = await Promise.all([
            Product.countDocuments(),
            Blog.countDocuments(),
            Job.countDocuments(),
            Job.countDocuments({ isActive: true }),
            JobApplication.countDocuments(),
            JobApplication.countDocuments({ status: 'pending' }),
            Contact.countDocuments(),
            Contact.countDocuments({ isRead: false }),
            User.countDocuments(),
            Reference.countDocuments(),
            Program.countDocuments(),
            Blog.find().sort({ createdAt: -1 }).limit(5).select('title createdAt'),
            Job.find().sort({ createdAt: -1 }).limit(5).select('title department location createdAt'),
            JobApplication.find().sort({ appliedAt: -1 }).limit(5).populate('jobId', 'title').select('firstName lastName email jobTitle status appliedAt'),
            Contact.find().sort({ createdAt: -1 }).limit(5).select('name email subject isRead createdAt')
        ]);

        // Aylık istatistikler
        const currentYear = new Date().getFullYear();
        const monthlyStats = await getMonthlyStats(currentYear);

        // Başvuru durumu dağılımı
        const applicationStatusStats = await JobApplication.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const stats = {
            overview: {
                totalProducts,
                totalBlogs,
                totalJobs,
                activeJobs,
                totalJobApplications,
                pendingApplications,
                totalContacts,
                unreadContacts,
                totalUsers,
                totalReferences,
                totalPrograms
            },
            recent: {
                blogs: recentBlogs,
                jobs: recentJobs,
                applications: recentApplications,
                contacts: recentContacts
            },
            monthly: monthlyStats,
            applicationStatus: applicationStatusStats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {})
        };

        res.json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Aylık istatistikleri hesapla
async function getMonthlyStats(year) {
    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const monthlyData = [];

    for (let i = 0; i < 12; i++) {
        const startDate = new Date(year, i, 1);
        const endDate = new Date(year, i + 1, 0);

        const [jobApplications, contacts, blogs, jobs] = await Promise.all([
            JobApplication.countDocuments({
                appliedAt: { $gte: startDate, $lt: endDate }
            }),
            Contact.countDocuments({
                createdAt: { $gte: startDate, $lt: endDate }
            }),
            Blog.countDocuments({
                createdAt: { $gte: startDate, $lt: endDate }
            }),
            Job.countDocuments({
                createdAt: { $gte: startDate, $lt: endDate }
            })
        ]);

        monthlyData.push({
            month: months[i],
            jobApplications,
            contacts,
            blogs,
            jobs,
            total: jobApplications + contacts + blogs + jobs
        });
    }

    return monthlyData;
}

// Haftalık trend verileri
router.get('/weekly-trends', async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const weeklyData = [];
        const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            const [applications, contacts] = await Promise.all([
                JobApplication.countDocuments({
                    appliedAt: { $gte: startOfDay, $lte: endOfDay }
                }),
                Contact.countDocuments({
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                })
            ]);

            weeklyData.unshift({
                day: days[date.getDay()],
                applications,
                contacts,
                total: applications + contacts
            });
        }

        res.json(weeklyData);
    } catch (error) {
        console.error('Weekly trends error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Kategori dağılımı
router.get('/category-distribution', async (req, res) => {
    try {
        const [productCategories, blogCategories] = await Promise.all([
            Category.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'products'
                    }
                },
                {
                    $project: {
                        name: 1,
                        productCount: { $size: '$products' }
                    }
                },
                {
                    $match: {
                        productCount: { $gt: 0 }
                    }
                }
            ]),
            Category.aggregate([
                {
                    $lookup: {
                        from: 'blogs',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'blogs'
                    }
                },
                {
                    $project: {
                        name: 1,
                        blogCount: { $size: '$blogs' }
                    }
                },
                {
                    $match: {
                        blogCount: { $gt: 0 }
                    }
                }
            ])
        ]);

        res.json({
            products: productCategories,
            blogs: blogCategories
        });
    } catch (error) {
        console.error('Category distribution error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
