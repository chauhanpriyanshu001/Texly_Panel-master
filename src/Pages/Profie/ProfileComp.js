import React from "react";
import { useState } from "react";
import "./Profile.css";
import { Button } from "@mui/material";
import axios from "axios";
import BASE_URL from "../../variable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProfileComp = () => {
  const [popperState, setPopperState] = useState(false);
  const [admin, setAdmin] = useState(null);
  const handleClick = () => {
    setPopperState(!popperState);
  };
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.post(`${BASE_URL}/admin/adminLogout`, {}, {
        headers: {
          token
        },
      });
      sessionStorage.removeItem("adminToken");
      navigate("/Adminlogin");
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminProfile = async () => {
    const token = sessionStorage.getItem("adminToken");
    console.log(token)
    try {
      const res = await axios.get(`${BASE_URL}/admin/viewProfile`, {
        headers: {
          token,
        },
      });
      setAdmin(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminProfile();
  }, []);
  return (
    <div className="ProfileComp_container"
      onClick={handleClick}
    >
      <img src={admin?.profilePic} alt="" />
      <div className="ProfileComp_container_box">
        <h5>+91 {admin?.mobileNumber}</h5>
        <h5>{admin?.name}...</h5>
      </div>
      <div
        className="ProfileComp_popper "
        style={{
          display: popperState ? "flex" : "none",
          transform: popperState ? "scaleY(1)" : "scaleY(0)",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleClick();
            navigate("/profile");
          }}
        >
          View Profile
        </Button>
        <Button variant="contained" onClick={logoutHandler} color="error">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileComp;
