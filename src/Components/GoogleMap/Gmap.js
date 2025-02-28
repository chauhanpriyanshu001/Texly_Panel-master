import React, { useEffect } from "react";
/*global google*/
//gmap imports
import {
  GoogleMap,
  Marker,
  Autocomplete,
  InfoWindowF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./Gmap.css";
//mui imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//default imports
import carpng from "../../Assets/img/carpng.png";
import { useRef, useState } from "react";
import axios from "axios";
import BASE_URL from "../../variable";
import { MarkerF } from "@react-google-maps/api";
import { datetimeCalulate } from "../../helperfuntions/dateConverter";

const center = { lat: 29.80153, lng: 76.39959 };
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

const Gmap = () => {
  const [open, setOpen] = React.useState(false);

  const [driverValues, setDriverValues] = useState("");
  const [driverDetail, setDriverDetail] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [drivers, setDrivers] = useState(null);

  const driverCreatedTime = datetimeCalulate.convertISOToshortDate(
    driverDetail?.createdAt
  );
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  //functions
  const getAllDriver = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.get(`${BASE_URL}/admin/getOnlineDriver`, {
        headers: {
          token,
        },
      });
      setDrivers(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getAllDriver();
  }, []);

  
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className="MapComponent_container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <img
              src={driverDetail?.profilePic}
              style={{
                width: "100%",
              }}
              alt="Profile Pic"
            />
            <div>
              <b>MobileNumber : {driverDetail?.mobileNumber}</b>
            </div>
            <div>online : {driverDetail?.online}</div>
            <div>
              Last Ride :{" "}
              {driverDetail?.rides ? driverDetail?.rides[0] : "None"}
            </div>
            <div>Created At : {driverCreatedTime}</div>
          </div>
        </Box>
      </Modal>
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {drivers?.map((item) => {
          const cordinate = {
            lat: item?.currentLocation?.coordinates[0],
            lng: item?.currentLocation?.coordinates[1],
          };
          return (
            <MarkerF
              position={cordinate}
              onMouseOver={() => {
                setDriverValues(item);
                console.log(item);
              }}
              icon={{
                url: carpng,
                fillColor: "#64be67",
                scaledSize: new window.google.maps.Size(35, 25),
              }}
              onClick={() => {
                setDriverValues(item);
              }}
            />
          );
        })}
        <MarkerF position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        {driverValues && (
          <InfoWindowF
            position={{
              lat: driverValues?.currentLocation?.coordinates[0],
              lng: driverValues?.currentLocation?.coordinates[1],
            }}
            onCloseClick={() => {
              setDriverValues(null);
            }}
            options={{
              pixelOffset: new window.google.maps.Size(0, -40),
            }}
          >
            <div
              onMouseLeave={() => {
                setDriverValues(null);
              }}
            >
              <div>Mobile No. : {driverValues?.mobileNumber}</div>
              <div>Wallet balance : {driverValues?.walletBalance} </div>

              <button
                style={{
                  padding: "2px",
                }}
                className="button"
                onClick={() => {
                  setDriverDetail(driverValues);
                  handleOpen();
                }}
              >
                More details..
              </button>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
      <button
        onClick={() => {
          map.panTo(center);
          map.setZoom(9);
        }}
      >
        Reset to center
      </button>
      {/* <Autocomplete>
        <input type="text"
         ref={destiantionRef}
        className="input" />
      </Autocomplete> */}
    </div>
  );
};

export default Gmap;
