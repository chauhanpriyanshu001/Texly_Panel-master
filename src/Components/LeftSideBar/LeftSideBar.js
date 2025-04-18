// import React from "react";
// import "../../App.css"
// import List from "@mui/material/List";
// import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
// import { useNavigate } from "react-router-dom";
// import DriveEtaRoundedIcon from "@mui/icons-material/DriveEtaRounded";
// import PersonIcon from "@mui/icons-material/Person";
// import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
// import GavelIcon from "@mui/icons-material/Gavel";
// import BookIcon from "@mui/icons-material/Book";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import MoneyRoundedIcon from '@mui/icons-material/MoneyRounded';
// import GroupIcon from '@mui/icons-material/Group';
// const BarComponent = ({ open, text, number, first, setFirst }) => {
//   const navigateto = useNavigate();

//   return (
//     <ListItem
//       key={text}
//       disablePadding
//       className="panel_List"
//       sx={{
//         display: "block",
//         color:"var(--textColor1)",
//         borderRadius:"20px 0px  0px 20px " ,
//         backgroundColor: first == number ? "#1d393c" : "",
//       }}
//       onClick={() => {
//         setFirst(number);
//         navigateto(`${text}`);
//       }}
//     >
//       <ListItemButton
//         sx={{
//           minHeight: 48,
//           justifyContent: open ? "initial" : "center",
//           px: 2.5,
//         }}
//       >
//         <ListItemIcon
//           sx={{
//             minWidth: 0,
//             mr: open ? 3 : "auto",
//             justifyContent: "center",
//           }}
//         >
//           {text == "Dashboard" && (
//             <SpaceDashboardIcon
//               style={{
//                 color: "var(--backColor20)",
//               }}
//             />
//           )}
//           {text == "UserManagement" && (
//             <PersonIcon
//               style={{
//                 color: "var(--backColor11)",
//               }}
//             />
//           )}
//           {text == "DriverManagement" && (
//             <LocalTaxiIcon
//               style={{
//                 color: "var(--backColor21)",
//               }}
//             />
//           )}
//           {text == "commision" && (
//             <MoneyRoundedIcon
//               style={{
//                 color: "var(--backColor21)",
//               }}
//             />
//           )}
//           {text == "VehicleManagement" && (
//             <DriveEtaRoundedIcon
//               style={{
//                 color: "var(--backColor14)",
//               }}
//             />
//           )}
//           {text == "StaticManagement" && (
//             <GavelIcon
//               style={{
//                 color: "yellow",
//               }}
//             />
//           )}
//           {text == "BookingManagement" && <BookIcon
//           style={{
//             color:"var(--backColor12)"
//           }}
//           />}
//           {text == "TransactionManagement" && (
//             <CurrencyRupeeIcon
//               style={{
//                 color: "var(--backColor21)",
//               }}
//             />
//           )}
//           {text == "WithdrawlManagement" && (
//             <CurrencyExchangeIcon
//               style={{
//                 color: "var(--backColor5)",
//               }}
//             />
//           )}
//           {text == "ContactUs" && (
//             <ContactMailIcon
//               style={{
//                 color: "var(--backColor6)",
//               }}
//             />
//           )}
//           {text == "State&City" && (
//             <LocationCityIcon
//               style={{
//                 color: "var(--backColor7)",
//               }}
//             />
//           )}
//             {text == "Add Support" && (
//               <GroupIcon
//                 style={{
//                   color: "var(--backColor29)",
//                 }}
//               />
//             )}
//           {text == "Setting" && (
//             <SettingsSuggestIcon
//               style={{
//                 color: "var(--backColor29)",
//               }}
//             />
//           )}
//           {/* <MailIcon
//             sx={{
//               fontSize: 30,
//               color: "#00000",
//               padding: ".4vw",
//               backgroundColor: "var(--dark)",
//               borderRadius: "50%",
//             }}
//           /> */}
//         </ListItemIcon>
//         <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//       </ListItemButton>
//     </ListItem>
//   );
// };

// const LeftSideBar = ({ open }) => {
//   const [first, setFirst] = React.useState(0);
//   const ListConst = [
//     "Dashboard",
//     "UserManagement",
//     "DriverManagement",
//     "VehicleManagement",
//     "StaticManagement",
//     "commision",
//     "BookingManagement",
//     "TransactionManagement",
//     "WithdrawlManagement",
//     "State&City",
//     "ContactUs",
//     "Add Support",
//     "Setting",
//   ];
//   const ListConst2 = [
//     "ContactUs",
//   ];
//   return (
//     <List>
//       {ListConst.map((text, index) => {
//         return (
//           <BarComponent
//             open={open}
//             key={index}
//             first={first}
//             setFirst={setFirst}
//             number={index}
//             text={text}
//           />
//         );
//       })}
//     </List>
//   );
// };

// export default LeftSideBar;

import React, { useEffect } from "react";
import "../../App.css"
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import DriveEtaRoundedIcon from "@mui/icons-material/DriveEtaRounded";
import PersonIcon from "@mui/icons-material/Person";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import GavelIcon from "@mui/icons-material/Gavel";
import BookIcon from "@mui/icons-material/Book";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MoneyRoundedIcon from '@mui/icons-material/MoneyRounded';
import GroupIcon from '@mui/icons-material/Group';
import DiscountIcon from '@mui/icons-material/Discount';
import SosIcon from '@mui/icons-material/Sos';
// import io from "socket.io-client";

import alertSound from "../../alert.mp3";
import { SOS_URL } from "../../variable";
import socket from "../../socket";
const BarComponent = ({ open, text, number, first, setFirst }) => {
  const navigateto = useNavigate();

  return (
    <ListItem
      key={text}
      disablePadding
      className="panel_List"
      sx={{
        display: "block",
        color: "var(--textColor1)",
        borderRadius: "20px 0px  0px 20px ",
        backgroundColor: first == number ? "#1d393c" : "",
      }}
      onClick={() => {
        setFirst(number);
        navigateto(`${text}`);
      }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {text == "Dashboard" && (
            <SpaceDashboardIcon
              style={{
                color: "var(--backColor20)",
              }}
            />
          )}
          {text == "UserManagement" && (
            <PersonIcon
              style={{
                color: "var(--backColor11)",
              }}
            />
          )}
          {text == "DriverManagement" && (
            <LocalTaxiIcon
              style={{
                color: "var(--backColor21)",
              }}
            />
          )}
          {text == "commision" && (
            <MoneyRoundedIcon
              style={{
                color: "var(--backColor21)",
              }}
            />
          )}
          {text == "VehicleManagement" && (
            <DriveEtaRoundedIcon
              style={{
                color: "var(--backColor14)",
              }}
            />
          )}
          {text == "StaticManagement" && (
            <GavelIcon
              style={{
                color: "yellow",
              }}
            />
          )}
          {text == "BookingManagement" && <BookIcon
            style={{
              color: "var(--backColor12)"
            }}
          />}
          {text == "TransactionManagement" && (
            <CurrencyRupeeIcon
              style={{
                color: "var(--backColor21)",
              }}
            />
          )}
          {text == "WithdrawlManagement" && (
            <CurrencyExchangeIcon
              style={{
                color: "var(--backColor5)",
              }}
            />
          )}
          {text == "ContactUs" && (
            <ContactMailIcon
              style={{
                color: "var(--backColor6)",
              }}
            />
          )}
          {text == "State&City" && (
            <LocationCityIcon
              style={{
                color: "var(--backColor7)",
              }}
            />
          )}
          {text == "AddSupport" && (
            <GroupIcon
              style={{
                color: "var(--backColor29)",
              }}
            />
          )}
          {text == "SOS" && (
            <SosIcon
              style={{
                color: "var(--backColor29)",
              }}
            />
          )}
          {text == "Setting" && (
            <SettingsSuggestIcon
              style={{
                color: "var(--backColor29)",
              }}
            />
          )}
          {text == "Promo" && (
            <DiscountIcon
              style={{
                color: "var(--backColor29)",
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

const LeftSideBar = ({ open }) => {
  const [first, setFirst] = React.useState(0);
  const userType = sessionStorage.getItem("userType");

  useEffect(() => {
    console.log(socket, "this is socket");
  }, [socket]);

  // Second useEffect to handle socket events
  useEffect(() => {
    // Setup event listeners
    socket.on("connect", () => {
      console.log("Connected to SOS server");
    });
    
    socket.on("sos", (userId) => {
      // alert(`SOS from ${userId}`);
      const audio = new Audio(alertSound);
      audio.play();
    });

    // Cleanup function
    return () => {
      socket.off("connect");
      socket.off("sos");
      // Don't disconnect here if you want to keep the socket alive across component unmounts
      // socket.disconnect();
    };
  }, []);

  // Full list of menu items for ADMIN users
  const adminMenuItems = [
    "Dashboard",
    "UserManagement",
    "DriverManagement",
    "VehicleManagement",
    "StaticManagement",
    "commision",
    "Promo",
    "BookingManagement",
    "TransactionManagement",
    "WithdrawlManagement",
    "State&City",
    "ContactUs",
    "AddSupport",
    "SOS",
    "Setting",
  ];

  // Limited list for SUPPORT users
  const supportMenuItems = [
    "ContactUs",
  ];

  // Choose which menu items to display based on user type
  const menuItems = userType === "SUPPORT" ? supportMenuItems : adminMenuItems;

  return (
    <List>
      {menuItems.map((text, index) => {
        return (
          <BarComponent
            open={open}
            key={index}
            first={first}
            setFirst={setFirst}
            number={index}
            text={text}
          />
        );
      })}
    </List>
  );
};

export default LeftSideBar;