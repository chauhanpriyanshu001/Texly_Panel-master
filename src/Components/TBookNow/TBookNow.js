import React from "react";
import "./TBookNow.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const TBookNow = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");
  const [todayBookNow, setTodayBookNow] = useState({});
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/todayBookingsBOOKNOW`, {
        headers: {
          token,
        },
      });
      setTodayBookNow(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      getTodayBookNow();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));
    //don't forget
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="TBookNow_container ">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Today Booking Count For Book Now </h1>
        <div className="boxMain_container">
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Total");
              navigate("/DashBoard/TodayBookNowRides");
            }}
          >
            <h1>{todayBookNow?.totalBookings}</h1>
            Total Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Accepted");
              navigate("/DashBoard/TodayBookNowRides");
            }}
          >
            <h1>{todayBookNow?.startedBookings?.count}</h1>
            Accepted booking
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Completed");
              navigate("/DashBoard/TodayBookNowRides");
            }}
          >
            <h1>{todayBookNow?.completedBookings?.count}</h1>
            Complete
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Pending");
              navigate("/DashBoard/TodayBookNowRides");
            }}
          >
            <h1>{todayBookNow?.pendingBookings?.count}</h1>
            Pending
          </div>
          <div
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
            onClick={() => {
              sessionStorage.setItem("BookNowTodayValue", "Cancelled");
              navigate("/DashBoard/TodayBookNowRides");
            }}
          >
            <h1>{todayBookNow?.canceledBookings?.count}</h1>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default TBookNow;
