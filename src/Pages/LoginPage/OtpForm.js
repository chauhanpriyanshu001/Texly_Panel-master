import React from "react";
import OtpInput from "react-otp-input";
import "./OtpForm.css";


const OtpForm = ({ otp, setOtp }) => {

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      containerStyle="otp-input"
      AllowedInputTypes='number'
      numInputs={4}
      renderSeparator={<span>{"  "}</span>}
      renderInput={(props) => <input 
        shouldAutoFocus	={true}
        {...props} 
      />}
    />
  );
};

export default OtpForm;
