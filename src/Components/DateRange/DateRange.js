import React from "react";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
const usestyle = makeStyles((theme) => ({
  datePicker: {
    BorderColor: "gray",
  },
}));
const newTheme = (theme) =>
  createTheme({
    ...theme,
    components: {
      MuiDateCalendar: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });

const DateRange = ({ dateRangeState, setDateRangeState, functionToCall }) => {
  function handleSelect(ranges) {
    setDateRangeState({ ...ranges.range1 });
  }
  const [stringValue, setStringValue] = useState({
    startDate: "",
    endDate: "",
  });
  const today = dayjs();
  useEffect(() => {
    setDateRangeState((prev) => ({
      ...prev,
      startDate: today,
      endDate: today,
    }));
  }, []);
  useEffect(() => {
    setStringValue((prev) => ({
      ...prev,
      startDate: dateRangeState.startDate
        ? dayjs(dateRangeState.startDate).format("DD-MM-YYYY")
        : "",
      endDate: dateRangeState.endDate
        ? dayjs(dateRangeState.endDate).format("DD-MM-YYYY")
        : "",
    }));
  }, []);

  return (
    <div
      style={{
        display: "inline",
        width: "10%",
        overflow: "visible",
      }}
    >
      <button
        onClick={() => {
          setDateRangeState({
            ...dateRangeState,
            display: !dateRangeState.display,
          });
        }}
        style={{
          marginLeft: "1%",
        }}
        className="button"
      >
        {dateRangeState.display ? "Close form" : "Select Range"}
      </button>
      <div
        style={{
          color: "white",
        }}  
      >
        <span>from : {stringValue.startDate}</span>
        {"   "}
        <span>To : {stringValue.endDate}</span>
      </div>
      <div
        style={{
          display: dateRangeState.display ? "inline-flex" : "none",
          gap: "1vw",
          padding: " 5px 15px ",
          borderRadius: "1vw",
          position: "fixed",
          backgroundColor: "var(--backColor16)",
          position: "relative",
          zIndex: "10",
          overflow: "visible",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {/* <ThemeProvider theme={newTheme}>
              </ThemeProvider> */}
            <DatePicker
              className={usestyle.datePicker}
              sx={{
                borderColor: "white",
              }}
              disableFuture="true"
              label="from"
              value={dateRangeState.startDate}
              onChange={(newValue) => {
                setDateRangeState((prev) => ({
                  ...prev,
                  startDate: newValue,
                }));
              }}
            />
          </DemoContainer>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              disableFuture="true"
              label="To"
              value={dateRangeState.endDate}
              onChange={(newValue) => {
                setDateRangeState((prev) => ({
                  ...prev,
                  endDate: newValue,
                }));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <button
          onClick={() => {
            functionToCall();
            setDateRangeState({
              ...dateRangeState,
              display: !dateRangeState.display,
            });
          }}
          style={{
            margin: "1vw 0vw",
          }}
          className="button"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default DateRange;

{
  /* <DateRangePicker ranges={[dateRangeState]} onChange={handleSelect} /> */
}
