import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import BASE_URL from "../../variable";
const TFreight = () => {
  const navigate= useNavigate();
  const token =sessionStorage.getItem("adminToken");
  const [TodayBookLater, setTodayBookLater] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/todayBookingsFreight `, {
        headers: {
          token,
        },
      });
      setTodayBookLater(res?.data);
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
        <h1>Today  Count For Freight </h1>
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
            <h1>{TodayBookLater?.completedBookings?.count}</h1>
            Complete
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookLaterTodayValue", "Pending");
              navigate("/DashBoard/TodayBookLater");
            }}
          >
            <h1>{TodayBookLater?.pendingBookings?.count}</h1>
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
            <h1>{TodayBookLater?.canceledBookings?.count}</h1>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default TFreight;
