import React, { useEffect, useState } from "react";
import "./VehicleManagementPage.css";
import BASE_URL from "../../variable";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../../Context";
import CustomAlert from "../../Alert/CustomAlert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "var(--iconColor3)",

  oveflowY: "auto",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// create vehicle form

const VehicleTableComp = ({ item, getAllvehicle, todelete, count }) => {
  const { vehiclePic, commissionType } = item;
  const navigate = useNavigate();
  //edit modal
  const [open, setOpen] = React.useState(false);

  //view modal
  const [open1, setOpen1] = React.useState(false);
  //delete modal
  const [open2, setOpen2] = React.useState(false);

  const formData2 = new FormData();

  //Edit Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //View modal
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  //delete modal
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleDelete = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      formData2.append("deleteStatus", todelete);

      const res = await axios.put(
        `${BASE_URL}/admin/updateVehicle/${item._id}`,
        formData2,
        {
          headers: {
            token,
          },
        }
      );
      getAllvehicle();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      {/* delete vehicle modal */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ height: "auto", color: "white", width: "max-content" }}
        >
          <h1>
            {todelete ? "Delete" : "UndoDelete"} {item.vehicleName}
          </h1>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete();
              getAllvehicle();
              handleClose2();
            }}
          >
            {" "}
            Yes
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "2vw",
            }}
            onClick={handleClose2}
          >
            No
          </Button>
        </Box>
      </Modal>
      {/* edit vehicle modal */}

      {/* view vehicle modal */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ height: "auto" }}>
          <div className="viewVehicle_modal_container">
            <img
              src={vehiclePic}
              style={{
                height: "6vw",
              }}
              alt=""
            />
            <h1>Vehicle Name : {item.vehicleName} </h1>
            <h3>Commission Type: {item.commissionType}</h3>

            <h3>Booking type : {item.bookingType}</h3>
            <h3>Commision : {item.commission}</h3>
            <h3>Tax : {item.tax}</h3>
          </div>
        </Box>
      </Modal>
      <td
        style={{
          width: "1%",
        }}
      >
        {item.order || 0}
      </td>
      <td>{item.vehicleName}</td>
      <td>{item.bookingType}</td>

      <td>
        <img
          src={vehiclePic}
          style={{
            width: "6vw",
          }}
          alt=""
        />
      </td>
      <td
      style={{
        width:"3%"
      }}
      >{item.driverId.length || 0}</td>
      <td
      style={{
        width:"6%"
      }}
      >{item.tax || 0}</td>
      <td
      style={{
        width:"3%"
      }}
      >{item.commission || 0}%</td>
      <td style={{ cursor: "pointer" }} onClick={handleOpen1}>
        <VisibilityIcon />
      </td>
      <td
        style={{ cursor: "pointer" }}
        className="green_icon_color"
        onClick={() => {
          navigate("/VehicleManagement/editVehicles", { state: item });
        }}
      >
        <EditIcon />
      </td>
      <td style={{ cursor: "pointer" }} onClick={handleOpen2}>
        {todelete ? <DeleteIcon className="red_icon_color" /> : <UndoIcon />}
      </td>
    </tr>
  );
};
const VehicleManagementPage = () => {
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [allVehicle, setAllVehicle] = useState(null);
  const [allDeletedVehicle, setAllDeletedVehicle] = useState(null);
  const { setDashBoardName } = useContext(NameContext);
  const navigate = useNavigate();
  const [bookNowVehicles, setBookNowVehicles] = useState(null);
  const [bookLaterVehicles, setBookLaterVehicles] = useState(null);
  const [freightVehicles, setFreightVehicles] = useState(null);

  async function getAllvehicle() {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.get(`${BASE_URL}/admin/getAllVehicle`, {
        headers: {
          token,
        },
      });

      const data1 = res?.data.result.filter((item) => !item.deleteStatus);
      const data = data1.sort((a, b) => a.order - b.order);

      const filteredData = data?.filter(
        (item) =>
          item.bookingType == "BOOKLATER" ||
          (item.bookingType === "BOTH" && item.bookingType !== "FREIGHT")
      );
      const filteredData2 = data?.filter(
        (item) =>
          item.bookingType === "BOOKNOW" ||
          (item.bookingType === "BOTH" && item.bookingType !== "FREIGHT")
      );
      const filteredData3 = data?.filter(
        (item) => item.bookingType === "FREIGHT"
      );

      setBookNowVehicles(filteredData2);
      setBookLaterVehicles(filteredData);
      setFreightVehicles(filteredData3);

      const filterData2 = res?.data.result?.filter(
        (item) => item.deleteStatus === true
      );
      setAllDeletedVehicle(filterData2);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllvehicle();
    setDashBoardName("Vehicle Management");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "70%",
        }}
      >
        <h2
          style={{
            color: "white",
          }}
        >
          All Vehicles
        </h2>
        <button
          onClick={() => {
            navigate("/VehicleManagement/AddNewVehicle");
          }}
          className="button"
          style={{
            fontWeight: "700",
          }}
        >
          Add new Vehicle
        </button>
      </div>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Book Now Vehicle
      </h1>
      <table>
        <tr>
          <th>Sn.</th>

          <th>Vehicle Name</th>
          <th>Booking Type</th>
          <th>Vehicle Image</th>
          <th>Registered driver</th>
          <th>Tax</th>
          <th>Commision</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {bookNowVehicles?.map((item, idx) => {
          return (
            <VehicleTableComp
              item={item}
              key={item._id}
              count={idx}
              getAllvehicle={getAllvehicle}
              todelete={true}
              navigate={navigate}
            />
          );
        })}
      </table>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Book Later Vehicle
      </h1>
      <table>
        <tr>
          <th>Sn.</th>

          <th>Vehicle Name</th>
          <th>Booking Type</th>
          <th>Vehicle Image</th>
          <th>Registered driver</th>
          <th>Tax</th>
          <th>Commision</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {bookLaterVehicles?.map((item, idx) => {
          return (
            <VehicleTableComp
              item={item}
              key={item._id}
              count={idx}
              getAllvehicle={getAllvehicle}
              todelete={true}
              navigate={navigate}
            />
          );
        })}
      </table>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Freight Vehicle
      </h1>
      <table>
        <tr>
          <th>Sn.</th>

          <th>Vehicle Name</th>
          <th>Booking Type</th>
          <th>Vehicle Image</th>
          <th>Registered driver</th>
          <th>Tax</th>
          <th>Commision</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {freightVehicles?.map((item, idx) => {
          return (
            <VehicleTableComp
              item={item}
              key={item._id}
              count={idx}
              getAllvehicle={getAllvehicle}
              todelete={true}
              navigate={navigate}
            />
          );
        })}
      </table>
      <h2
        style={{
          color: "white",
        }}
      >
        Deleted Vehicles
      </h2>
      <table>
        <tr>
          <th>Sn.</th>

          <th>Vehicle Name</th>
          <th>Booking Type</th>
          <th>Vehicle Image</th>
          <th>Registered driver</th>
          <th>Tax</th>
          <th>Commision</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {allDeletedVehicle?.map((item, idx) => {
          return (
            <VehicleTableComp
              item={item}
              key={item._id}
              count={idx}
              navigate={navigate}
              getAllvehicle={getAllvehicle}
              todelete={false}
            />
          );
        })}
      </table>
    </div>
  );
};

export default VehicleManagementPage;
