import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
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
import OrderPage from "./pages/Admin/OrderPage";
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
      <Route path="/auth" element={<AuthPage />} />

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
      <Route path="/admin/*">
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="users/create" element={<CreateUserPage />} />
        <Route path="users/update/:userId" element={<UpdateUserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="blogs" element={<AdminBlogPage />} />
        <Route path="blogs/create" element={<CreateBlogPage />} />
        <Route path="blogs/update/:id" element={<UpdateBlogPage />} />
        <Route path="features" element={<FeaturePage />} />
        <Route path="features/create" element={<CreateFeaturePage />} />
        <Route path="features/update/:id" element={<UpdateFeaturePage />} />
        <Route path="sliders" element={<SliderPage />} />
        <Route path="sliders/create" element={<CreateSliderPage />} />
        <Route path="sliders/update/:id" element={<UpdateSliderPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="programs" element={<ProgramPage />} />
        <Route path="programs/create" element={<CreateProgramPage />} />
        <Route path="programs/update/:programId" element={<UpdateProgramPage />} />
        <Route path="references" element={<ReferencePage />} />
        <Route path="references/create" element={<CreateReferencePage />} />
        <Route path="references/update/:referenceId" element={<UpdateReferencePage />} />
        <Route path="pages" element={<PagePage />} />
        <Route path="pages/create" element={<CreatePagePage />} />
        <Route path="pages/update/:id" element={<UpdatePagePage />} />
        <Route path="settings/homepage" element={<HomepageSettingsPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
