import React from "react";

import texlyIcon from "../../Assets/img/texly.png";

import "./PDFFILE.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const PDFFile = () => {
  const pdfRef = useRef();
  const generatePdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "userData",
  });
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <button className="button" onClick={generatePdf}>
        Download Pdf
      </button>
      <div ref={pdfRef} className="PDFIle_container">
        <div className="header_container">
          <div
            style={{
              display: "flex",
            }}
          >
            <img src={texlyIcon} className="headerImage" alt="" />
            <h2>Texly</h2>
          </div>
          <h2>Tax Invoice</h2>
        </div>
        <div className="PDFIle_box1">
          <ul>
            <li>Biling to</li>
            <li>Texly Private limited</li>
            <li>VPO SOTHA, TEH SIWAN, DIST KAITHAL</li>
            <li>Haryana, India, Pin: 136033</li>
            <li>State: Haryana(06)</li>
            <li>GSTIN : NA</li>
          </ul>
          <ul>
            <li>Invoice No: HI2312-018768</li>
            <li>Date: 31-12-2023</li>
          </ul>
        </div>
        <div className="PDFIle_box1">
          <ul>
            <li>TOTAL INVOICE VALUE (IN FIGURE):</li>
            <li>TOTAL INVOICE VALUE (IN Words):</li>
            <li>AMOUNT OF TAX SUBJECT TO REVERSE CHARGES:</li>
          </ul>
          <ul>
            <li>INR 944.00</li>
            <li>Nine hundred fourty four rupees</li>
            <li>Nil</li>
          </ul>
        </div>
        <div className="PDFIle_box2">
          <span>
            <span>For VoiceTree Texly Pvt.Ltd</span>
            {/* stamp image here */}
            {/* <img src="" alt="" /> */}
            <span>Authorised Signatory</span>
            <span>"Original for recipient</span>
          </span>
        </div>
        <div className="PDFIle_box3">
          <div>THANK YOU FOR YOUR BUSINESS</div>
          <hr />
          <span>
            MSME #: DL01F0006288 GSTIN # : 07AADCV4633J1Z6 PAN # : AADCV4633J,
            CIN : U72900WB2010PTC154431 State code - 07 "Delhi"
          </span>
          <span>
            Billing address: VoiceTree Technologies Pvt Ltd, Ground Floor,
            B1/H3, Mathura Road, Mohan Co-operative Ind. Area, East-Delhi,
            Delhi, 110044 Corporate office: VoiceTree Technologies Pvt Ltd, 3rd
            Floor, D-107, Near Priyagold Building, Sector-2, Noida, Uttar
            Pradesh - 201301, India Regd office: VoiceTree Technologies Pvt Ltd,
            2A, 6th Floor, Ecospace Business Park Premises AA II, Newtown,
            Rajarhat Kolkata Parganas North WB 700156 IN
          </span>
          <span>
            Contact at: Ph. 92129-92129. e-mail : support@myoperator.co Website
            : www.myoperator.co
          </span>
          <hr />
        </div>
        <div className="PDFIle_box4">
          This is a computer generated digital invoice, no signature required.
        </div>
      </div>
    </div>
  );
};

export default PDFFile;
