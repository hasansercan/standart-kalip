import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import CartProvider from "./context/CartProvider";
import "./index.css";
import { Layout } from "./layouts/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
    <ScrollToTop />
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
