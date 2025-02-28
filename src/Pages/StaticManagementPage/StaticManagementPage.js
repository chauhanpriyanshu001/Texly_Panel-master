import React from "react";
import "./StaticManagementPage.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NameContext } from "../../Context";
import { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BASE_URL from "../../variable";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import CustomAlert from "../../Alert/CustomAlert";
import axios from "axios";
import { NavigateNext } from "@mui/icons-material";
const StaticRow = ({ item ,getStaticListHandler,setAlertState}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.delete(
        `${BASE_URL}/static/deleteStaticContent/${item._id}`,
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: `Deleted successfully `,
        severity: "success",
      });
      getStaticListHandler();
    } catch (error) {
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
    }
  };
  console.log(item);
  const { Type, title, status } = item;
  return (
    <tr>
      <td>{Type}</td>
      <td>{title}</td>
      <td>{status}</td>
      <td
        style={{
          color: "green",
        }}
        onClick={() => {
          navigate("/StaticManagement/EditStatic", {
            state: item._id,
          });
        }}
      >
        <EditIcon />
      </td>
      <td
        style={{
          color: "red",
        }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </td>
    </tr>
  );
};
const StaticManagementPage = () => {
  const { setDashBoardName } = useContext(NameContext);
  const [staticList, setStaticList] = useState(null);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const getStaticListHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/static/getStaticList`);
      setStaticList(res.data?.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStaticListHandler();
    setDashBoardName("Static Management");
  }, []);
  const navigate = useNavigate();
  return (
    <div className="StaticManagementPage_container">
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
      <button
      className="button"
        style={{
          float: "right",
          width: "min-content",
        }}
        onClick={() => {
          navigate("/AddStatic");
        }}
      >
        Add
      </button>
      <table>
        <tr>
          <th>Type </th>
          <th>Title </th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {staticList?.map((item, index) => {
          return <StaticRow
          setAlertState={setAlertState}
          getStaticListHandler={getStaticListHandler}
          key={index} index={index} item={item} />;
        })}
      </table>
      {/* <button
        className="button"
        // onClick={() => {
        //   navigate("/Terms&conditionStatic");
        // }}
      >
        Terms and condition{" "}
      </button>
      <button
        className="button"
        onClick={() => {
          navigate("/AboutUsStatic");
        }}
      >
        About us{" "}
      </button>
      <button
        className="button"
        onClick={() => {
          navigate("/PrivacyPolicy");
        }}
      >
        Privacy Policy{" "}
      </button> */}
    </div>
  );
};

export default StaticManagementPage;
