import React, { useEffect, useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./static.css";
import BASE_URL from "../../variable";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CustomAlert from "../../Alert/CustomAlert";

const TermStatic = () => {
  const editor = useRef(null);
  const location = useLocation();
  const { state } = location;
  console.log(location);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [content, setContent] = useState("");
  const [useid, setUseId] = useState(null);
  const [title, setTitle] = useState(null);

  const getStaticById = async () => {
    try {
      // const res = await axios.get(
      //   `${BASE_URL}/static/getStaticContent?_id=655ad583207869baa6a86d46`
      // );
      const res = await axios.get(
        `${BASE_URL}/static/getStaticContent?_id=${state}`
      );
      setContent(res.data?.result?.description);
      setTitle(res.data?.result?.title);
    } catch (error) {
      setAlertState({
        state: true,
        message: "Something went wrong ",
        severity: "error",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getStaticById();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.put(
        `${BASE_URL}/static/updateStaticContent/${state}`,
        {
          title,
          description: content,
        },
        {
          headers: {
            token,
          },
        }
      );
      console.log(res.data);
      setAlertState({
        state: true,
        message: `Updated successfully `,
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
      <h1>Edit Static</h1>
      <div className="EditStatic_Main">
        <form action="" onSubmit={handleUpdate}>
          <div>
            <span>Title</span>
            <input
              style={{
                width: "50%",
                marginLeft: "44% ",
                marginRight: "",
              }}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
              type="text"
              className="input"
            />
          </div>
          <h1>Description</h1>
          <div className="editor_container">
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>
          <button type="submit" className="EditStatic_container_button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TermStatic;
