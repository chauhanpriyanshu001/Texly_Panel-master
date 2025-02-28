import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


const FreightCommision = () => {
  return (
    <div className="Freight_Commision">
      <div
        className="main"
        style={{
          width: "100%",
        }}
      >
        <h1>Freight Commision History </h1>
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

export default FreightCommision;
