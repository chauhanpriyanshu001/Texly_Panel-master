import React, { useEffect, useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./static.css";
import BASE_URL from "../../variable";
import axios from "axios";
import { Button } from "@mui/material";
import CustomAlert from "../../Alert/CustomAlert";
import { useNavigate } from "react-router-dom";

const AddStatic = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [useid, setUseId] = useState(null);
  const [title, setTitle] = useState(null);
  const [Type, setType] = useState(null);
  // const getPrivacyPolicyContent = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}/static/getStaticContent?_id=655ad583207869baa6a86d46`
  //     );
  //     const res = await axios.get(`${BASE_URL}/static/getStaticList`);
  //     res.data.result?.find((item) => {
  //       console.log(item);
  //       if (item.Type == "T&C") {
  //         setUseId(item._id);
  //         setContent(item.description);
  //         return;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const AddStaticHandler = async (e) => {
    e.preventDefault();
    try {

      const token = sessionStorage.getItem("adminToken");
      const res = await axios.post(
        `${BASE_URL}/static/addStatic`,
        {
          title,
          type:Type,
          description: content,
        },
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: ` Created successfully `,
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

  return (
    <div className="EditStatic_container">
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
      <h1>
        Add Static
        <Button
          variant="contained"
          style={{
            marginLeft: "1vw",
          }}
          onClick={() => {
            navigate("/StaticManagement");
          }}
          color="success"
        >
          Go Back
        </Button>
      </h1>
      <div className="EditStatic_Main">
        <form action="" onSubmit={AddStaticHandler}>
          <div>
            Type
            <select
              name="Type"
              id=""
              onChange={(e) => {
                setType(e.target.value);
              }}
              style={{
                marginLeft: "4%",
              }}
              className="select"
            >
              <option value="">Select Type</option>
              <option value="T&C">Terms</option>
              <option value="PRIVACY">privacy</option>
            </select>
          </div>
          <div>
            <span>Title</span>
            <input
              style={{
                width: "50%",
                marginLeft: "44% ",
                marginRight: "",
              }}
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
              type="text"
              className="input"
            />
          </div>
          <h3>Description</h3>
          <div className="editor_container">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>
          <button
           type="submit"
            className="EditStatic_container_button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStatic;
