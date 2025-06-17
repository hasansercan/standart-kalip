import { useLocation } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import MainLayout from "./MainLayout";

export const Layout = ({ children }) => {
    const location = useLocation();

    // Admin giriş sayfası için MainLayout kullan (header/footer olmadan)
    if (location.pathname === "/admin") {
        return children;
    }

    // Diğer admin sayfaları için AdminLayout kullan
    if (location.pathname.startsWith("/admin/")) {
        return <AdminLayout>{children}</AdminLayout>;
    }

    // Normal sayfalar için MainLayout kullan
    return <MainLayout>{children}</MainLayout>;
};
