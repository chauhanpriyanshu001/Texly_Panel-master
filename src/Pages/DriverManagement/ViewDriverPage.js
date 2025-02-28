import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ViewDriverPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const {
    profilePic,
    createdAt,
    walletBalance,
    gender,
    serviceVehicle,
    bookingAcceptType,
    completeProfile,
    vehicleType,
    name,
  } = state;
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/DriverManagement");
        }}
      >
        Go Back
      </Button>
      <div className="driver_detail_modal">
        <div
          style={{
            width: "50%",
            height: "30vw",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "20vw",
            }}
            src={profilePic}
            alt="Driver Image"
          />
        </div>
        <div>
          <div>Name : {name ? name : "Not assigned"}</div>
          <div>Type of accepted Booking: {bookingAcceptType}</div>

          <div>Profile Completed : {completeProfile ? "Yes" : "No"}</div>
          <div>gender : {gender}</div>
          <div>Wallet balace :{walletBalance}</div>
          <div>Vehicle Type :{vehicleType[0]?.vehicleName  || "not found"}</div>
          <div>Created At : {createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewDriverPage;
