import React from "react";
import {Routes, Route} from 'react-router-dom';
import AdminLogin from "./admin/pages/AdminLogin";
import Admin from "./admin/Admin";
import AddCategory from "./admin/pages/AddCategory";
import AddProduct from "./admin/pages/AddProduct";
import { ToastContainer} from 'react-toastify';
import Category from "./admin/pages/Category";
import Order from "./admin/pages/Order";
import OrderDetail from "./admin/pages/OrderDetail";
import Product from "./admin/pages/Product";
import Public from "./Public";
import ProductList from './pages/ProductList';
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ShippingInfo from "./pages/ShippingInfo";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import ProductCategory from "./pages/ProductCategory";
import EditMainCategory from "./admin/pages/EditMainCategory";
import EditProduct from "./admin/pages/EditProduct";
import SubCategory from "./admin/pages/SubCategory";
import EditSubCategory from "./admin/pages/EditSubCategory";
import AddSlideshow from "./admin/pages/AddSlideshow";
import Slideshow from "./admin/pages/Slideshow";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import VerifyEmailOTP from "./pages/VerifyEmailOTP";
import EditSlideshow from "./admin/pages/EditSlideshow";
import ContactUs from "./pages/ContactUs";
import SiteProfile from "./admin/pages/SiteProfile";
import FooterSetting from "./admin/pages/FooterSetting";
import Orders from "./pages/Order";
import OrderDetails from "./pages/OrderDetail";
import UserProfile from './pages/SiteProfile';
import Chat from './admin/chat/Chat'
import Customer from "./admin/pages/Customer";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import VerifyChangePasswordOTP from "./pages/VerifyChangePasswordOTP";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<>404 Not Found</>}></Route>
        {/* admin route */}
        <Route path="/admin/login" element={<AdminLogin />}/>
        <Route path="/admin" element={<Admin />}>
          <Route path="orders" element={<Order />}/>
          <Route path="orderdetails/:orderID" element={<OrderDetail />}/>
          <Route path="add_customer" element={<OrderDetail />}/>
          <Route path="show_customer" element={<Customer />}/>
          <Route path="add_category" element={<AddCategory />}/>
          <Route path="show_category" element={<Category />}/>
          <Route path="subcategory/:id/:title" element={<SubCategory />}/>
          <Route path="edit_maincategory/:id" element={<EditMainCategory />} />
          <Route path="edit_subcategory/:id" element={<EditSubCategory />} />
          <Route path="add_product" element={<AddProduct />}/>
          <Route path="show_product" element={<Product />}/>
          <Route path="edit_product/:id" element={<EditProduct />}/>
          <Route path="add_slideshow" element={<AddSlideshow />}/>
          <Route path="show_slideshow" element={<Slideshow />}/>
          <Route path="edit_slideshow/:id" element={<EditSlideshow />}/>
          <Route path="site_profile" element={<SiteProfile />}/>
          <Route path="footer" element={<FooterSetting />}/>
          <Route path="chat" element={<Chat />}/>
        </Route>

        {/* public route */}
        <Route path="/" element={<Public/>}>
          <Route path="product" element={<ProductList />} />
          <Route path="productdetails" element={<ProductDetails />}/>
          <Route path="productcategory/:subId/:subName" element={<ProductCategory />}/>
          <Route path="cart" element={<Cart />} />
          <Route path="shippinginfo" element={<ShippingInfo />}/>
          <Route path="checkout" element={<Checkout />}/>
          <Route path="wishlist" element={<Wishlist />}/>
          <Route path="about_us" element={<AboutUs />}/>
          <Route path="contact_us" element={<ContactUs />}/>
          <Route path="order" element={<Orders />}/>
          <Route path="orderdetails/:orderID" element={<OrderDetails />}/>
          <Route path="userprofile" element={<UserProfile />}/>
        </Route>

        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/verifyemail" element={<VerifyEmailOTP />}/>
        <Route path="/resetpassword" element={<ResetPassword />}/>
        <Route path="/newpassword" element={<NewPassword />}/>
        <Route path="/verifychangepassword" element={<VerifyChangePasswordOTP />}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App;
