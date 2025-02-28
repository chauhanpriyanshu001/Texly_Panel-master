import React from "react";
import "./BNCommision.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { useNavigate } from "react-router-dom";
const BNCommision = () => {
  const navigateTo = useNavigate();
  return (
    <div className="BNCommision_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
        onClick={() => {
          navigateTo("/Dashboard/BNCommision");
        }}
      >
        <h1>Book Now Commision History </h1>

        <div className="boxMain_container">
        <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              14000
            </h1>
            Total Booking Amount
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              400
            </h1>
            Today
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              500
            </h1>
            Yesterday
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              300
            </h1>
            Day Before Yesterday
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              1200
            </h1>
            Total Commision 
          </div>
        </div>
      </div>
    </div>
  );
};

export default BNCommision;
