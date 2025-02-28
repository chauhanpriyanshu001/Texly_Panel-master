import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const ViewUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {
    mobileNumber,
    gender,
    status,
    accountVerify,
    completeProfile,
    online,
    createdAt,
    profilePic,

    userType,
  } = state.item;
  const createdAtDate = new Date(createdAt);
  const formattedDate = createdAtDate.toLocaleString();
  const item = state.item;
  const userPdf = useRef();

  const generatePdf = useReactToPrint({
    content: () => userPdf.current,
    documentTitle: "userData",
  });
  return (
    <div>
      <button
        className="button"
        onClick={() => {
          navigate("/DashBoard/TotalUser");
        }}
      >
        Go Back
      </button>
      <button className="button" onClick={generatePdf}>
        Download Pdf
      </button>
      <div  ref={userPdf}
        style={{
          backgroundColor: "var(--dark)",
          color: "gray",
          padding: "2vw",
        }}
      >
        <div>
          {profilePic ? (
            <img
              style={{
                width: "4vw",
                height: "4vw",
              }}
              src={profilePic}
            />
          ) : (
            <PersonIcon />
          )}{" "}
        </div>
        <h3>Mobile Number : {mobileNumber}</h3>
        <h5>Name : {item.name ? item.name : "N/A"}</h5>
        <h5>Gender :{gender}</h5>

        <h5>Online: {online ? "True" : "False"}</h5>
        <h5>Verified : {accountVerify ? "True" : "False"}</h5>
        <h5>Profile Completion : {completeProfile ? "True" : "False"}</h5>
        <h5>Status : {status}</h5>
        <h5>User Type : {userType}</h5>
        <small>Created Time :{formattedDate}</small>
      </div>
    </div>
  );
};

export default ViewUserPage;
