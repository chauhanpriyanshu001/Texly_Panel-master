import React from "react";
import "./Profile.css";
import { useRef, useState, useEffect, useNavigate } from "react";
import BASE_URL from "../../variable";
import axios from "axios";
import backimage from "../../Assets/backgroundImg/backImage26.png";
import CustomAlert from "../../Alert/CustomAlert";

const ProfilePage = () => {
  const [admin, setAdmin] = useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const token = sessionStorage.getItem("adminToken");
  const formData = new FormData();

  const updateProfile = async (e) => {
    e.preventDefault();
    formData.append("name", dataForm.name);
    formData.append("mobileNumber", dataForm.mobileNumber);
    formData.append("gender", dataForm.gender);
    formData.append("profilePic", selectedFile);
    try {
      const res = await axios.put(`${BASE_URL}/admin/editProfile`, formData, {
        headers: {
          token,
        },
      });
      setAlertState({
        state: true,
        message: "Update Successfully",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong",
        severity: "error  ",
      });
    }
  };
  const getAdminProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/viewProfile`, {
        headers: {
          token,
        },
      });
      setAdmin(res.data.result);
      setDataForm({
        name: res.data.result.name,
        mobileNumber: res.data.result.mobileNumber,
        gender: res.data.result.gender,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getAdminProfile();
    scrollToTop();
  }, []);
  return (
    <div
      className="ProfilePage_container backImage"
      style={{
        backgroundImage: `url(${backimage})`,
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
      <form action="" className="ProfilePage_form" onSubmit={updateProfile}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        {!selectedImage ? ( 
          <img
            src={admin?.profilePic}
            onClick={handleUploadButtonClick}
            alt=""
          />
        ) : (
          <img src={selectedImage} onClick={handleUploadButtonClick} alt="" />
        )}
        <div className="ProfilePage_form_box">
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={dataForm?.name}
            className="input"
          />
          <input
            placeholder="Number"
            value={`+91 ${dataForm?.mobileNumber}`}
            type="text"
            className="input"
            disabled
          />
          <select
            style={{
              backgroundColor: "black",
              color: "white",
              padding: ".6vw",
            }}
            name="gender"
            onChange={handleChange}
            value={dataForm?.gender}
          >
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="FEMALE">Other</option>
          </select>
          <button type="submit" className="button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
