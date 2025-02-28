import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { NameContext } from "../../Context";
import SearchIcon from "@mui/icons-material/Search";
import { DateRangePicker } from "react-date-range";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import Pagination from "@mui/material/Pagination";
import { myStyle } from "../../GlobalCss";
import { useNavigate } from "react-router-dom";
import DateRange from "../../Components/DateRange/DateRange";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BookingManagement = () => {
  const token = sessionStorage.getItem("adminToken");
  const localType = sessionStorage.getItem("bookingType");
  const localRideStatus = sessionStorage.getItem("rideStatus");
  const localBookingStatus = sessionStorage.getItem("BookingStatus");

  const { setDashBoardName } = useContext(NameContext);
  const [dateRangeState, setDateRangeState] = useState({
    startDate: "",
    endDate: "",
    display: false,
  });
  const [search, setSearch] = useState("");
  const [rideStatus, setRideStatus] = useState(
    localRideStatus ? localRideStatus : ""
  );
  const [bookingStatus, setBookingStatus] = useState(
    localBookingStatus ? localBookingStatus : ""
  );
  const [bookingType, setBookingType] = useState(localType ? localType : "");
  const [allBooking, setAllBooking] = useState([]);
  const navigate = useNavigate();
  const getTodayBookNow = async (offset) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=${search}&rideStatus=${rideStatus}&BookingStatus=${bookingStatus}&bookingType=${bookingType}&offset=${offset}&startDate=${dateRangeState.startDate}&endDate=${dateRangeState?.endDate}`,
        {
          headers: {
            token,
          },
        }
      );
      setAllBooking(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("bookingType");
    sessionStorage.removeItem("rideStatus");
    sessionStorage.removeItem("BookingStatus");
    setDashBoardName("Booking management");
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      getTodayBookNow();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getTodayBookNow();
  }, [rideStatus, bookingStatus, bookingType]);

  const columns = [
    {
      name: "User Name",
      selector: (row) =>
        !row?.userName ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.userName}</div>
        ),
    },
    {
      name: "User Number",
      selector: (row) => (
        <div className="py-2">
          {row?.userNumber ? row?.userNumber : "user number"}
        </div>
      ),
    },
    {
      name: "Driver Name",
      selector: (row) => (
        <div className="py-2">
          {row?.driverNumber ? row?.driverNumber : "new driver"}
        </div>
      ),
    },
    {
      name: "Driver Number",
      selector: (row) => (
        <div className="py-2">
          {row?.driverNumber ? row?.driverNumber : "driver number"}
        </div>
      ),
    },

    {
      name: "Booking Number",
      selector: (row) => <div className="py-2">{row?.bookingNumber}</div>,
    },
    {
      name: "Booking Type",
      selector: (row) => <div className="py-2">{row?.bookingType}</div>,
    },
    {
      name: "Accepted fare",
      selector: (row) => (
        <div className="py-2">
          {row.acceptedFare ? row?.acceptedFare : "Not accepted"}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div
          className="py-2"
          onClick={() => {
            navigate("/BookingManagement/Details", { state: row });
          }}
        >
          <VisibilityIcon />
        </div>
      ),
    },
    {
      name: "Driver Numner",
      selector: (row) =>
        row?.online === true ? (
          <div className="text-green-500 p-1 font-semibold">Online</div>
        ) : (
          <div className="text-red-500 p-1 font-semibold">Offline</div>
        ),
    },
  ];
  return (
    <div
      style={{
        color: "white",
        minHeight: "80vh",
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Seach by name ,number"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") getTodayBookNow();
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          getTodayBookNow();
        }}
        style={{
          backgroundColor: "var(--back)",
          marginLeft: "1%",
        }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>

      <select
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "2%",
        }}
        value={rideStatus}
        onChange={(e) => {
          setRideStatus(e.target.value);
        }}
      >
        <option value="">Status</option>
        <option value="PENDING">Pending</option>
        <option value="STARTED">Started</option>
        <option value="ONGOING">Ongoing</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select
        onChange={(e) => {
          setBookingType(e.target.value);
        }}
        value={bookingType}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "1%",
        }}
      >
        <option value="">Booking Type</option>
        <option value="BOOKNOW">Book Now </option>
        <option value="BOOKLATER">Book Later</option>
        <option value="FREIGHT">Freight </option>
      </select>
      <select
        onChange={(e) => {
          setBookingStatus(e.target.value);
        }}
        value={bookingStatus}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "1%",
        }}
      >
        <option value="">Booking status</option>
        <option value="CANCELLED">Cancelled</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
      <DateRange
        setDateRangeState={setDateRangeState}
        dateRangeState={dateRangeState}
        functionToCall={getTodayBookNow}
      />
      <DataTable
        columns={columns}
        data={allBooking?.result}
        highlightOnHover
      
        customStyles={myStyle}
        // subHeaderComponent={
        //   <div className="flex w-full justify-between">
        //     <input
        //       type="text"
        //       placeholder="Search for Name, Mobile &amp; Docs status"
        //       className="border px-2 rounded md:w-1/3 w-10/12"
        //       // defaultValue={searchlocal ? searchlocal : search}
        //       value={search}
        //       onChange={(e) => setSearch(e.target.value)}
        //     />
        //     <div className="flex">
        //       <select onChange={(e) => {
        //         setSearch(e.target.value)
        //         // localStorage.setItem('search', e.target.value)

        //       }} name="" id="" className="px-3 bg-slate-600 rounded text-white shadow-xl" >
        //         <option value="">Select</option>
        //         <option value="PENDING">Pending</option>
        //         <option value="APPROVE">Approve</option>
        //       </select>
        //       <button onClick={() => {
        //         navigate('/blocked-booking')
        //       }} className="px-3 ml-3 bg-slate-600 rounded text-white shadow-xl">Blocked Booking</button>
        //     </div>

        //   </div>

        // }
      />
      <Pagination
        color="primary"
        sx={myStyle.pagination}
        count={allBooking.pages}
        showFirstButton
        showLastButton
        onChange={(e, value) => {
          getTodayBookNow(value - 1);
        }}
      />
    </div>
  );
};

export default BookingManagement;
