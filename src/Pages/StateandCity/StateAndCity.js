import React, { useRef } from "react";
import BASE_URL from "../../variable";
import { useState, useEffect } from "react";
import axios from "axios";
import "./StateAndCity.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomAlert from "../../Alert/CustomAlert";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NameContext } from "../../Context";
//map imports
const center = { lat: 29.80153, lng: 76.39959 };

let polygonRef = [];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
//send data on delete api
// const res = await axios.delete(
//   `${}admin/deleteStateAndCity`,

//   {
//     headers: {
//       token,
//     },
//     data: {
//       source: {
//         stateId,
//         cityId: city._id,
//       },
//     },
//   }

const CityComp = ({ cityData, stateId, setAlertState, getAllStateAndCity }) => {
  const { city, _id } = cityData;
  

  const handleDelete = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/deleteStateAndCity`,

        {
          cityIdToDelete: _id,
          stateCityId: stateId,
        },
        {
          headers: {
            token,
          },
        }
      );
      setAlertState({
        state: true,
        message: "Deleted Successfully ",
        severity: "success",
      });
      getAllStateAndCity();
    } catch (error) {
      setAlertState({
        state: true,
        message: "Deleting City Req Failed ",
        severity: "error",
      });
      console.log(error);
    }
  };
  return (
    <div
      key={city._id}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {city?.cityName}
      <span
        onClick={() => {
          handleDelete();
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <DeleteIcon
          style={{
            color: "red",
          }}
        />
      </span>
    </div>
  );
};
const TableComponent = ({ item, getAllStateAndCity, setAlertState, idx }) => {
  const stateId = item._id;
  return (
    <tr>
      <td
        style={{
          width: "5%",
        }}
      >
        {idx}
      </td>
      <td>{item.stateName}</td>
      <td
        style={{
          padding: "0% 1% ",
        }}
      >
        {item.Cities?.map((city) => {
          return (
            <CityComp
              setAlertState={setAlertState}
              cityData={city}
              key={item._id}
              getAllStateAndCity={getAllStateAndCity}
              stateId={stateId}
            />
          );
        })}
      </td>
    </tr>
  );
};
const StateAndCity = () => {
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [data, setData] = useState(null);
  const token = sessionStorage.getItem("adminToken");

  const getAllStateAndCity = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/getStateAndCityWithFencing`,
        {
          headers: {
            token,
          },
        }
      );
      setData(res.data.result);
    } catch (error) {
      setAlertState({
        state: true,
        message: "Tabel State City data fetch failed ",
        severity: "error",
      });
      console.log(error);
    }
  };

  const { setDashBoardName } = useContext(NameContext);

  useEffect(() => {
    getAllStateAndCity();
    setDashBoardName("State and city")
  }, []);

  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "80vh",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <button
        className="button"
        onClick={() => {
          navigate("/test", {
            state: {
              stateAndcityData: data,
            },
          });
        }}
      >
        Add City
      </button>
      <h1
        style={{
          color: "white",
        }}
      >
        State And City
      </h1>

      {/* <Button onClick={handleOpen} variant="outlined">
        Add new City
      </Button> */}
      <table>
        <tr>
          <th>Sn.</th>
          <th>State </th>
          <th>City</th>
        </tr>
        {data?.map((item, index) => {
          {
            return (
              <TableComponent
                item={item}
                key={index}
                idx={index + 1}
                setAlertState={setAlertState}
                getAllStateAndCity={getAllStateAndCity}
              />
            );
          }
        })}
      </table>
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => {
          setAlertState({ ...alertState, state: false });
        }}
      />
    </div>
  );
};

export default StateAndCity;
