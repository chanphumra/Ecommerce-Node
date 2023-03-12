import React from "react"
import { Routes, Route, Outlet} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import Product from "../pages/Product";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import Category from "../pages/Category";
import OrderDetail from "../pages/OrderDetail";

const Content = () => {
    let page_name = new URLSearchParams(useLocation().search).get('page_name') || "dashboard";

    return (
        <div className="lg:ml-[250px]">
            {page_name === "dashboard" ? <Dashboard /> : <Outlet />}
        </div>
    )
}

export default Content;