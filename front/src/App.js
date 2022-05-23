import React,{ useEffect } from "react";
import "./App.css";
import HomePage from "./HomeComponents/HomePage";
import { Route, Routes } from "react-router-dom";
// import SignUp from "./SellerComponents/Auth/SignUp_Manufacturer";
// import Login from "./SellerComponents/Auth/Login_Manufacturer";
// import ForgotPassword from "./SellerComponents/Auth/ForgotPassword";

// SELLER IMPORTS
import SellerHomePage from "./SellerComponents/Manf_Instance_Handler/InstanceHandler";
import SignUp_Manufacturer from "./SellerComponents/Auth/SignUp_Manufacturer";
import Login_Manufacturer from "./SellerComponents/Auth/Login_Manufacturer";
import ForgotPass_Manufacturer from "./SellerComponents/Auth/ForgotPass_Manufacturer";
import AddProductsMain from "./SellerComponents/AddProducts/AddProductsMain";
import InstanceHandler from "./SellerComponents/Manf_Instance_Handler/InstanceHandler";



function App() {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Routes>
        {/* Basic Paths  */}
        <Route exact path="/" element={<HomePage />} />
        
        {/* Auth Paths */}
        {/* <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        {/* Seller Pages */}

        <Route path="/seller/sign-up" element={<SignUp_Manufacturer />} />
        <Route path="/seller/login" element={<Login_Manufacturer/>}/>
        <Route path="/seller/forgot-password" element={<ForgotPass_Manufacturer/>}/>

        <Route exact path="/:username/profile" element={<InstanceHandler/>}/>
        <Route exact path="/:username/add-products" element={<AddProductsMain/>}/>


      </Routes>
    </>
  );
}

export default App;
