import React from 'react'
import { LoginContext } from '../Context'
import { useContext } from 'react'
import {  Route, Navigate } from 'react-router-dom';
const ProtectedRoute = ({children  }) => {
    const { loginStatus} = useContext(LoginContext);
   
     return loginStatus ? children  : <Navigate to="/Adminlogin" />
}

export default ProtectedRoute