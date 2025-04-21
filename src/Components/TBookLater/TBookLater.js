import React from "react";
import "./TBookLater.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TBookLater = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  const [TodayBookLater, setTodayBookLater] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/todayBookingsBOOKLATER`, {
        headers: {
          token,
        },
      });
      setTodayBookLater(res?.data);
      console.log(res,"this is error cause")
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  return (
    <div className="TBookLater_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Today Booking Count Book Later </h1>
        <div className="boxMain_container">
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Total");
              navigate("/DashBoard/TodayBookLater");
            }}
          >
            <h1>{TodayBookLater?.totalBookings}</h1>
            Total Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Accepted");
              navigate("/DashBoard/TodayBookLater");
            }}
          >
            {/* <h1>{TodayBookLater?.startedBookings?.count}</h1> */}
            <h1>{TodayBookLater?.startedBookings?.count}</h1>

            Accepted booking
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Completed");
              navigate("/DashBoard/TodayBookLater");
            }}
          >
            {/* <h1>{TodayBookLater?.completedBookings?.count}</h1> */}
            <h1>{TodayBookLater?.completedBookings?.count?.length || 0}</h1>
            Complete
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Pending");
              navigate("/DashBoard/TodayBookLater");
            }}
          >
            {/* <h1>{TodayBookLater?.pendingBookings?.count}</h1> */}
            <h1>{TodayBookLater?.pendingBookings?.count?.length}</h1>

            Pending
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Cancelled");
              navigate("/DashBoard/TodayBookLater");
            }}
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            {/* <h1>{TodayBookLater?.canceledBookings?.count}</h1> */}
            <h1>{TodayBookLater?.canceledBookings?.count?.length}</h1>

            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default TBookLater;