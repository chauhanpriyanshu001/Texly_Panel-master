import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BookingManagement.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const ViewBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
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
    feedback
  } = state;

  useEffect(() => {
    console.log(state, " state in ViewBooking component");
  }, [state])

  return (
    <div className="ViewBooking-container">
      <Button
        onClick={() => {
          navigate("/BookingManagement");
        }}
        variant="contained"
        color="success"
        style={{
          width: "max-content",
        }}
      >
        Go Back
      </Button>
      <div>
        <span>User ID :</span>

        {userName}
      </div>
      <div>
        <span>Driver Id :</span>

        {driverName}
      </div>
      <div>
        <span>Start Location :</span>

        {startLocation}
      </div>
      <div>
        <span>End location:</span>

        {endLocation}
      </div>
      <div>
        <span>Booking Status:</span>

        {BookingStatus}
      </div>
      <div>
        <span>Requested Amount:</span>

        {requestAmount}
      </div>
      <div>
        <span>Accepted Fare:</span>

        {acceptedFare}
      </div>
      <div>
        <span>User:</span>

        {requestAmount}
      </div>
      <div>
        <span>Feedback:</span>

        {feedback}
      </div>
    </div>
  );
};

export default ViewBooking;
