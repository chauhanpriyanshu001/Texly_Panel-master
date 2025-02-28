import React from "react";
import { useState, useEffect } from "react";
import BASE_URL from "../../variable";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

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

const TableRow = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const { activeDate } = item;
  const {
    mobileNumber,
    gender,
    status,
    accountVerify,
    bookingType,
    completeProfile,
    online,
    createdAt,
    profilePic,
    userType,
    _id,
  } = item.usersActivity[0];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const createdAtDate = new Date(createdAt);
  const formattedDate = createdAtDate.toLocaleString();
  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(createdAtDate);
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
          <h5>Name : {item.usersActivity.name}</h5>
          <h5>Active Date:{activeDate ? activeDate : ""}</h5>
          <h5>Online: {online ? "True" : "False"}</h5>
          <h5>Verified : {accountVerify ? "True" : "False"}</h5>
          <h5>Profile Completion : {completeProfile ? "True" : "False"}</h5>
          <h5>Status : {status}</h5>
          <h5>User Type : {userType}</h5>
          <small>Created Time :{formattedDate}</small>
        </Box>
      </Modal>
      <td>{item.usersActivity.name}</td>
      <td style={{ width: "18%" }}>{mobileNumber}</td>
      <td>{_id}</td>
      <td>{gender}</td>
      <td>{status}</td>
      <td onClick={handleOpen}>
        <VisibilityIcon color="success" />
      </td>
    </tr>
  );
};
//page
const TotalActiveUserPage = () => {
  const [todayActive, setTodayActive] = useState([]);
  const getAlltodayActiveUser = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllActiveUserBeforeThreeDay`,
        {
          headers: {
            token,
          },
        }
      );
      console.log(res.data);
      setTodayActive(res?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAlltodayActiveUser();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Id</th>
          <th>Gender</th>
          <th>Status</th>
          <th>View</th>
        </tr>
        {todayActive?.map((item, idx) => {
          return <TableRow item={item} key={idx} />;
        })}
      </table>
    </div>
  );
};

export default TotalActiveUserPage;
