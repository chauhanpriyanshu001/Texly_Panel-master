import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../variable";
import { myStyle } from "../../GlobalCss";
import DataTable from "react-data-table-component";
import { Pagination } from "@mui/material";
import DateRange from "../../Components/DateRange/DateRange";
import PDFFile from "../../Components/PDFFile/PDFFile";
import { NameContext } from "../../Context";
import { useContext } from "react";

const TransactionPaymentpage = () => {
  const [trasactionList, setTrasactionList] = useState([]);
  const [filterState, setFilterState] = useState({
    status: "",
  });
  const [dateRangeState, setDateRangeState] = useState({
    startDate: "",
    endDate: "",
    display: false,
  });
  const { setDashBoardName } = useContext(NameContext);

  const getTransaction = async (offset) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getAllTransactions?startDate=${dateRangeState.startDate}&endDate=${dateRangeState.endDate}&offset=${offset}&status=${filterState.status}`,
        {
          headers: {
            token,
          },
        }
      );
      setTrasactionList(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

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
  useEffect(() => {
    setDashBoardName("Transaction Management");
  }, []);
  useEffect(() => {
    getTransaction();
  }, [dateRangeState, filterState]);
  return (
    <div>
      <div></div>
      <input
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
        value={filterState.status}
        onChange={(e) => {
          setFilterState((prev) => ({
            ...prev,
            status: e.target.value,
          }));
        }}
      >
        <option value="">Status</option>
        <option value="PENDING">Pending</option>
        <option value="PAID">Paid</option>
        <option value="FAILED">failed</option>
        <option value="captured">captured</option>
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
      />
    </div>
  );
};

export default TransactionPaymentpage;
