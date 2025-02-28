import React from "react";
import "./TCommision.css";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const TCommision = () => {
  const navigateTo = useNavigate();
  return (
    <div className="TCommision_container">
      <div
        className="main"
        style={{
          width: "100%",
        }}
        onClick={() => {
          navigateTo("/Dashboard/TodayCommision");
        }}
      >
        <h1>Today's Commision </h1>
        <div className="boxMain_container">
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />{" "}
              10000
            </h1>
            Total Amount
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
            Book Now Commision
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
            Book Later Commision
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              200
            </h1>
            Freight
          </div>
          <div className="box_main">
            <h1>
              <CurrencyRupeeIcon
                style={{
                  color: "green",
                }}
              />
              1000
            </h1>
            Total Commision
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCommision;
