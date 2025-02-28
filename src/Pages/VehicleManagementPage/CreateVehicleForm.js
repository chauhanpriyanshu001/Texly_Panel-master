import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "./VehicleManagementPage.css";
import BASE_URL from "../../variable";
import axios from "axios";
import CustomAlert from "../../Alert/CustomAlert";
import { SmartButtonTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CreateVehicleForm = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [selectedValue, setSelectedValue] = React.useState("option1");
  const [imageToSend, setimageToSend] = useState(null);
  const [vehicleName, setVehicleName] = useState("");
  const [commission, setCommission] = useState();
  const [order, setOrder] = useState(1);
  const [bookingType, setBookingType] = useState();
  const [tax, setTax] = useState();

  const fileInputRef = useRef(null);
  const formData = new FormData();
  formData.append("vehicleName", vehicleName);
  formData.append("commission", commission);
  formData.append("bookingType", bookingType);
  formData.append("vehiclePic", imageToSend);
  formData.append("tax", tax);
  formData.append("commissionType", selectedValue);
  formData.append("order", order);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("adminToken");
    try {
      await axios.post(`${BASE_URL}/admin/createVehicle`, formData, {
        headers: {
          token,
        },
      });
      setAlertState({
        state: true,
        message: "Created successfully",
        severity: "success",
      });
      navigate("/VehicleManagement");

    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
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

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit} className="CreateVehicle_form">
        <CustomAlert
          open={alertState.state}
          severity={alertState.severity}
          message={alertState.message}
          onClose={() => {
            setAlertState({ ...alertState, state: false });
          }}
        />

        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
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
          Add New Vehicle{" "}
        </h1>
        <div
          style={{
            marginTop: "50px",
          }}
        >
          <label>
            <b>Vehicle Name :</b>
          </label>
          <input
            type="text"
            className="input"
            style={{
              padding: "8px",
              marginBottom: "10px",
              color: "black",
            }}
            placeholder="vehicle name"
            value={vehicleName}
            onChange={(e) => {
              setVehicleName(e.target.value);
            }}
            required
          />
        </div>
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
          id="contained-button-file"
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file">
          <button
            onClick={handleUploadButtonClick}
            style={{
              padding: "8px 12px",
              marginBottom: "10px",
              color: "black",
              fontWeight: "700",
            }}
          >
            Upload Image
          </button>
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
              className={selectedValue === "PERCENTAGE" ? "label_hightligher" : ""}
            
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
        <div>
          <label>
            <b>Tax :</b>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Tax"
            onChange={(e) => {
              setTax(e.target.value);
            }}
            value={tax}
            style={{
              color: "black",
              padding: "8px",
              marginBottom: "10px",
            }}
            required
          />
        </div>
        <div>
          <label>
            <b>Commision :</b>
          </label>
          <input
            className="input"
            onChange={(e) => {
              setCommission(e.target.value);
            }}
            placeholder="Commision"
            type="text"
            value={commission}
            style={{
              color: "black",
              padding: "8px",
              marginBottom: "10px",
            }}
            required
          />
        </div>
        <div>
          <label>
            <b>order :</b>
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
        </div>
        <button
          type="submit"
          style={{
            marginLeft: "44%",
          }}
          className="button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateVehicleForm;
