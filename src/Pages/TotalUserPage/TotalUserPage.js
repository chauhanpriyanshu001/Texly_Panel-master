import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BASE_URL from "../../variable";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateRangePicker } from "react-date-range";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BlockIcon from "@mui/icons-material/Block";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import CustomAlert from "../../Alert/CustomAlert";
import { NameContext } from "../../Context";
import { myStyle } from "../../GlobalCss";
import Pagination from "@mui/material/Pagination";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DateRange from "../../Components/DateRange/DateRange";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableRow = ({ item, GetAllUser, count }) => {
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [deleteStatus, setDeleteStatus] = React.useState(false);
  const {
    mobileNumber,
    gender,
    status,

    _id,
  } = item;
  const navigate = useNavigate();
  //delete user modal
  const handleOpen1 = () => setDeleteStatus(true);

  const handleClose1 = () => setDeleteStatus(false);

  const handleDelete = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/deleteUserById/${_id}`,
        {
          headers: {
            token,
          },
        }
      );
      GetAllUser();
      handleClose1();
      setAlertState({
        state: true,
        message: "Update Successfully",
        severity: "success",
      });
    } catch (error) {
      console.log({ error, message: "from Total user page" });
      setAlertState({
        state: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };
  const handleBlockUser = async (updateTo) => {
    const token = sessionStorage.getItem("adminToken");

    try {
      await axios.post(
        `${BASE_URL}/admin/updateUserStatus/${_id}`,
        {
          status: updateTo,
        },
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: `Status ${updateTo} Successfully`,
        severity: "success",
      });
      GetAllUser();
    } catch (error) {
      console.log(error);
      setAlertState({
        state: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(createdAtDate);
  return (
    <tr>
      <td
        style={{
          width: "1%",
        }}
      >
        {count + 1}
      </td>
      <td>{item?.name ? item.name : "N/A"}</td>
      <td style={{ width: "18%" }}>{mobileNumber}</td>
      <td>{gender}</td>
      <td
        style={{
          color: status == "ACTIVE" ? "green" : "red",
        }}
      >
        {status}
      </td>
      <td
        onClick={() => {
          navigate("/DashBoard/TotalUser/viewUser", { state: { item } });
        }}
      >
        <VisibilityIcon
          sx={{
            color: "white",
          }}
        />
      </td>
      <td>
        <DeleteIcon
          onClick={() => {
            setDeleteStatus(!deleteStatus);
          }}
          style={{ color: "red" }}
        />

        <Modal
          open={deleteStatus}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Delete {item?.name} All data </h2>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>

            <Button
              variant="Contained"
              color="success"
              onClick={() => {
                setDeleteStatus(false);
              }}
            >
              No
            </Button>
          </Box>
        </Modal>
      </td>
      <td
        style={{
          width: "10%",
        }}
      >
        <CustomAlert
          open={alertState.state}
          severity={alertState.severity}
          message={alertState.message}
          onClose={() => {
            setAlertState({ ...alertState, state: false });
          }}
        />
        {status !== "ACTIVE" ? (
          <BlockIcon
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBlockUser("ACTIVE");
            }}
          />
        ) : (
          <Brightness1Icon
            style={{
              color: "green",
              cursor: "pointer",
            }}
            onClick={() => {
              handleBlockUser("BLOCK");
            }}
          />
        )}
      </td>
    </tr>
  );
};

function TotalUserPage() {
  const { setDashBoardName } = useContext(NameContext);
  const [rowData, setRowData] = useState(null);
  const [search, setSearch] = useState("");
  const [blockStatus, setBlockStatus] = React.useState();
  const [status, setStatus] = useState("");
  const [dateRangeState, setDateRangeState] = useState({
    startDate: "",
    endDate: "",
    display: false,
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  const GetAllUser = async (offset) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/getAllUserAndSearchFilter?search=${search}&status=${status}&blockStatus=${blockStatus}&offset=${offset}&startDate=${dateRangeState.startDate}&endDate=${dateRangeState?.endDate}`,
        {
          headers: {
            token,
          },
        }
      );
      setRowData(response.data);
    } catch (error) {
      console.log({ error, message: "error in api.js" });
    }
  };
  const handleChange = (event) => {
    setBlockStatus(event.target.value);
    setSearch("");
  };
  const handleChange2 = (event) => {
    setStatus(event.target.value);
    setSearch("");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      GetAllUser();
    }, parseInt(process.env.REACT_APP_REFRESH_TIME, 10));
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    setDashBoardName("User Management");
  }, []);
  useEffect(() => {
    GetAllUser();
  }, [status, blockStatus]);

  const columns = [
    {
      name: "User Name",
      selector: (row) =>
        !row?.userName ? (
          "---------------"
        ) : (
          <div className="py-2">{row?.name}</div>
        ),
    },
    {
      name: "Number",
      selector: (row) => (
        <div className="py-2">
          {row?.mobileNumber ? row?.mobileNumber : "DDDDDDDDD"}
        </div>
      ),
    },
    {
      name: "Gender",
      selector: (row) => (
        <div
          className="py-2"
          style={{
            color: row.status == "ACTIVE" ? "green" : "red",
          }}
        >
          {row?.status ? row?.status : "N/A"}
        </div>
      ),
    },
    {
      name: "View",
      selector: (row) => (
        <div className="py-2">
          <VisibilityIcon color="success" />
        </div>
      ),
    },
    {
      name: "Booking Number",
      selector: (row) => <div className="py-2">{row?.bookingNumber}</div>,
    },
    {
      name: "Booking Type",
      selector: (row) => <div className="py-2">{row?.bookingType}</div>,
    },
    {
      name: "Accepted fare",
      selector: (row) => (
        <div className="py-2">
          {row.acceptedFare ? row?.acceptedFare : "Not accepted"}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div
          className="py-2"
          onClick={() => {
            console.log(row.id);
            // $("id").show();
            // document.getElementById("rowid").value = row.id;
            navigate("/BookingManagement/Details", { state: row });
          }}
        >
          <VisibilityIcon />
        </div>
      ),
    },
    {
      name: "Driver Numner",
      selector: (row) =>
        row?.online === true ? (
          <div className="text-green-500 p-1 font-semibold">Online</div>
        ) : (
          <div className="text-red-500 p-1 font-semibold">Offline</div>
        ),
    },
  ];
  const userPdf = useRef();

  const generatePdf = useReactToPrint({
    content: () => userPdf.current,
    documentTitle: "usersData",
  });
  return (
    <div style={{ width: "100%", minHeight: "83.8vh" }}>
      <input
        type="text"
        value={search}
        className="input"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") GetAllUser();
        }}
        placeholder="Seach by Number & Name "
      />
      <Button
        variant="contained"
        onClick={() => {
          GetAllUser();
        }}
        style={{
          backgroundColor: "var(--back)",
          marginLeft: "1%",
        }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
      
      <select
        className="select"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "2%",
        }}
        value={status}
        onChange={handleChange2}
      >
        <option value="">Status</option>
        <option value="BLOCK">Block</option>
        <option value="ACTIVE">Active</option>
        <option value="DELETE">Delete</option>
      </select>
      <select
        className="select"
        style={{
          backgroundColor: "black",
          color: "white",
          padding: ".6vw",
          marginLeft: "1%",
        }}
        value={blockStatus}
        onChange={handleChange}
      >
        <option value="">Block/Unblock</option>
        <option value="BLOCKED">Blocked</option>
        <option value="UNBLOCKED">Unblocked</option>
      </select>
      <button className="button" onClick={generatePdf}>
        Download Pdf
      </button>
      <DateRange
        setDateRangeState={setDateRangeState}
        dateRangeState={dateRangeState}
        functionToCall={GetAllUser}
      />
      <table ref={userPdf}>
        <tr>
          <th>Sn.</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Gender</th>
          <th>Status</th>
          <th>View</th>
          <th>Delete</th>
          <th>Block/Unblock</th>
        </tr>
        {rowData?.result?.map((item, idx) => {
          return (
            <TableRow
              item={item}
              key={idx}
              count={idx}
              GetAllUser={GetAllUser}
            />
          );
        })}
      </table>
      {/* <DataTable
      columns={columns}
      data={allBooking?.result}
      highlightOnHover
      fixedHeader
      fixedHeaderScrollHeight="70vh"
      customStyles={myStyle}
      /> */}

      <Pagination
        color="primary"
        sx={myStyle.pagination}
        count={setRowData.pages}
        showFirstButton
        showLastButton
        onChange={(e, value) => {
          GetAllUser(value - 1);
        }}
      />
    </div>
  );
}
export default TotalUserPage;
