import React from "react";
import "./TActiveDriver.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState } from "react";
import { useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const DriverTableRow = ({ driver, index }) => {
  const {
    documentVerified,
    mobileNumber,
    profilePic,
    createdAt,
    walletBalance,
    gender,
    documentUpload,
    bookingAcceptType,
    bookingBlock,
    completeProfile,
    _id,
    name,
  } = driver.driversActivity  ;
console.log(driver);
  return (
    <tr>
      <td
        style={{
          width: "5%",
        }}
      >
        {index+1}
      </td>
      <td>{name ? name : "Not assigned"}</td>
      <td
        style={{
          width: "12%",
        }}
      >
        {mobileNumber}
      </td>
      <td>{_id}</td>
      <td
        style={{
          fontSize: "1vw",
          width: "10%",
        }}
      >
        {documentUpload ? "Yes" : "No"}
      </td>
      <td>{documentVerified}</td>
      <td
        style={{
          width: "5%",
        }}
      >
        {" "}
        <DescriptionIcon
          style={{
            color: "green",
          }}
        />
      </td>
      <td>
        <BlockIcon
          style={{
            color: "red",
          }}
        />
        <Brightness1Icon
          style={{
            color: "green",
          }}
        />
        {/* {bookingBlock} */}
      </td>
      <td>
        <VisibilityIcon
          style={{
            color: "green",
            cursor: "pointer",
          }}
        />
        <EditIcon />
        <DeleteIcon
          style={{
            color: "red",
          }}
        />
      </td>
    </tr>
  );
};

const TActiveDriver = () => {
  const [todayActiveDrivers, setTodayActiveDrivers] = useState(null);
  const token = sessionStorage.getItem("adminToken");

  const getTodayActiveDriver = async () => {
    try {
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
  useEffect(() => {
    getTodayActiveDriver();
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>Sn.</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Online / Offline</th>
          <th>Docs Uploaded</th>
          <th>Docs Status</th>
          <th>Check Docs</th>
          <th>Booking Block</th>
          <th>View/Delete/Update </th>
        </tr>
        {todayActiveDrivers?.map((driver, idx) => {
          return <DriverTableRow key={idx} index={idx} driver={driver} />;
        })}
      </table>
    </div>
  );
};

export default TActiveDriver;
