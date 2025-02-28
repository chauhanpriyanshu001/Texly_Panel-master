import React from "react";
import "./DBYBookLater.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DBYBookLater = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");
  const [DBYBookLater, setDBYBookLater] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/beforeYesterdayBookingsBOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );
      setDBYBookLater(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  return (
    <div className="DBYBookLater_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Day before Yesterday Booking Count Book Later </h1>
        <div className="boxMain_container">
          <div
            onClick={() => {
              sessionStorage.setItem("BookLaterDBYValue", "Total");
              navigate("/DashBoard/DayBeforeYesterdayBookLater");
            }}
            className="box_main"
          >
            <h1>{DBYBookLater?.totalBookings}</h1>
            Total Rides
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Accepted");
              navigate("/DashBoard/DayBeforeYesterdayBookLater");
            }}
            className="box_main"
          >
            <h1>{DBYBookLater?.startedBookings?.count}</h1>
            Accepted booking
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Completed");
              navigate("/DashBoard/DayBeforeYesterdayBookLater");
            }}
            className="box_main"
          >
            <h1>{DBYBookLater?.completedBookings?.count}</h1>
            Complete
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Pending");
              navigate("/DashBoard/DayBeforeYesterdayBookLater");
            }}
            className="box_main"
          >
            <h1>{DBYBookLater?.pendingBookings?.count}</h1>
            Pending
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Cancelled");
              navigate("/DashBoard/DayBeforeYesterdayBookLater");
            }}
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>{DBYBookLater?.canceledBookings?.count}</h1>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBYBookLater;
