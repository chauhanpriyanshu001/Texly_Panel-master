import React, { useContext } from "react";
import "./OnlineUser.css";
import Button from "@mui/material/Button";
import SimpleLineChart from "../CustomCharts/SimpleLineChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../variable";
import { useNavigate } from "react-router-dom";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastRoundedIcon from "@mui/icons-material/SouthEastRounded";
import TodayActiveUsers from "../TodayActiveUsers/TodayActiveUsers";

const OnlineUser = () => {
  const [todayActive, setTodayActive] = useState(null);
  const [yesterdayActive, setYesterdayActive] = useState(null);
  const [dayBefYesActive, setDayBefYesActive] = useState(null);
  const [totalActiveUser, setTotalActiveUser] = useState(null)
  const [yesInc, setYesInc] = useState(0);
  const [todayInc, setTodayInc] = useState(0);
  const navigate = useNavigate();
  
  //api function
  const apiCalls = async () => {
    const token=sessionStorage.getItem("adminToken")
    try {
      const res1 = await axios.get(
        `${BASE_URL}/admin/getAllActiveUserBeforeYesterday`,{
          headers:{
            token
          }
        }
      );
      setDayBefYesActive(res1.data);
      const res2 = await axios.get(
        `${BASE_URL}/admin/getAllYesterdayActiveUser`,{
          headers:{
            token
          }
        }
      );
      setYesterdayActive(res2.data);
      const res3 = await axios.get(`${BASE_URL}/admin/getTodayAllActiveUser`,{
        headers:{
          token
        }
      });
      
      const res4 = await axios.get(`${BASE_URL}/admin/getAllActiveUserBeforeThreeDay`,{
        headers:{
          token
        }
      });
      setTotalActiveUser(res4.data?.count)
      setTodayActive(res3.data);
      todayIncCalc(res3.data, res2.data);
      yesterdayIncCalc(res2.data, res1.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    {
      name: "DayBeforeYesterday",
      value: dayBefYesActive ? dayBefYesActive?.result?.length : 0,
    },
    {
      name: "Yesterday",
      value: yesterdayActive ? yesterdayActive?.result?.length : 0,
    },
    {
      name: "Today",
      value: todayActive ? todayActive?.result?.length : 404,
    },
  ];
  //CAalculation function
  function yesterdayIncCalc(YesActive, DBYActive) {
    const increament = Math.abs(
      DBYActive?.result.length - YesActive?.result.length
    );
    if (DBYActive?.result.length === 0) {
      setYesInc("N/A");
    } else {
      const caclVal1 = (increament * 100) / DBYActive?.result.length;
      const caclVal = caclVal1.toFixed(1);

      setYesInc(caclVal);
    }
  }
  //CAalculation function
  function todayIncCalc(today, yesterday) {
    const increament = Math.abs(
      yesterday?.result.length - today?.result.length
    );
    if (yesterday?.result.length === 0) {
      setTodayInc("N/A");
    } else {
      const caclVal1 = (increament * 100) / yesterday?.result.length;
      const caclVal = caclVal1.toFixed(1);
      setTodayInc(caclVal);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
    },parseInt(process.env.REACT_APP_REFRESH_TIME,10));
    apiCalls();

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="OnlineUser_container">
      <h1>Total Active Users</h1>
      <h1>Total Today Active User : {todayActive?.result?.length}</h1>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        sx={{
          height: 60,
        }}
        onClick={() => {
          apiCalls();
        }}
        style={{
          backgroundColor: "var(--dark)",
        }}
      >
        Refresh
      </Button>

      <div className="OnlineUser_chartContainer">
        <SimpleLineChart chartData={chartData} />
      </div>
      <div className="onlineUser_box2">
        <div
          onClick={() => {
            navigate("/DashBoard/todayActiveUser");
          }}
          className="box_main"
        >
          <h1 className="box_IncDec_align">
            {todayActive ? todayActive.result.length : "0"}
            {todayActive?.result?.length > yesterdayActive?.result?.length ? (
              <small style={{ color: "green" }}>{todayInc} %</small>
            ) : (
              <small style={{ color: "rgba(255, 0, 0)" }}>{todayInc}%</small>
            )}
            <div>
              {todayActive?.result?.length >=
              yesterdayActive?.result?.length ? (
                <span className="inc_green">
                  <NorthEastIcon />
                </span>
              ) : (
                <span className="dec_red">
                  <SouthEastRoundedIcon />
                </span>
              )}
            </div>
          </h1>
          Today
        </div>{" "}
        <div
          onClick={() => {
            navigate("/DashBoard/yesterdayActiveUsers");
          }}
          className="box_main"
        >
          <h1 className="box_IncDec_align">
            {yesterdayActive ? yesterdayActive.result.length : "0"}
            {yesterdayActive?.result?.length >
            dayBefYesActive?.result?.length ? (
              <small style={{ color: "green" }}>{yesInc} %</small>
            ) : (
              <small style={{ color: "rgba(255, 0, 0)" }}>{yesInc}%</small>
            )}
            <div>
              {yesterdayActive?.result?.length >=
              dayBefYesActive?.result?.length ? (
                <span className="inc_green">
                  <NorthEastIcon />
                </span>
              ) : (
                <span className="dec_red">
                  <SouthEastRoundedIcon />
                </span>
              )}
            </div>
          </h1>
          Yesterday
        </div>
        <div
          className="box_main"
          onClick={() => {
            navigate("/DashBoard/dayBeforeYesterdayActiveUser");
          }}
        >
          <h1>{dayBefYesActive ? dayBefYesActive.result.length : "0"}</h1>
          Day before yesterday
        </div>
        <div className="box_main"
        onClick={()=>{
          navigate("/DashBoard/TotalActiveUser")
        }}
        >
          <h1>{totalActiveUser}</h1>
          Total
        </div>
      </div>
    </div>
  );
};

export default OnlineUser;
