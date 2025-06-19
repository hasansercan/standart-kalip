const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");
const productRoute = require("./products.js");
const userRoute = require("./users.js");
const paymentRoute = require("./payment.js");
const sliderRoute = require("./sliders.js");
const featureRoute = require("./features.js");
const blogRoute = require("./blogs.js");
const programRoute = require("./programs.js");
const referenceRoute = require("./references.js");
const settingsRoute = require("./settings.js");
const pageRoute = require("./pages.js");
const contactRoute = require("./contacts.js");
const jobRoute = require("./jobs.js");
const jobApplicationRoute = require("./jobApplications.js");
const dashboardRoute = require("./dashboard.js");
const qualityManagementRoute = require("./qualityManagement.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);
router.use("/sliders", sliderRoute);
router.use("/features", featureRoute);
router.use("/blogs", blogRoute);
router.use("/programs", programRoute);
router.use("/references", referenceRoute);
router.use("/settings", settingsRoute);
router.use("/pages", pageRoute);
router.use("/contacts", contactRoute);
router.use("/jobs", jobRoute);
router.use("/job-applications", jobApplicationRoute);
router.use("/dashboard", dashboardRoute);
router.use("/quality-management", qualityManagementRoute);

module.exports = router;
