import { Navigate, Route, Routes } from "react-router-dom";
// Components
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Category from "./pages/Category/Category";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Protected from "./components/Protected";
import AdminLayout from "./layouts/AdminLayout";
import PageNotFound from "./pages/PageNotFound";
import AdminLoginPage from "./pages/Admin/Login";
import {
  CategoryAdmin,
  ProductAdmin,
  CartAdmin,
  CategoryEdit,
  CategoryAdd,
} from "./pages";
import Path from "./routes";
import ProductAdd from "./pages/Admin/Product/add";
import ProductEdit from "./pages/Admin/Product/edit";
import ScrollToTop from "./components/ScrollTop";
import Checkout from "./pages/Checkout";
import CheckoutForm from "./pages/Checkout/CheckoutForm";

const App = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path={Path.DetailCategory} element={<Category />} />
          <Route path={Path.DetailProduct} element={<DetailProduct />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Signup} element={<Signup />} />
          <Route path={Path.Cart} element={<Cart />} />
          <Route path={Path.Contact} element={<Contact />} />
          <Route path={Path.Checkout} element={<Checkout />} />
          <Route path={Path.Payment} element={<CheckoutForm />} />
        </Route>
        <Route
          path={Path.Admin}
          element={
            <Protected>
              <AdminLayout />
            </Protected>
          }
        >
          <Route index element={<Navigate to={Path.AdminDashBoard} />} />
          <Route path={Path.AdminDashBoard} element={<CategoryAdmin />} />
          <Route path={Path.AdminCategory}>
            <Route index element={<CategoryAdmin />} />
            <Route path={Path.AdminCategoryAdd} element={<CategoryAdd />} />
            <Route path={Path.AdminCategoryEdit} element={<CategoryEdit />} />
          </Route>
          <Route path={Path.AdminProduct}>
            <Route index element={<ProductAdmin />} />
            <Route path={Path.AdminProductAdd} element={<ProductAdd />} />
            <Route path={Path.AdminProductEdit} element={<ProductEdit />} />
          </Route>
          <Route path={Path.AdminCart} element={<CartAdmin />} />
        </Route>
        <Route path={Path.AdminLogin} element={<AdminLoginPage />} />
        <Route path={Path.PageNotFound} element={<PageNotFound />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
