import React from "react";
import "./BLCommision.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const BLCommision = () => {
  return (
    <div className="BLCommision_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Book Later Commision History </h1>
        <div className="boxMain_container">
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              1400
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

export default BLCommision;
