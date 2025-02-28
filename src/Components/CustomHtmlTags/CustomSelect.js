import React from "react";

const CustomSelect = ({ data, setValue, value }) => {
  return (
    <select
      style={{
        backgroundColor: "black",
        color: "white",
        padding: ".6vw",
        marginLeft: "2%",
      }}
      value={rideStatus}
      onChange={(e) => {
        setRideStatus(e.target.value);
      }}
    >
      <option value="">Status</option>
    </select>
  );
};

export default CustomSelect;
