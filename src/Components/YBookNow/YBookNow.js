import React from "react";
import "./YBookNow.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const YBookNow = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");
  const [yesBookNow, setYesBookNow] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/yesterdayBookingsBOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );
      setYesBookNow(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  return (
    <div className="YBookNow_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Yesterday booking Count Book Now </h1>
        <div className="boxMain_container">
          {" "}
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowYesValue", "Total");
              navigate("/DashBoard/YesterDayBookNow");
            }}
          >
            <h1>{yesBookNow?.totalBookings}</h1>
            Total Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowYesValue", "Accepted");
              navigate("/DashBoard/YesterDayBookNow");
            }}
          >
            <h1>{yesBookNow?.startedBookings?.count}</h1>
            Accepted booking
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowYesValue", "Completed");
              navigate("/DashBoard/YesterDayBookNow");
            }}
            className="box_main"
          >
            <h1>{yesBookNow?.completedBookings?.count}</h1>
            Complete
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowYesValue", "Pending");
              navigate("/DashBoard/YesterDayBookNow");
            }}
            className="box_main"
          >
            <h1>{yesBookNow?.pendingBookings?.count}</h1>
            Pending
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowYesValue", "Cancelled");
              navigate("/DashBoard/YesterDayBookNow");
            }}
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>{yesBookNow?.canceledBookings?.count}</h1>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default YBookNow;
