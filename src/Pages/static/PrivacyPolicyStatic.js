import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./static.css";
import BASE_URL from "../../variable";
import axios from "axios";
const PrivacyPolicyStatic = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [staticId, setstaticId] = useState(null);
  const getPrivacyPolicyContent = async () => {
    try {
      // const res = await axios.get(
      //   `${BASE_URL}/static/getStaticContent?_id=655ad583207869baa6a86d47`
      // );
      // console.log(res.data);
      // if (res.data.responseCode == 200) {
      //   setContent(res.data.result.description);
      //   console.log(res.data.result.description);
      // }
      const res = await axios.get(`${BASE_URL}/static/getStaticList`);
      res.data.result?.find((item) => {
        if (item.Type == "PRIVACY") {
          setstaticId(item._id);
          setContent(item.description);
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPrivacyPolicyContent();
  }, []);

  const UpdatePrivacyPolicyContent = async (newContent) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await axios.put(
        `${BASE_URL}/static/updateStaticContent/${staticId}`,
        {
          description: newContent,
        },
        {
          headers: {
            token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="termStatic_container">
      <h3>Privacy Policy</h3>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
          UpdatePrivacyPolicyContent(newContent);
        }}
      />
    </div>
  );
};

export default PrivacyPolicyStatic;
