import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import ProductList from "../components/products/ProductList";
import ProductView from "../components/products/ProductView";
import ProductViewDetails from "../components/products/ProductViewDetails";
import Forum from "../components/products/Forum";
import Technicians from "../components/products/Technicians";
import OrderSummary from "../components/products/OrderSummary";
import Distributors from "../components/products/Distributors";
import DistributorsViewDetails from "../components/products/DistributorsViewDetails";
import Transport from "../components/products/Transport";
import "../pages/Dashboard.css";

export default function Dashboard() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);


  const navigate = useNavigate();
  const LoggedUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // Update screen width when window is resized
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!LoggedUser || LoggedUser.isadmin !== true) {
      navigate("/Auth/login"); // Redirect if not logged in or not an admin
    }
  }, [LoggedUser, navigate]);

  if (!LoggedUser || LoggedUser.isadmin !== true) {
    return null; // Prevent rendering if navigating away
  }

  return (
    <>
      <div className="container-fluid d-flex p-0">
       {
        screenWidth > 768 ? (
          <div>
            <AdminSidebar/>
            </div>) : (
                <div></div>
            )
       }
        <div className="sideNav d-flex flex-column">
          <AdminNavbar />
          <main className="content-area flex-grow-1 p-4">
            <Routes>
              <Route path="products" element={<ProductList />} />
              <Route path="products/productView" element={<ProductView />} />
              <Route
                path="products/productViewDetails/:id"
                element={<ProductViewDetails />}
              />
              <Route path="forum" element={<Forum />} />
              <Route path="distributors" element={<Distributors />} />
              <Route path="Distributors/DistributorsViewDetails/:id" element={<DistributorsViewDetails />} />
              <Route path="technicians" element={<Technicians />} />
              <Route path="Transport" element={<Transport />} />
              <Route path="OrderSummary" element={<OrderSummary />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
