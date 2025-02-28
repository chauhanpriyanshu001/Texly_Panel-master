import React from "react";
import { useLocation } from "react-router-dom";
import "./DriverManagementPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../variable";
import axios from "axios";
import CustomAlert from "../../Alert/CustomAlert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DriverDocsPage = () => {
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [open, setOpen] = useState(false);
  const [imageToZoom, setImageToZoom] = useState(null);
  const [docsData, setDocsData] = useState({
    DrivingLicenseId: {},
    aadharDocumentId: {},
    documentId: {},
  });
  //this will open modal and show image
  const handleOpen = (image) => {
    setImageToZoom(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const token = sessionStorage.getItem("adminToken");
  const navigate = useNavigate();
  const location = useLocation();
  const _id = location.state._id;
  const deleteDocumentHandler = async (apiToCall) => {
    try {
      if (apiToCall === "deleteDL") {
        await axios.delete(`${BASE_URL}/admin/deleteDL/${_id}`, {
          headers: {
            token,
          },
        });
      } else if (apiToCall === "deleteVehicleDocs") {
        await axios.delete(
          `${BASE_URL}/admin/deleteVehicleDataWithDriverId/${_id}`,
          {
            headers: {
              token,
            },
          }
        );
      }
      if (apiToCall === "deleteAadhar") {
        await axios.delete(`${BASE_URL}/admin/deleteAadhar/${_id}`, {
          headers: {
            token,
          },
        });
      }
      setAlertState({
        state: true,
        message: ` updated success fully `,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
    }
  };
  const verifyDocumentHandler = async (updateTo) => {
    console.log(updateTo);
    try {
      const res = await axios.put(
        `${BASE_URL}/admin/updateDriverDocStatus/${_id}`,
        {
          documentVerified: updateTo,
        },
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: ` All document verified approvement success fully`,
        severity: "success",
      });
    } catch (error) {
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
      console.log(error);
    }
  };

  const getDocumentHandler = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getDriverByIdWithAllData/${_id}`,
        {
          headers: {
            token,
          },
        }
      );
      const driverData = res?.data?.result[0];
      setAlertState({
        state: true,
        message: "Successfully fetched",
        severity: "success",
      });
      setDocsData(driverData);
    } catch (error) {
      setAlertState({
        state: true,
        message: "failed fetching fetched",
        severity: "error",
      });
    }
  };
  const license = docsData?.DrivingLicenseId;
  const aadhar = docsData?.aadharDocumentId;
  const document = docsData?.documentId;

  const handleApproveReject = async (keyName, status, apiToCall) => {
    try {
      if (apiToCall === "aadharUpdate") {
        const res = await axios.put(
          `${BASE_URL}/admin/updateAdhar/${_id}`,
          { [keyName]: status },
          {
            headers: {
              token,
            },
          }
        );
        setAlertState({
          state: true,
          message: "update successfully ",
          severity: "success",
        });
      }
      if (apiToCall === "vehicleUpdate") {
        const res = await axios.put(
          `${BASE_URL}/admin/updateVehicleDataWithDriverId/${_id}`,
          { [keyName]: status },
          {
            headers: {
              token,
            },
          }
        );
        setAlertState({
          state: true,
          message: "update successfully ",
          severity: "success",
        });
      }
      if (apiToCall === "updateLicense") {
        const res = await axios.put(
          `${BASE_URL}/admin/updateDL/${_id}`,
          { [keyName]: status },
          {
            headers: {
              token,
            },
          }
        );
        setAlertState({
          state: true,
          message: "update successfully ",
          severity: "success",
        });
      }
      getDocumentHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const AccRejButtomComp = ({ keyName, apiToCall, status }) => {
    console.log(`${keyName}${status}`);
    return (


      <span className="AccRejButtomComp_container">
        {status !== "APPROVED" ? (
          <button
            variant="contained"
         
            onClick={() => {
              handleApproveReject(keyName, "APPROVED", apiToCall);
            }}
            className="driverManagement_button_approve"
            size="small"
          >
            Approve
          </button>
        ) : (
          ""
        )}
        {status !== "REJECTED"?<button
          className="driverManagement_button_reject"
          variant="contained"
          style={{
            marginLeft: "1vw",
          }}
          onClick={() => {
            handleApproveReject(keyName, "REJECTED", apiToCall);
          }}
          size="small"
        >
          Reject
        </button>:""}
      </span>
    );
  };
  const TableRowComponent = ({
    keyName,
    apiToCall,
    ImageLink,
    text,
    type,
    value,
    status,
  }) => {
    if(!status){
      status="PENDING"
    }
    return (
      <>
        <td>{text}</td>
        <td>
          {type === "img" ? (
            ImageLink ? (
              <img
                style={{
                  cursor: "pointer",
                  width: "40%",
                  height: "10vw",
                }}
                onClick={() => {
                  if (ImageLink) {
                    handleOpen(ImageLink);
                  }
                }}
                src={ImageLink}
                alt="Does not exist"
              />
            ) : (
              "Image not found"
            )
          ) : value ? (
            value
          ) : (
            "No Number"
          )}
        </td>
        {status === "APPROVED" && (
          <td
            style={{
              color: "green",
            }}
          >
            {status}
          </td>
        )}
        {status === "PENDING" && (
          <td
            style={{
              color: "greenYellow",
            }}
          >
            {status}
          </td>
        )}
        {status === "REJECTED" && (
          <td
            style={{
              color: "red",
            }}
          >
            {status}
          </td>
        )}

        <td>
          <AccRejButtomComp
            keyName={keyName}
            status={status}
            apiToCall={apiToCall}
          />
        </td>
      </>
    );
  };
  useEffect(() => {
    getDocumentHandler();
  }, []);
  return (
    <div className="DriverDocsPage_container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <div
            style={{
              width: "inherit",
              maxHeight: "80vh",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            <img src={imageToZoom} style={{ width: "inherit" }} alt="" />
          </div>
        </Box>
      </Modal>
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
      <Button
        color="success"
        variant="outlined"
        onClick={() => {
          navigate("/DriverManagement");
        }}
      >
        Go back
      </Button>
      <table>
        <tr>
          <th>Image/Number</th>
          <th>Document Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        <tr>
          <TableRowComponent
            text="Adhar Number"
            value={aadhar?.aadharNumber}
            status={aadhar?.aadharNumberStatus}
            keyName="aadharNumberStatus"
            apiToCall="aadharUpdate"
          />
        </tr>

        <tr>
          <TableRowComponent
            text="Adhar back Image"
            type="img"
            ImageLink={aadhar?.aadharBackPic}
            status={aadhar?.aadharBackPicStatus}
            keyName="aadharBackPicStatus"
            apiToCall="aadharUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="Adhar Front Image"
            type="img"
            ImageLink={aadhar?.aadharFrontPic}
            status={aadhar?.aadharFrontPicStatus}
            keyName="aadharFrontPicStatus"
            apiToCall="aadharUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text=" DL Number"
            value={license?.DLNumber}
            status={license?.DLNumberStatus}
            keyName="DLNumberStatus"
            apiToCall="updateLicense"
          />
        </tr>
        <tr>
          <TableRowComponent
            text=" DL ExpireDate"
            value={license?.DLExpireDate}
            status={license?.DLExpireDateStatus}
            keyName="DLExpireDateStatus"
            apiToCall="updateLicense"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="  DL FrontPic"
            type="img"
            ImageLink={license?.DLFrontPic}
            status={license?.DLFrontPicStatus}
            keyName="DLFrontPicStatus"
            apiToCall="updateLicense"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="DL Back Pic"
            type="img"
            ImageLink={license?.DLBackPic}
            status={license?.DLBackPicStatus}
            keyName="DLBackPicStatus"
            apiToCall="updateLicense"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="DL SelfieWith ID"
            type="img"
            ImageLink={license?.DLSelfieWithID}
            status={license?.DLSelfieWithIDStatus}
            keyName="DLSelfieWithIDStatus"
            apiToCall="updateLicense"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="Vehicle Brand"
            value={document?.vehicleBrand}
            status={document?.vehicleBrandStatus}
            keyName="vehicleBrandStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="Vehicle Color"
            value={document?.vehicleColor}
            status={document?.vehicleColorStatus}
            keyName="vehicleColorStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text=" vehicle Number"
            value={document?.vehicleNumber}
            status={document?.vehicleNumberStatus}
            keyName="vehicleNumberStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="     Vehicle Model"
            value={document?.vehicleModel}
            status={document?.vehicleModelStatus}
            keyName="vehicleModelStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="vehicleFrontPic"
            type="img"
            ImageLink={document?.vehicleFrontPic}
            status={document?.vehicleFrontPicStatus}
            keyName="vehicleFrontPicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="vehicleRightPic"
            type="img"
            ImageLink={document?.vehicleLeftPic}
            status={document?.vehicleRightPicStatus}
            keyName="vehicleRightPicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="vehicleRightPic"
            type="img"
            ImageLink={document?.vehicleRightPic}
            status={document?.vehicleRightPicStatus}
            keyName="vehicleRightPicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="Registration Certificate FrontPic"
            type="img"
            ImageLink={document?.registrationCertificateFrontPic}
            status={document?.RCFrontPicStatus}
            keyName="RCFrontPicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="registrationCertificateBackPic"
            type="img"
            ImageLink={document?.registrationCertificateBackPic}
            status={document?.RCBackPicStatus}
            keyName="RCBackPicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text=" permitFirstPagePic"
            type="img"
            ImageLink={document?.permitFirstPagePic}
            status={document?.permitFirstPagePicStatus}
            keyName="permitFirstPagePicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
        <tr>
          <TableRowComponent
            text="PermitSecondPagePic"
            type="img"
            ImageLink={document?.permitSecondPagePic}
            status={document?.permitSecondPagePicStatus}
            keyName="permitSecondPagePicStatus"
            apiToCall="vehicleUpdate"
          />
        </tr>
      </table>
      <div
        style={{
          width: "50%",
          color: "white",
          margin: "1vw 0vw",
        }}
      >
        Verify All docs of Driver
        <span className="AccRejButtomComp_container">
          <button
            variant="contained"
            onClick={() => {
              verifyDocumentHandler("APPROVED");
            }}
            className="driverManagement_button_approve"
            size="small"
          >
            Approve
          </button>
          <button
            className="driverManagement_button_reject"
            variant="contained"
            style={{
              marginLeft: "1vw",
            }}
            onClick={() => {
              verifyDocumentHandler("REJECT");
            }}
            size="small"
          >
            Reject
          </button>
        </span>
      </div>{" "}
      <span
        style={{
          color: "red",
        }}
      >
        warning : This document verification will allow driver to enter in
        application
      </span>
    </div>
  );
};

export default DriverDocsPage;
