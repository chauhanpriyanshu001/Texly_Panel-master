import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Driver.css";
import DriveEtaRoundedIcon from "@mui/icons-material/DriveEtaRounded";
import CustomPieChart from "../CustomPiechart";
import TinyLineChart from "../CustomCharts/TinyLineChart";
import { UsersContext } from "../../Context";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import image2 from "../../Assets/backgroundImg/backImage26.png";
import PersonIcon from "@mui/icons-material/Person";
import Person3 from "@mui/icons-material/Person3";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookIcon from "@mui/icons-material/Book";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Done, DoneAll } from "@material-ui/icons";

const Driver = () => {
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [onlineDriver, setOnlineDriver] = useState(0);
  const [bookNow, setBookNow] = useState({
    total: 0,
    accepted: 0,
    complete: 0,
    pending: 0,
    cancelled: 0,
  });
  const [bookLater, setBookLater] = useState({
    total: 0,
    accepted: 0,
    complete: 0,
    pending: 0,
    cancelled: 0,
  });
  const [freight, setFreight] = useState({
    total: 0,
    accepted: 0,
    complete: 0,
    pending: 0,
    cancelled: 0,
  });
  const [users, setUsers] = useState(0);
  const token = sessionStorage.getItem("adminToken");
  //vehicle get function

  async function getAllvehicle() {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllVehicle`, {
        headers: {
          token,
        },
      });
      const filterData = res?.data?.result?.filter(
        (item) => item.deleteStatus === false
      );
      setVehicleCount(filterData?.length);

      // setAllVehicle(filterData);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllOnlineDriver() {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getOnlineDriver`, {
        headers: {
          token,
        },
      });
      setOnlineDriver(res?.data?.result?.length);
    } catch (error) {
      console.log(error);
    }
  }
  const getTotalBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=&bookingType=BOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );
      const resPending = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=PENDING&BookingStatus=&bookingType=BOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );

      const resCancelled = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=CANCELLED&bookingType=BOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );

      const resComplete = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=COMPLETED&BookingStatus=&bookingType=BOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );

      const resAccepted = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=STARTED&BookingStatus=&bookingType=BOOKNOW`,
        {
          headers: {
            token,
          },
        }
      );

      setBookNow(() => ({
        total: res?.data?.count,
        accepted: resAccepted?.data?.count,
        complete: resComplete?.data?.count,
        pending: resPending?.data?.count,
        cancelled: resCancelled?.data?.count,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalBookLater = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );
      const resPending = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=PENDING&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resCancelled = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=CANCELLED&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resComplete = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=COMPLETED&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resAccepted = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=STARTED&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      setBookLater(() => ({
        total: res?.data?.count,
        accepted: resAccepted?.data?.count,
        complete: resComplete?.data?.count,
        pending: resPending?.data?.count,
        cancelled: resCancelled?.data?.count,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalFreight = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );
      const resPending = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=PENDING&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resCancelled = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=&BookingStatus=CANCELLED&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resComplete = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=COMPLETED&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      const resAccepted = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=&rideStatus=STARTED&BookingStatus=&bookingType=BOOKLATER`,
        {
          headers: {
            token,
          },
        }
      );

      setBookLater(() => ({
        total: res?.data?.count,
        accepted: resAccepted?.data?.count,
        complete: resComplete?.data?.count,
        pending: resPending?.data?.count,
        cancelled: resCancelled?.data?.count,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDriver = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllDriver`, {
        headers: {
          token,
        },
      });
      setDriverCount(res.data?.Total_Driver_Count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllvehicle();
      getAllDriver();
      getAllOnlineDriver();
      getTotalBookNow();
      getTotalBookLater();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));

    return () => clearInterval(intervalId);
  }, []);
  const GetAllUser = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllUserAndSearchFilter`,
        {
          headers: {
            token,
          },
        }
      );
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log({ error, message: "error in api.js" });
    }
  };
  useEffect(() => {
    getAllvehicle();
    getAllDriver();
    getAllOnlineDriver();
    getTotalBookNow();
    getTotalBookLater();
    GetAllUser();
  }, []);
  const images = {
    topImage: `url(${image2})`,
  };
  return (
    <div className="Driver_container">
      <div
        className="Driver_piechart_container backImage"

        // style={{
        //   backgroundImage: images.topImage,
        //   backgroundPosition:"center"
        //   ,
        // }}
      >
        <div className="Driver_TinyLineChart_container backImage">
          <TinyLineChart />
          Total driver
        </div>
        <CustomPieChart />
      </div>
      {/* {object1?.map((item, idx) => {
          return <DriverComp key={idx} item={item} />;
        })} */}
      <div className="boxMain_container">
        <div
          className="box_main "
          onClick={() => {
            navigate("/TrackDriver");
          }}
        >
          <h1>
            <LocationOnIcon />
            {onlineDriver}
          </h1>
          Track Driver
        </div>
        <div
          className="box_main "
          onClick={() => {
            navigate("/DriverManagement");
          }}
        >
          <h1>
            <Person3 />
            {driverCount}
          </h1>
          Total Driver
        </div>
        <div
          className="box_main backImage"
          onClick={() => {
            navigate("/DriverManagement");
          }}
        >
          <h1>
            <Person3 />
            {driverCount}
          </h1>
          Registered Driver
        </div>
        <div
          className="box_main"
          onClick={() => {
            navigate("/DashBoard/TotalUser");
          }}
        >
          <h1>
            <PersonIcon />
            {users?.Total_User_Count || 0}
          </h1>
          Total User
        </div>
        <div
          onClick={() => {
            navigate("/VehicleManagement");
          }}
          className="box_main"
        >
          <h1>
            <LocalTaxiIcon />
            {vehicleCount}
          </h1>
          Total Vehicle
        </div>
        <div
          onClick={() => {
            navigate("/VehicleManagement");
          }}
          className="box_main"
        >
          <h1>
            <CurrencyRupeeIcon />
            4000
          </h1>
          Total Commision Book Now
        </div>
        <div
          onClick={() => {
            navigate("/VehicleManagement");
          }}
          className="box_main"
        >
          <h1>
            <CurrencyRupeeIcon />
            6000
          </h1>
          Total Commision Book Later
        </div>
        <div
          onClick={() => {
            navigate("/VehicleManagement");
          }}
          className="box_main"
        >
          <h1>
            <CurrencyRupeeIcon />
            2000
          </h1>
          Total Commision Freight
        </div>
        <div
          onClick={() => {
            navigate("/VehicleManagement");
          }}
          className="box_main"
        >
          <h1>
            <CurrencyRupeeIcon />
            12000
          </h1>
          Total Commision
        </div>
      </div>

      <br />
      <div className="Book_now_top_container">
        <h2>Book Now Rides </h2>
        <div
          style={{
            marginTop: "4vw",
          }}
          className="boxMain_container"
        >
          <div
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKNOW");
              sessionStorage.removeItem("BookingStatus");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
            className="box_main"
          >
            <h1>
              <DirectionsCarIcon />
              {bookNow.total}
            </h1>
            Total Book Now Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKNOW");
              sessionStorage.setItem("rideStatus", "STARTED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DirectionsCarIcon />
              {bookNow.accepted}
            </h1>
            Total Book Now Accepted Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKNOW");
              sessionStorage.setItem("rideStatus", "COMPLETED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DoneAllIcon />
              {bookNow.complete}
            </h1>
            Total Book Now Complete Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKNOW");
              sessionStorage.setItem("rideStatus", "PENDING");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <AccessTimeOutlinedIcon />
              {bookNow.pending}
            </h1>
            Total Book Now Pending Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKNOW");
              sessionStorage.setItem("BookingStatus", "CANCELLED");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>
              <CancelIcon />
              {bookNow.cancelled}
            </h1>
            Total Book Now Cancel Rides
          </div>
        </div>
      </div>
      <div className="Book_now_top_container">
        <h2>Book Later Rides</h2>
        <div className="boxMain_container">
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKLATER");
              sessionStorage.removeItem("BookingStatus");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DirectionsCarIcon />
              {bookLater.total}
            </h1>
            Total Book Later Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKLATER");
              sessionStorage.setItem("rideStatus", "STARTED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DirectionsCarIcon />
              {bookLater.accepted}
            </h1>
            Total Book Later Accepted Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKLATER");
              sessionStorage.setItem("rideStatus", "COMPLETED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DoneAllIcon />
              {bookLater.complete}
            </h1>
            Total Book Later Complete Rides
          </div>
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKLATER");
              sessionStorage.setItem("rideStatus", "PENDING");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <AccessTimeOutlinedIcon />
              {bookLater.pending}
            </h1>
            Total Book Later Pending Rides
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("bookingType", "BOOKLATER");
              sessionStorage.setItem("BookingStatus", "CANCELLED");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
            className="box_main"
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>
              <CancelIcon />
              {bookLater.cancelled}
            </h1>
            Total Book Later Cancelled Rides
          </div>
        </div>
      </div>
      <div className="Book_now_top_container">
        <h2>Frieght Rides</h2>
        <div className="boxMain_container">
          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "FREIGHT");
              sessionStorage.removeItem("BookingStatus");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DirectionsCarIcon />
              16
            </h1>
            Total Freight Rides
          </div>
          <div
            onClick={() => {
              sessionStorage.setItem("bookingType", "FREIGHT");
              sessionStorage.setItem("rideStatus", "STARTED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
            className="box_main"
          >
            <h1>
              <DirectionsCarIcon />
              12
            </h1>
            Total Freight Accepted Rides
          </div>

          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "FREIGHT");
              sessionStorage.setItem("rideStatus", "COMPLETED");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
          >
            <h1>
              <DoneAllIcon />
              11
            </h1>
            Total Freight Completed Booking
          </div>

          <div
            onClick={() => {
              sessionStorage.setItem("bookingType", "FREIGHT");
              sessionStorage.setItem("rideStatus", "PENDING");
              sessionStorage.removeItem("BookingStatus");
              navigate("/BookingManagement");
            }}
            className="box_main"
          >
            <h1>
              <AccessTimeOutlinedIcon />3
            </h1>
            Total Freight Pending Booking
          </div>

          <div
            className="box_main"
            onClick={() => {
              sessionStorage.setItem("bookingType", "FREIGHT");
              sessionStorage.setItem("BookingStatus", "CANCELLED");
              sessionStorage.removeItem("rideStatus");
              navigate("/BookingManagement");
            }}
            style={{
              boxShadow: "var(--redBoxShadow)",
            }}
          >
            <h1>
              <CancelIcon />
            </h1>
            Total Freight Cancelled Booking
          </div>
        </div>
      </div>

      {/* <div className="Driver_boxes">
      </div> */}
    </div>
  );
};

export default Driver;
