import React from "react";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { NameContext } from "../../Context";
import axios from "axios";
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
const TodayBookLater = () => {
  const localValue = sessionStorage.getItem("BookNowTodayValue");
  const [todayBookLater, setTodayBookLater] = useState([]);
  const token = sessionStorage.getItem("adminToken");

  //   useEffect(() => {
  //       const intervalId = setInterval(() => {
  //         getTodayBookNow();
  //       }, 1000 * 5);

  //       return () => clearInterval(intervalId);
  //     }, []);
  const getTodayBookNow = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/todayBookingsBOOKNOW`, {
        headers: {
          token,
        },
      });
      if (localValue) {
        if (localValue == "Total") {
          setTodayBookLater(res.data?.todayBookings);
        }
        if (localValue == "Accepted") {
          setTodayBookLater(res.data?.startedBookings?.data);
        }
        if (localValue == "Completed") {
          setTodayBookLater(res.data?.completedBookings?.data);
        }
        if (localValue == "Pending") {
          setTodayBookLater(res.data?.pendingBookings?.data);
        }
        if (localValue == "Cancelled") {
          setTodayBookLater(res.data?.canceledBookings?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayBookNow();
    sessionStorage.removeItem("BookNowTodayValue");
  }, []);
  return (
    <div>
      TodayBookNow
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
          {todayBookLater?.map((ride, idx) => {
            return <BookingTableRow key={idx} ride={ride} index={idx} />;
          })}
      </table>
    </div>
  );
};

export default TodayBookLater;
