import React from "react";
import "./DBYBookNow.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const DBYBookNow = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  const [DBYBookNow, setDBYBookNow] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/beforeYesterdayBookingsBOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );
      setDBYBookNow(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  return (
    <div className="DBYBookNow_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Day before Yesterday Booking Count Book Now </h1>
        <div className="boxMain_container">
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowDBYValue", "Total");
              navigate("/DashBoard/DayBeforeYesterdayBookNow");
            }}
            className="box_main"
          >
            <h1>{DBYBookNow?.totalBookings}</h1>
            Total Rides
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowDBYValue", "Accepted");
              navigate("/DashBoard/DayBeforeYesterdayBookNow");
            }}
            className="box_main"
          >
            <h1>{DBYBookNow?.startedBookings?.count}</h1>
            Accepted booking
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowDBYValue", "Completed");
              navigate("/DashBoard/DayBeforeYesterdayBookNow");
            }}
            className="box_main"
          >
            <h1>{DBYBookNow?.completedBookings?.count}</h1>
            Complete
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowDBYValue", "Pending");
              navigate("/DashBoard/DayBeforeYesterdayBookNow");
            }}
            className="box_main"
          >
            <h1>{DBYBookNow?.pendingBookings?.count}</h1>
            Pending
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("BookNowDBYValue", "Cancelled");
              navigate("/DashBoard/DayBeforeYesterdayBookNow");
            }}
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>{DBYBookNow?.canceledBookings?.count}</h1>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBYBookNow;
