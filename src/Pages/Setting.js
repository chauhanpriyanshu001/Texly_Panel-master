import * as React from "react";
import { useState } from "react";
import "./Setting.css";
import BASE_URL from "../variable";
import { useContext } from "react";
import { NameContext } from "../Context";
import { useEffect } from "react";

import axios from "axios";

const ChangePasswordForm = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.put(
        `${BASE_URL}/admin/changePassword`,
        { ...password },
        {
          headers: {
            token,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.responseMessage);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };
  return (
    <form className="setting_form" onSubmit={handleSubmit} action="">
      {error && (
        <span style={{ color: "red", marginLeft: "2.5vw" }}>{error}</span>
      )}

      <label htmlFor="password">Your password</label>
      <input
        error="true"
        className="input"
        name="oldPassword"
        value={password.oldPassword}
        onChange={handleChange}
        style={{
          border: "2px solid gray",
          width: "25vw",
        }}
        placeholder="Old Password"
        type="text"
        required
      />
      <label htmlFor="password1">New Password</label>
      <input
        onChange={handleChange}
        className="input"
        name="newPassword"
        value={password.newPassword}
        style={{
          border: "2px solid gray",
          width: "25vw",
        }}
        placeholder="New Password"
        type="text"
        required
      />
      <label htmlFor="password2">Type again</label>
      <input
        type="text"
        onChange={handleChange}
        className="input"
        name="confirmPassword"
        value={password.confirmPassword}
        style={{
          border: "2px solid gray",
          width: "25vw",
        }}
        placeholder="New Password"
        required
      />
      <button
        type="submit"
        className="button"
        style={{
          width:"25vw"
        }}
      >
        Submit
      </button>
    </form>
  );
};
const Setting = () => {
  const { setDashBoardName } = useContext(NameContext);
  useEffect(() => {
    setDashBoardName("Setting");
  }, []);

  return (
    <div className="Setting_container">
     <h1>Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default Setting;
