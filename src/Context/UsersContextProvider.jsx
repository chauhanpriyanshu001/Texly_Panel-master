import React from "react";
import { useState, useEffect } from "react";
import { UsersContext } from ".";
import axios from "axios";
import BASE_URL from "../variable";

const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [scrollDashboard, setScrollDashboard] = useState(0)
  return (
    <UsersContext.Provider value={{ users, setUsers,scrollDashboard,setScrollDashboard }}>
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContextProvider;
