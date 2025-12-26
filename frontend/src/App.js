import React from "react";

import BookingPage from "./AgencyManagementSys/BookingPage";


import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wishlist from "./nav-homepage/wishlist";
import Cart from "./nav-homepage/cart";

import Login from "./sighup_login/Login";
import IndividualRegister from "./sighup_login/IndividualRegister";
import TravelAgencyRegister from "./sighup_login/TravelAgencyRegister";

import AgencyDashboard from "./AgencyManagementSys/AgencyDashboard";
import UserPackages from "./UserPackages";

import ProtectedAgency from "./AgencyManagementSys/ProtectedAgency";

import PublicLayout from "./layouts/PublicLayout.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./layouts/Home";
import BookingSucess from "./AgencyManagementSys/BookingSucess";

import AgencyBookings from "./AgencyManagementSys/AgencyBookings";

const role = localStorage.getItem("role");

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route>
        <Route element={<PublicLayout />}>
        <Route index element={<Home/>}/>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bookings-details" element={<Cart />} />
          

          <Route path="/booking" element={<BookingPage/>}/>
          
           <Route path="/packages" element={<UserPackages />} />

         
        </Route>

     

            {role !== "user" && (
  <>
    <Route 
      path="/agencydashboard" 
      element={<ProtectedAgency><AgencyDashboard /></ProtectedAgency>} 
    />
    <Route 
      path="/bookings" 
      element={<ProtectedAgency><AgencyBookings /></ProtectedAgency>} 
    />
  </>
)}

    
          <Route>

             <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<IndividualRegister />} />
          <Route path="/register/agency" element={<TravelAgencyRegister />} />
          <Route path="/bookingsucess" element={<BookingSucess/>}/>
         



          </Route>
          </Route>

      </Routes>
    


      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
