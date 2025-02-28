import React from "react";
import "./DriverManagementPage.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { datetimeCalulate } from "../../helperfuntions/dateConverter";
import CustomAlert from "../../Alert/CustomAlert";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import { NameContext } from "../../Context";
import AppBlockingTwoToneIcon from "@mui/icons-material/AppBlockingTwoTone";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DateRangePicker } from "react-date-range";
import { myStyle } from "../../GlobalCss";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import DateRange from "../../Components/DateRange/DateRange";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-36.5%, -45%)",
  width: 1100,
  bgcolor: "background.paper",
  padding: 6,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  padding: 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  padding: 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const DriverTableRow = ({ driver, index, getAllDriver }) => {
  const token = sessionStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  //delete  driver modal
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  //block booking  driver modal
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const {
    documentVerified,
    mobileNumber,
    documentUpload,
    bookingBlock,
    _id,
    online,
    vehicleType,
    name,
  } = driver;

  //this handler is not right
  const handleBookingBlock = async (KeyOfDriver, status) => {
    try {
      await axios.post(
        `${BASE_URL}/admin/updateDriverStatus/${_id}`,
        { [KeyOfDriver]: status },
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: `${KeyOfDriver} updated successfully `,
        severity: "success",
      });
      getAllDriver();
    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
    }
  };
  const handleDeleteDriver = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/deleteDriverByAdmin/${_id}`,
        {
          headers: {
            token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const documentKeys = [
  //   ["vehicleFrontPic", "vehicleFrontPicStatus"],
  //   ["vehicleRightPic", "vehicleRightPicStatus"],
  //   ["vehicleLeftPic", " vehicleLeftPicStatus"],
  //   ["registrationCertificateFrontPic", "RCFrontPicStatus"],
  //   ["registrationCertificateBackPic", "RCBackPicStatus"],
  //   ["permitFirstPagePic", "permitFirstPagePicStatus"],
  //   ["permitSecondPagePic", "permitSecondPagePicStatus"],
  // ];

  return (
    <tr>
      {/* //Booking block modal */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h1>Block Booking of {name} </h1>
          <Button
            onClick={() => {
              handleBookingBlock("BLOCKED");
            }}
            variant="contained"
            color="error"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              handleClose3();
            }}
            variant="contained"
            color="success"
          >
            No
          </Button>
        </Box>
      </Modal>

      {/* //delete driver modal */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h2>Delete All data of driver </h2>
          <Button
            onClick={() => {
              handleDeleteDriver();
              getAllDriver();
              handleClose2();
            }}
            style={{
              marginRight: "6px",
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              handleClose2();
            }}
            variant="contained"
            color="success"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      {/* view document modal */}

      {/* view driver modal */}

      <td
        style={{
          width: "5%",
        }}
      >
        <CustomAlert
          open={alertState.state}
          severity={alertState.severity}
          message={alertState.message}
          onClose={() => {
            setAlertState({ ...alertState, state: false });
          }}
        />
        {index + 1}
      </td>
      <td>{name ? name : "Not assigned"}</td>
      <td
        style={{
          width: "12%",
        }}
      >
        {mobileNumber}
      </td>
      <td>{online}</td>
      <td>{vehicleType ? vehicleType[0]?.vehicleName : "Not found"}</td>
      <td
        style={{
          fontSize: "1vw",
          width: "10%",
          color: documentUpload ? "green" : "red",
        }}
      >
        {documentUpload ? "Yes" : "No"}
      </td>
      <td
        style={{
          color: documentVerified == "REJECT" && "red",
        }}
      >
        {documentVerified}
      </td>
      <td
        style={{
          width: "5%",
        }}
      >
        {" "}
        <DescriptionIcon
          onClick={() => {
            navigate("/DriverManagement/DocsDetail", { state: { _id } });
          }}
          style={{
            color: "yellow",
          }}
        />
      </td>
      <td
        style={{
          width: "5%",
        }}
      >
        {bookingBlock === "UNBLOCKED" ? (
          <NotificationsActiveTwoToneIcon
            style={{
              color: "green",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBookingBlock("bookingBlock", "BLOCKED");
            }}
          />
        ) : (
          <BlockIcon
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBookingBlock("bookingBlock", "UNBLOCKED");
            }}
          />
        )}
      </td>
      <td>
        <VisibilityIcon
          onClick={() => {
            navigate("/DriverManagement/ViewDriver", { state: driver });
          }}
          style={{
            color: "green",
            cursor: "pointer",
            marginLeft: "10%",
          }}
        />
        <DeleteIcon
          onClick={() => {
            handleOpen2();
          }}
          style={{
            color: "red",
            marginLeft: "10%",
            cursor: "pointer",
          }}
        />
        {driver.status == "BLOCK" ? (
          <AppBlockingTwoToneIcon
            style={{
              color: "red",
              marginLeft: "10%",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBookingBlock("status", "ACTIVE");
            }}
          />
        ) : (
          <Brightness1Icon
            style={{
              marginLeft: "10%",
              color: "green",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBookingBlock("status", "BLOCK");
            }}
          />
        )}
      </td>
    </tr>
  );
};

const DriverManagementPage = ({ sideBarState }) => {
  const [drivers, setDrivers] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const token = sessionStorage.getItem("adminToken");
  const { setDashBoardName } = useContext(NameContext);
  const [dateRangeState, setDateRangeState] = useState({
    startDate: "",
    endDate: "",
    display: false,
  });

  setDashBoardName("Driver management");
  const getAllDriver = async (offset) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllDriver?bookingBlock=${bookingStatus}&status=${status}&search=${search}&offset=${offset}&startDate=${dateRangeState.startDate}&endDate=${dateRangeState?.endDate}`,
        {
          headers: {
            token,
          },
        }
      );
      setDrivers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllDriver();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getAllDriver();
  }, [status, bookingStatus]);
  return (
    <div className="DriverManagement_page_container">
      <input
        type="text"
        className="input"
        placeholder="Seach by name ,number"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") getAllDriver();
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          getAllDriver();
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
        className="select"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "2%",
        }}
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      >
        <option value="">Driver Status</option>
        <option value="BLOCK">Block</option>
        <option value="ACTIVE">Active</option>
        <option value="DELETE">Delete</option>
      </select>
      <select
        onChange={(e) => {
          setBookingStatus(e.target.value);
        }}
        className="select"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "1%",
        }}
      >
        <option value="">Booking status</option>
        <option value="BLOCKED">Blocked</option>
        <option value="UNBLOCKED">Unblocked</option>
      </select>
      <DateRange
        setDateRangeState={setDateRangeState}
        dateRangeState={dateRangeState}
        functionToCall={getAllDriver}
      />
      <table>
        <tr>
          <th>Sn.</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Online / Offline</th>
          <th>Vehicle</th>
          <th>Docs Uploaded</th>
          <th>Docs Status</th>
          <th>Check Docs</th>
          <th>Booking Block</th>
          <th>View/Delete/Block</th>
        </tr>
        {drivers?.result?.map((item, index) => {
          return (
            <DriverTableRow
              key={item._id}
              index={index}
              driver={item}
              getAllDriver={getAllDriver}
            />
          );
        })}
        {!drivers ||
          (drivers.length === 0 && (
            <tfoot>
              <span>No record to display</span>
            </tfoot>
          ))}
      </table>
      <Pagination
        color="primary"
        sx={myStyle.pagination}
        count={drivers?.Total_Page_Count}
        showFirstButton
        showLastButton
        onChange={(e, value) => {
          getAllDriver(value - 1);
        }}
      />
    </div>
  );
};

export default DriverManagementPage;
