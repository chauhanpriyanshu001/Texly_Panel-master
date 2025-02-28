import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import "./VehicleManagementPage.css";
import BASE_URL from "../../variable";
import CustomAlert from "../../Alert/CustomAlert";
import { Button } from "@mui/material";

const EditVehicleForm = () => {
  const location = useLocation();
  const { state } = location;
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const item = state;
  const { vehiclePic, commissionType } = item;
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageToSend, setimageToSend] = useState(null);
  const [selectedValue, setSelectedValue] = React.useState(
    commissionType ? commissionType : null
  );
  const [tax, setTax] = useState(item?.tax);
  const [order, setOrder] = useState(item.order || "not exist");

  const [vehicleName, setVehicleName] = useState(item?.vehicleName);
  const [commission, setCommission] = useState(item?.commission);
  const [bookingType, setBookingType] = useState(
    item ? item.bookingType : null
  );
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const fileInputRef = useRef(null);

  const handleChange2 = (event) => {
    setBookingType(event.target.value);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setimageToSend(file);
    setSelectedImage(URL.createObjectURL(file));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (vehicleName) formData.append("vehicleName", vehicleName);
    if (commission) formData.append("commission", commission);
    if (bookingType) formData.append("bookingType", bookingType);
    if (selectedImage) formData.append("vehiclePic", imageToSend);
    if (tax) formData.append("tax", tax);

    if (selectedValue) formData.append("commissionType", selectedValue);
    if (order) formData.append("order", order);
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateVehicle/${item._id}`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      navigate("/VehicleManagement");
    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <div className="EditVehicle_Form_container">
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
      <Button
        onClick={() => {
          navigate("/VehicleManagement");
        }}
        style={{
          backgroundColor: "var(--backColor25)",
          float: "left",
        }}
        variant="contained"
      >
        Go Back
      </Button>

      <form onSubmit={handleSubmit} 
      style={{
        display:"flex",
        flexDirection:'column',
        justifyContent:"start"
      }}
      className="VehicleManagementPage_form">
        <h1>Update Vehicle</h1>
        <label>Vehicle Name</label>
        <input
          type="text"
          style={{
            padding: "8px",
            marginBottom: "10px",
            color: "black",
          }}
          className="input"
          placeholder="vehicle name"
          value={vehicleName}
          onChange={(e) => {
            setVehicleName(e.target.value);
          }}
          required
        />
        {selectedImage && (
          <div style={{ marginBottom: "10px" }}>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "40%", height: "auto" }}
            />
          </div>
        )}
        <input
          accept="image/png, image/jpeg"
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="input"
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file">
          <div
            className="button"
            onClick={handleUploadButtonClick}
            style={{
              padding: "8px 12px",
              marginBottom: "10px",
              width: "10vw",
              color: "black",
            }}
          >
            Upload Image
          </div>
        </label>

        <fieldset
          className="field_set"
          style={{ marginBottom: "10px", width: "max-content" }}
        >
          <legend>Type</legend>
          <div style={{ display: "flex", gap: "10px" }}>
            <label
              className={selectedValue === "FLAT" ? "label_hightligher" : ""}
            >
              <input
                type="radio"
                value="FLAT"
                checked={selectedValue === "FLAT"}
                onChange={handleChange}
              />
              Flat
            </label>
            <label
              className={
                selectedValue === "PERCENTAGE" ? "label_hightligher" : ""
              }
            >
              <input
                type="radio"
                value="PERCENTAGE"
                checked={selectedValue === "PERCENTAGE"}
                onChange={handleChange}
              />
              Percent
            </label>
          </div>
        </fieldset>
        <fieldset
          className="field_set"
          style={{ marginBottom: "10px", width: "max-content" }}
        >
          <legend>Booking Type</legend>
          <div style={{ display: "flex", gap: "10px" }}>
            <label
              className={bookingType === "BOOKNOW" ? "label_hightligher" : ""}
            >
              <input
                type="radio"
                value="BOOKNOW"
                checked={bookingType === "BOOKNOW"}
                onChange={handleChange2}
              />
              Book Now
            </label>
            <label
              className={bookingType === "BOOKLATER" ? "label_hightligher" : ""}
            >
              <input
                type="radio"
                value="BOOKLATER"
                checked={bookingType === "BOOKLATER"}
                onChange={handleChange2}
              />
              Book Later
            </label>
            <label
              className={bookingType === "BOTH" ? "label_hightligher" : ""}
            >
              <input
                type="radio"
                value="BOTH"
                checked={bookingType === "BOTH"}
                onChange={handleChange2}
              />
              Both
            </label>
            <label
              className={bookingType === "FREIGHT" ? "label_hightligher" : ""}
            >
              <input
                type="radio"
                value="FREIGHT"
                checked={bookingType === "FREIGHT"}
                onChange={handleChange2}
              />
              Freight
            </label>
          </div>
        </fieldset>
        <label>Tax</label>
        <input
          type="text"
          value={tax}
          placeholder="tax"
          onChange={(e) => {
            setTax(e.target.value);
          }}
          className="input"
          style={{
            color: "black",
            padding: "8px",
            marginBottom: "10px",
          }}
          required
        />
        <label>Commision</label>
        <input
          onChange={(e) => {
            setCommission(e.target.value);
          }}
          placeholder="commision"
          type="text"
          className="input"
          value={commission}
          style={{
            color: "black",
            padding: "8px",
            marginBottom: "10px",
          }}
          required
        />
        <label>
          <b>order</b>
        </label>
        <input
          className="input"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
          placeholder="Type a order number"
          type="text"
          value={order}
          style={{
            color: "black",
            padding: "8px",
            marginBottom: "10px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            color: "black",
            width:"min-content"
          }}
          className="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditVehicleForm;
