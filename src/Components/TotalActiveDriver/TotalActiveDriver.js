import React from "react";
import "./TotalActiveDriver.css";
import { useNavigate } from "react-router-dom";
import { percentIncDec } from "../../helperfuntions/percentIncDec";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState } from "react";
import { useEffect } from "react";

const TotalActiveDriver = () => {
  const [TodayActiveDrivers, setTodayActiveDrivers] = useState(null);
  const [yesActiveDrivers, setYesActiveDrivers] = useState(null);
  const [DBYActiveDrivers, setDBYActiveDrivers] = useState(null);
  const [totalActiveDriver, setTotalActiveDriver] = useState(null);
  const token = sessionStorage.getItem("adminToken");
  const getTodayActiveDriver = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}/admin/getTodayAllActiveDriver`, {
        headers: {
          token,
        },
      });
      setTodayActiveDrivers(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getYesActiveDriver = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllYesterdayActiveDriver`,
        {
          headers: {
            token,
          },
        }
      );
      setYesActiveDrivers(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getDBYActiveDriver = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllActiveDriverBeforeYesterday`,
        {
          headers: {
            token,
          },
        }
      );
      setDBYActiveDrivers(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllActiveDriverBeforeThreeDay = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllActiveDriverBeforeThreeDay`,
        {
          headers: {
            token,
          },
        }
      );
      setTotalActiveDriver(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  useEffect(()=>{

    const intervalId = setInterval(() => {

      getAllActiveDriverBeforeThreeDay();
      getDBYActiveDriver();
      getYesActiveDriver();
      getTodayActiveDriver();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));
  
    return () => clearInterval(intervalId);
  },[])


  return (
    <div className="TotalActiveDriver_container main">
      <h1
        onClick={() => {
          navigate("/Dashboard/ActiveDriverDetail");
        }}
      >
        Total Active Driver : 4000
      </h1>
      <div className="boxMain_container">
        <div
          onClick={() => {
            navigate("/Dashboard/TodayActiveDrivers");
          }}
          className="box_main"
        >
          <h1>{TodayActiveDrivers?.length || 0}</h1>
          Today
        </div>
        <div
          className="box_main"
          onClick={() => {
            navigate("/Dashboard/yesActiveDrivers");
          }}
        >
          <h1>{yesActiveDrivers?.length || 0}</h1>
          Yesterday
        </div>
        <div
          className="box_main"
          onClick={() => {
            navigate("/Dashboard/DBYActive");
          }}
        >
          <h1>{DBYActiveDrivers?.length || 0}</h1>
          Day Before Yesterday
        </div>
        <div
          className="box_main"
          onClick={() => {
            navigate("/Dashboard/ActiveDriverDetail");
          }}
        >
          <h1>{totalActiveDriver?.length || 0}</h1>
          Total
        </div>
      </div>
    </div>
  );
};

export default TotalActiveDriver;
