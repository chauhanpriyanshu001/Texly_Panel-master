
import React, { useState,useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import "./static.css"
import BASE_URL from '../../variable';
import axios from 'axios';
const AboutUsStatic = () => {
  const editor = useRef(null);
	const [content, setContent] = useState('');

  const getPrivacyPolicyContent = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/static/getStaticContent?_id=655ad583207869baa6a86d48`
      );
      console.log(res.data);
      if (res.data.responseCode == 200) {
        setContent(res.data.result.description);
        console.log(res.data.result.description);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPrivacyPolicyContent();
  }, []);

  const UpdatePrivacyPolicyContent = async (newContent) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/static/updateStaticContent/655ad583207869baa6a86d48`,
        {
          description: newContent,
        },
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwMmM2NjEzZmVmNDJhZjAxYTUwMDMiLCJtb2JpbGVOdW1iZXIiOiIzMjQ1NjQ5MjEzMyIsImlhdCI6MTcwMDgwMjY4OCwiZXhwIjoxNzAxMjM0Njg4fQ.UAogr3-pxnwzWs3-HPyRTss8IWcHBOQ0zwHWb7yYaSc",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrivacyPolicyContent();
  }, []);  
  
  return (
    <div className='termStatic_container'>
      <JoditEditor
			ref={editor}
			value={content}
			onChange={(newContent) => {
        setContent(newContent)
        UpdatePrivacyPolicyContent(newContent)
      }}
		/>
    </div>
  )
}

export default AboutUsStatic