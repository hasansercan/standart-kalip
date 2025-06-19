import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import CartPage from "./pages/CartPage";
import CertificatesPage from "./pages/CertificatesPage";
import ContactPage from "./pages/ContactPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import MissionVisionPage from "./pages/MissionVisionPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ServicesPage from "./pages/ServicesPage";
import ShopPage from "./pages/ShopPage";

import "./App.css";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import AdminBlogPage from "./pages/Admin/Blogs/BlogPage";
import CreateBlogPage from "./pages/Admin/Blogs/CreateBlogPage";
import UpdateBlogPage from "./pages/Admin/Blogs/UpdateBlogPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";

import DynamicPage from "./components/DynamicPage/DynamicPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import CreateFeaturePage from "./pages/Admin/Features/CreateFeaturePage";
import FeaturePage from "./pages/Admin/Features/FeaturePage";
import UpdateFeaturePage from "./pages/Admin/Features/UpdateFeaturePage";
import JobApplicationPage from "./pages/Admin/JobApplications/JobApplicationPage";
import CreateJobPage from "./pages/Admin/Jobs/CreateJobPage";
import JobPage from "./pages/Admin/Jobs/JobPage";
import UpdateJobPage from "./pages/Admin/Jobs/UpdateJobPage";
import MessagePage from "./pages/Admin/Messages/MessagePage";
import OrderPage from "./pages/Admin/OrderPage";

// Quality Management Pages
import CreateQualityManagementPage from "./pages/Admin/QualityManagement/CreateQualityManagementPage";
import QualityManagementPage from "./pages/Admin/QualityManagement/QualityManagementPage";

import CreatePagePage from "./pages/Admin/Pages/CreatePagePage";
import PagePage from "./pages/Admin/Pages/PagePage";
import UpdatePagePage from "./pages/Admin/Pages/UpdatePagePage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CreateProgramPage from "./pages/Admin/Programs/CreateProgramPage";
import ProgramPage from "./pages/Admin/Programs/ProgramPage";
import UpdateProgramPage from "./pages/Admin/Programs/UpdateProgramPage";
import CreateReferencePage from "./pages/Admin/References/CreateReferencePage";
import ReferencePage from "./pages/Admin/References/ReferencePage";
import UpdateReferencePage from "./pages/Admin/References/UpdateReferencePage";
import HomepageSettingsPage from "./pages/Admin/Settings/HomepageSettingsPage";
import SettingsPage from "./pages/Admin/Settings/SettingsPage";
import CreateSliderPage from "./pages/Admin/Sliders/CreateSliderPage";
import SliderPage from "./pages/Admin/Sliders/SliderPage";
import UpdateSliderPage from "./pages/Admin/Sliders/UpdateSliderPage";
import UserPage from "./pages/Admin/UserPage";
import CreateUserPage from "./pages/Admin/Users/CreateUserPage";
import UpdateUserPage from "./pages/Admin/Users/UpdateUserPage";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Dinamik Kurumsal Sayfalar */}
      <Route path="/page/:slug" element={<DynamicPage />} />

      {/* Statik Sayfalar (Geçici - Sonra kaldırılabilir) */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/mission-vision" element={<MissionVisionPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/careers" element={<CareersPage />} />

      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/users" element={<UserPage />} />
      <Route path="/admin/users/create" element={<CreateUserPage />} />
      <Route path="/admin/users/update/:userId" element={<UpdateUserPage />} />
      <Route path="/admin/categories" element={<CategoryPage />} />
      <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
      <Route path="/admin/categories/update/:id" element={<UpdateCategoryPage />} />
      <Route path="/admin/blogs" element={<AdminBlogPage />} />
      <Route path="/admin/blogs/create" element={<CreateBlogPage />} />
      <Route path="/admin/blogs/update/:id" element={<UpdateBlogPage />} />
      <Route path="/admin/features" element={<FeaturePage />} />
      <Route path="/admin/features/create" element={<CreateFeaturePage />} />
      <Route path="/admin/features/update/:id" element={<UpdateFeaturePage />} />
      <Route path="/admin/sliders" element={<SliderPage />} />
      <Route path="/admin/sliders/create" element={<CreateSliderPage />} />
      <Route path="/admin/sliders/update/:id" element={<UpdateSliderPage />} />
      <Route path="/admin/products" element={<ProductPage />} />
      <Route path="/admin/products/create" element={<CreateProductPage />} />
      <Route path="/admin/products/update/:id" element={<UpdateProductPage />} />
      <Route path="/admin/programs" element={<ProgramPage />} />
      <Route path="/admin/programs/create" element={<CreateProgramPage />} />
      <Route path="/admin/programs/update/:programId" element={<UpdateProgramPage />} />
      <Route path="/admin/references" element={<ReferencePage />} />
      <Route path="/admin/references/create" element={<CreateReferencePage />} />
      <Route path="/admin/references/update/:referenceId" element={<UpdateReferencePage />} />
      <Route path="/admin/pages" element={<PagePage />} />
      <Route path="/admin/pages/create" element={<CreatePagePage />} />
      <Route path="/admin/pages/update/:id" element={<UpdatePagePage />} />
      <Route path="/admin/quality-management" element={<QualityManagementPage />} />
      <Route path="/admin/quality-management/create" element={<CreateQualityManagementPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      <Route path="/admin/settings/homepage" element={<HomepageSettingsPage />} />
      <Route path="/admin/orders" element={<OrderPage />} />
      <Route path="/admin/messages" element={<MessagePage />} />
      <Route path="/admin/jobs" element={<JobPage />} />
      <Route path="/admin/jobs/create" element={<CreateJobPage />} />
      <Route path="/admin/jobs/update/:id" element={<UpdateJobPage />} />
      <Route path="/admin/job-applications" element={<JobApplicationPage />} />
    </Routes>
  );
}

export default App;
