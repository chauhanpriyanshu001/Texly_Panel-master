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
import Pagination from "../../Components/Pagination/Pagination";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
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
const myStyle = {
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      backgroundColor: "gray",
      color: "white",
      minWidth: "0.2rem",
      textAlign: "center"
    },
  },
  rows: {
    style: {
      minWidth: '0.2rem',
      textAlign: 'center'
    }
  }
};
const BookingTableRow = ({ ride, index }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    userId,
    rideStartdateTime,
    startLocation,
    endLocation,
    rideStatus,
    BookingStatus,
    requestAmount,
    bookingType,
    bookingNumber,
    acceptedFare,
    userName,
    userNumber,
    driverName,
    driverNumber,
    acceptedDriver,
  } = ride;
  return (
    <tr>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div>User ID : {userName}</div>
            <div>Driver Id : {driverName}</div>
            <div>Start Location : {startLocation}</div>
            <div>End location: {endLocation}</div>
            <div>Booking Status: {BookingStatus}</div>
            <div>Requested Amount: {requestAmount}</div>
            <div>Accepted Fare: {acceptedFare}</div>
            <div>User : {requestAmount}</div>
          </div>
        </Box>
      </Modal>
      <td
        style={{
          width: "2%",
        }}
      >
        {index + 1}
      </td>
      <td
        style={{
          width: "8%",
        }}
      >
        {userName ? userName : "User Name"}
      </td>
      <td
        style={{
          width: "8%",
        }}
      >
        {driverName ? driverName : "DriverName"}
      </td>
      <td>{driverNumber ? driverNumber : "DriverNumber"}</td>
      <td>{userNumber}</td>
      <td>{bookingNumber}</td>
      <td>{bookingType}</td>
      <td>{rideStatus}</td>
      <td>
        {acceptedFare ? acceptedFare : "Not Accepted"}
        {/* acceptedFare */}
      </td>
      <td onClick={handleOpen}>
        <VisibilityIcon />
      </td>
    </tr>
  );
};

const BookingManagement = () => {
  const token = sessionStorage.getItem("adminToken");
  const localType = sessionStorage.getItem("bookingType");
  const localRideStatus = sessionStorage.getItem("rideStatus");
  const localBookingStatus = sessionStorage.getItem("BookingStatus");
  const { setDashBoardName } = useContext(NameContext);
  const [dateRangeState, setDateRangeState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    display: false,
  });
  const [search, setSearch] = useState("");
  const [rideStatus, setRideStatus] = useState(
    localRideStatus ? localRideStatus : ""
  );
  const [bookingStatus, setBookingStatus] = useState(
    localBookingStatus ? localBookingStatus : ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingType, setBookingType] = useState(localType ? localType : "");
  const [allBooking, setAllBooking] = useState([]);
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllRideForAllCondition?search=${search}&rideStatus=${rideStatus}&BookingStatus=${bookingStatus}&bookingType=${bookingType}`,
        {
          headers: {
            token,
          },
        }
      );
      setAllBooking(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSelect(ranges) {
    setDateRangeState({ ...ranges.range1, display: !dateRangeState.display });
  }

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
      name: "Driver Name",
      selector: (row) => <div className="py-2">{row?.driverNumber ?row?.driverNumber:"DDDDDDDDD"}</div>,
    },
    {
      name: "Driver Number",
      selector: (row) => <div className="py-2">{row?.driverNumber ? row?.driverNumber:"000000000"}</div>,
    },
    {
      name: "User Number",
      selector: (row) => <div className="py-2">{row?.userNumber ?row?.userNumber:"0000000000"}</div>,
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
      selector: (row) => <div className="py-2">{row.acceptedFare?row?.acceptedFare:"Not accepted"}</div>,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="py-2">
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
      <div
        style={{
          display: "inline",

          width: "10%",
          overflow: "visible",
        }}
      >
        <button
          onClick={() => {
            setDateRangeState({
              ...dateRangeState,
              display: !dateRangeState.display,
            });
          }}
          style={{
            marginLeft: "1%",
          }}
          className="button"
        >
          Select Range
        </button>
        <div
          style={{
            width: "0vw",
            height: "0vw",
            display: dateRangeState.display ? "block" : "none",
            position: "relative",
            zIndex: "1",
            overflow: "visible",
          }}
        >
          <DateRangePicker ranges={[dateRangeState]} onChange={handleSelect} />
        </div>
      </div>
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
      <DataTable
            columns={columns}
            data={allBooking}
            highlightOnHover
            expandableRows
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            customStyles={myStyle}
            subHeader
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
            subHeaderAlign="left"
          />
      <table>
        <tr>
          <th>Sn.</th>
          <th>UserName</th>
          <th>DriverName</th>
          <th>User Num.</th>
          <th>Driver Num.</th>
          <th>Booking Number</th>
          <th>Booking Type</th>
          <th>Ride Status</th>
          <th>
            Fare
            {/* acceptedFare */}
          </th>
          <th>Action</th>
        </tr>
        {allBooking?.map((ride, idx) => {
          return <BookingTableRow key={idx} ride={ride} index={idx} />;
        })}
        {!allBooking ||
          (allBooking.length === 0 && (
            <tfoot>
              <span
                style={{
                  color: "black",
                }}
              >
                No record to display
              </span>
            </tfoot>
          ))}
      </table>
    </div>
  );
};

export default BookingManagement;
