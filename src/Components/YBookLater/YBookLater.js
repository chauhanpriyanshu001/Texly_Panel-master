import React from "react";
import "./YBookLater.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const YBookLater = () => {
  const navigate=useNavigate()
  const token = sessionStorage.getItem("adminToken");

  const [YBookLater, setYBookLater] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/yesterdayBookingsBOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );
      setYBookLater(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  return (
    <div className="YBookLater_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Yesterday Booking Count Book Later </h1>
        <div className="boxMain_container">

      <div
        onClick={() => {
          sessionStorage.setItem("BookLaterTodayValue", "Total");
          navigate("/DashBoard/YesterDayBooLater");
        }}
        className="box_main"
      >
        <h1>{YBookLater?.totalBookings}</h1>
        Total Rides
      </div>
      <div
        onClick={() => {
          sessionStorage.setItem("BookLaterTodayValue", "Accepted");
          navigate("/DashBoard/YesterDayBooLater");
        }}
        className="box_main"
      >
        <h1>{YBookLater?.startedBookings?.count}</h1>
        Accepted booking
      </div>
      <div
        onClick={() => {
          sessionStorage.setItem("BookLaterTodayValue", "Completed");
          navigate("/DashBoard/YesterDayBooLater");
        }}
        className="box_main"
      >
        <h1>{YBookLater?.completedBookings?.count}</h1>
        Complete
      </div>
      <div
        onClick={() => {
          sessionStorage.setItem("BookLaterTodayValue", "Pending");
          navigate("/DashBoard/YesterDayBooLater");
        }}
        className="box_main"
      >
        <h1>{YBookLater?.pendingBookings?.count}</h1>
        Pending
      </div>
      <div
        onClick={() => {
          sessionStorage.setItem("BookLaterTodayValue", "Cancelled");
          navigate("/DashBoard/YesterDayBooLater");
        }}
        className="box_main"
        style={{
          boxShadow: "var(--redBoxShadow)",
        }}
      >
        <h1>{YBookLater?.canceledBookings?.count}</h1>
        Cancel
      </div>
      </div>
      </div>
    </div>
  );
};

export default YBookLater;
