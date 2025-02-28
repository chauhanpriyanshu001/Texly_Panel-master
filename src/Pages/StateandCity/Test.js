import React from "react";
import { GoogleMap, Autocomplete, Polygon } from "@react-google-maps/api";
import { DrawingManagerF } from "@react-google-maps/api";
import { useRef } from "react";
import carpng from "../../Assets/img/carpng.png";
import { MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASE_URL from "../../variable";
import { useLocation } from "react-router-dom";
import CustomAlert from "../../Alert/CustomAlert";
const center = { lat: 29.80153, lng: 76.39959 };
const Test = () => {
  const [search, setSearch] = useState();
  const cityRef = useRef();
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });
  const [locationState, setLocationState] = useState();
  const [formData, setFormData] = useState({
    state: "",
    city: "",
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const [path, setPath] = useState()
  const fetchPath = async (search) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${search}&polygon_geojson=1&format=json`
    );
    let filterGeoJsonType = res.data.filter(function (data) {
      return (
        data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
      );
    });
    const path = filterGeoJsonType[0].geojson.coordinates[0];
    const newArray = path.map((subArray) => {
      const [lng, lat] = subArray;
      return { lat, lng };
    });
    return newArray;
  };
  const { data: path2, isPending } = useQuery({
    queryFn: () => fetchPath(search),
    queryKey: [{ search }],
  });
  const getGeoFence = async () => {
    const res = await axios.get(`${BASE_URL}/admin/getStateAndCityWithFencing`);
    return res.data.result;
  };
  const { data: geoFences, isPending: isDonefeching } = useQuery({
    queryFn: () => getGeoFence(),
  });

  console.log(geoFences);
  const handleAddCity = async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/createStateCity`, {
        city: {
          cityName: formData.city,
          geoFencing: payload,
        },
        state: formData?.state,
      });
      setAlertState({
        state: true,
        message: "Added successfully",
        severity: "success",
      });
    } catch (error) {
      setAlertState({
        state: true,
        message: "Failed to add ",
        severity: "error",
      });
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4%",
        }}
      >
        <Autocomplete
          onLoad={(autocomplete) => setLocationState(autocomplete)}
          onPlaceChanged={() => {
            if (locationState != null) {
              const place = locationState.getPlace();
              const state = place?.address_components[3]?.long_name;
              const city = cityRef.current.value;

              setFormData((prev) => ({
                state,
                city,
              }));
              const lat = place?.geometry.location.lat();
              const lng = place?.geometry.location.lng();
              map.panTo({ lat, lng });
              setSearch(cityRef.current.value);
            }
          }}
        >
          <input ref={cityRef} className="input" type="text" />
        </Autocomplete>
        {formData.city && (
          <button
            onClick={() => {
              handleAddCity(path2);
            }}
            className="button"
          >
            Add {formData.city}
          </button>
        )}
      </div>
      {isDonefeching && <div>Loading fences....</div>}
      <br />
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {path2 && (
          <Polygon
            path={path2}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#FF000020",
              fillOpacity: 0.35,
            }}
          />
        )}
        {geoFences &&
          geoFences.map((item) => {
            return item.Cities?.map((mainJioFenceData) => {
              const citiesGeofence = mainJioFenceData.city.geoFencing;
              return (
                <Polygon
                  path={citiesGeofence}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: "#FF000020",
                    fillOpacity: 0.35,
                  }}
                />
              );
            });
          })}
      </GoogleMap>
    </div>
  );
};

export default Test;
