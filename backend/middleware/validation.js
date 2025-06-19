const Joi = require('joi');

// Validation helper function
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        next();
    };
};

// Validation schema'ları
const schemas = {
    // Auth validation
    login: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Valid email address required',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'
        })
    }),

    // User validation
    createUser: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
            'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, and one number'
        }),
        role: Joi.string().valid('user', 'admin', 'moderator').default('user'),
        avatar: Joi.string().uri().optional()
    }),

    updateUser: Joi.object({
        username: Joi.string().min(3).max(30).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).optional(),
        role: Joi.string().valid('user', 'admin', 'moderator').optional(),
        avatar: Joi.string().uri().optional(),
        isActive: Joi.boolean().optional()
    }),

    // Product validation
    createProduct: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().max(2000).optional(),
        price: Joi.object({
            current: Joi.number().positive().required(),
            discount: Joi.number().min(0).max(99).optional()
        }).required(),
        category: Joi.string().required(),
        img: Joi.array().items(Joi.string().uri()).optional(),
        colors: Joi.array().items(Joi.string()).optional(),
        sizes: Joi.array().items(Joi.string()).optional(),
        tags: Joi.array().items(Joi.string()).optional(),
        isActive: Joi.boolean().default(true)
    }),

    // Contact validation
    createContact: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(3).max(20).allow('').optional(), // More flexible phone validation
        subject: Joi.string().min(3).max(200).required(), // Reduced from 5 to 3
        message: Joi.string().min(5).max(1000).required(), // Reduced from 10 to 5
        botProtection: Joi.object({
            honeypot: Joi.string().allow('').optional(),
            mathAnswer: Joi.number().required(),
            expectedAnswer: Joi.number().required()
        }).optional()
    }),

    // Blog validation
    createBlog: Joi.object({
        title: Joi.string().min(10).max(200).required(),
        content: Joi.string().min(50).required(),
        excerpt: Joi.string().max(300).optional(),
        featuredImage: Joi.string().uri().optional(),
        author: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).optional(),
        category: Joi.string().required(),
        isPublished: Joi.boolean().default(false),
        readTime: Joi.number().min(1).optional()
    }),

    // Job validation
    createJob: Joi.object({
        title: Joi.string().min(5).max(100).required(),
        description: Joi.string().min(50).required(),
        requirements: Joi.array().items(Joi.string()).required(),
        location: Joi.string().required(),
        employmentType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required(),
        department: Joi.string().required(),
        salaryRange: Joi.object({
            min: Joi.number().positive().optional(),
            max: Joi.number().positive().optional()
        }).optional(),
        benefits: Joi.array().items(Joi.string()).optional(),
        applicationDeadline: Joi.date().greater('now').optional(),
        isActive: Joi.boolean().default(true)
    }),

    // Job Application validation
    createJobApplication: Joi.object({
        jobId: Joi.string().required(),
        personalInfo: Joi.object({
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().pattern(/^[+]?[\d\s\-\(\)]{10,15}$/).required(),
            address: Joi.string().max(200).optional()
        }).required(),
        experience: Joi.object({
            totalYears: Joi.number().min(0).max(50).required(),
            currentPosition: Joi.string().max(100).optional(),
            previousCompanies: Joi.array().items(Joi.string()).optional()
        }).optional(),
        education: Joi.array().items(
            Joi.object({
                degree: Joi.string().required(),
                institution: Joi.string().required(),
                graduationYear: Joi.number().min(1950).max(new Date().getFullYear() + 10).required()
            })
        ).optional(),
        coverLetter: Joi.string().min(100).max(2000).optional(),
        resumeUrl: Joi.string().uri().optional()
    })
};

// Export validation middleware functions
module.exports = {
    validateLogin: validate(schemas.login),
    validateCreateUser: validate(schemas.createUser),
    validateUpdateUser: validate(schemas.updateUser),
    validateCreateProduct: validate(schemas.createProduct),
    validateCreateContact: validate(schemas.createContact),
    validateCreateBlog: validate(schemas.createBlog),
    validateCreateJob: validate(schemas.createJob),
    validateCreateJobApplication: validate(schemas.createJobApplication),
    validate,
    schemas
};
