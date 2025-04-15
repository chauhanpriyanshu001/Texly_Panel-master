// import React from 'react'
// import { LoginContext } from '../Context'
// import { useContext } from 'react'
// import {  Route, Navigate } from 'react-router-dom';
// const ProtectedRoute = ({children  }) => {
//     const { loginStatus} = useContext(LoginContext);
   
//      return loginStatus ? children  : <Navigate to="/Adminlogin" />
// }

// export default ProtectedRoute

import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../Context"; // Changed from default import to named import

const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useContext(LoginContext);
  const location = useLocation();
  const userType = sessionStorage.getItem("userType");
  
  // Check if user is logged in
  if (!loginStatus) {
    return <Navigate to="/Adminlogin" />;
  }
  
  // For SUPPORT users, only allow access to /contactus
  if (userType === "SUPPORT") {
    // If path is exactly /contactus, allow access
    if (location.pathname === "/contactus" || location.pathname === "/profile") {
      return children;
    } 
    // For any other path, redirect to /contactus
    else {
      return <Navigate to="/contactus" />;
    }
  }
  
  // For ADMIN users, allow access to all routes
  return children;
};

export default ProtectedRoute;