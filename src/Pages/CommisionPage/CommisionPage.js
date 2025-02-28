import React, { useEffect, useState } from "react";
import DateRange from "../../Components/DateRange/DateRange";
import { Pagination } from "@mui/material";
import { myStyle } from "../../GlobalCss";
import BASE_URL from "../../variable";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import PDFFile from "../../Components/PDFFile/PDFFile";
import { PDFViewer } from "@react-pdf/renderer";
import { NameContext } from "../../Context";
import { useContext } from "react";
const CommisionPage = () => {
  const {setDashBoardName}=useContext(NameContext)
  const columns = [
    {
      name: "transactionId",
      selector: (row) =>
        !row?.transactionId ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.transactionId}</div>
        ),
    },
    {
      name: "transactionType",
      selector: (row) =>
        !row?.transactionType ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.transactionType}</div>
        ),
    },
    {
      name: "amount",
      selector: (row) =>
        !row?.amount ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.amount}</div>
        ),
    },
    {
      name: "status",
      selector: (row) =>
        !row?.status ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.status}</div>
        ),
    },
    {
      name: "dateTime",
      selector: (row) =>
        !row?.dateTime ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.dateTime}</div>
        ),
    },
  ];
  useEffect(()=>{
    setDashBoardName("Commision Page")
  },[])
  return (
    <div>
        <PDFFile />
      {/* <input
        type="text"
        className="input"
        placeholder="Seach Something"
        onKeyDown={(e) => {
          if (e.key === "Enter");
        }}
      />
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
        <option value="PENDING">Pending</option>
        <option value="STARTED">Started</option>
        <option value="ONGOING">Ongoing</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <Button
        variant="contained"
        style={{
          backgroundColor: "var(--back)",
          marginLeft: "1%",
        }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
      <DateRange
        setDateRangeState={setDateRangeState}
        dateRangeState={dateRangeState}
      />
      <DataTable
        columns={columns}
        data={trasactionList?.result}
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        customStyles={myStyle}
      />
      <Pagination
        color="primary"
        sx={myStyle.pagination}
        count={trasactionList?.pages}
        showFirstButton
        showLastButton
        onChange={(e, value) => {
          getTransaction(value - 1);
        }}
      /> */}
    </div>
  );
};

export default CommisionPage;
