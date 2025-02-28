import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./ContactUs.css";
import axios from "axios";
import BASE_URL from "../../variable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { NameContext } from "../../Context";

import CustomAlert from "../../Alert/CustomAlert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const ContacUsComp = ({ item, getAllContactUs, setFormData }) => {
  const { content, email, phone, name, subject } = item;
  const [open, setOpen] = React.useState(false);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });

  const handleDelete = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.delete(
        `${BASE_URL}/contact/DeleteContactUs/${item._id}`,
        {
          headers: {
            token,
          },
        }
      );
      getAllContactUs();
      setAlertState({
        state: true,
        message: `Deleted successfully `,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="contacUsComp_container">
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
      <h3>subject : {subject}</h3>
      <span>email : {email}</span>
      <p
        style={{
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        name : {name}
      </p>
      <small>{content}</small>
      <div>
        <Button
          variant="outlined"
          color="error"
          size="small"
          style={{
            width: "10%",
            marginTop: "1vw",
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>{" "}
        <Button
          variant="outlined"
          color="success"
          size="small"
          style={{
            width: "10%",
            marginTop: "1vw",
          }}
          onClick={() => setFormData(item)}
        >
          Open
        </Button>
      </div>
    </div>
  );
};

const ContactUsPage = () => {
  const [contactForms, setContactForms] = useState([]);
  const [formData, setFormData] = useState(null);
  const getAllContactUs = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.get(`${BASE_URL}//contact/GetContactUs`, {
        headers: {
          token,
        },
      });
      console.log(res.data.data);
      setContactForms(res.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const { setDashBoardName } = useContext(NameContext);

  useEffect(() => {
    setDashBoardName("Contact us");
    getAllContactUs();
  }, []);
  return (
    <div className="ContactUsPage_container">
      <div className="contacUsComp_boxes">
        {contactForms?.map((item, idx) => {
          return (
            <ContacUsComp
              key={idx}
              setFormData={setFormData}
              item={item}
              getAllContactUs={getAllContactUs}
            />
          );
        })}
        {!contactForms || contactForms.length === 0 ? (
          <div
            style={{
              color: "red",
              fontWeight: "700",
            }}
          >
            No contact us form
          </div>
        ) : null}
      </div>
      {formData ? (
        <div className="right_viewContactus">
          <h3>{formData.subject}</h3>
          <div>Name : {formData.name}</div>
          <div>Email : {formData.email}</div>
          <div>Phone No : +91{formData.phone}</div>
          <h5>{formData.content}</h5>
        </div>
      ) : (
        <span
          style={{
            color: "white",
          }}
        >
          Open a form
        </span>
      )}
    </div>
  );
};

export default ContactUsPage;
