// import "./App.css";
// import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { Routes, Route } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import TotalDriverDetailPage from "./Pages/TotalActiveDriverPage/TotalActiveDriverDetailPage";
// import TCommisionPage from "./Pages/TCommisionPage/TCommisionPage";
// import BNCommisionPage from "./Pages/BNCommisionPage/BNCommisionPage";
// import { useNavigate } from "react-router-dom";
// import Scrolltotop from "./Components/scrolltop/Scrolltotop";
// //images import

// // sco
// //google map

// //Pages

// import Dashboard from "./Pages/Dashboard";
// import StaticManagementPage from "./Pages/StaticManagementPage/StaticManagementPage";
// import UserManagementPage from "./Pages/UserManagementPage/UserManagementPage";
// import DriverManagementPage from "./Pages/DriverManagement/DriverManagementPage";
// import VehicleManagementPage from "./Pages/VehicleManagementPage/VehicleManagementPage";
// import BookingPaymentPage from "./Pages/BookingPaymentPage/BookingPaymentPage";
// import WithdrawlManagementPage from "./Pages/WithdrawlManagementPage/WithdrawlManagementPage";
// import TransactionPaymentpage from "./Pages/TransactionPaymentpage/TransactionPaymentpage";
// import TotalUserPage from "./Pages/TotalUserPage/TotalUserPage";
// import Setting from "./Pages/Setting";
// import DBYActiveUsers from "./Components/DBYActiveUsers/DBYActiveUsers";
// import YActiveUsers from "./Components/YActiveUsers/YActiveUsers";
// import TodayActiveUsers from "./Components/TodayActiveUsers/TodayActiveUsers";
// import LoginPage from "./Pages/LoginPage/LoginPage";
// import ContactUsPage from "./Pages/Contactus/ContactUs";
// import TotalActiveDriverDetailPage from "./Pages/TotalActiveDriverPage/TotalActiveDriverDetailPage";
// import TActiveDriver from "./Components/TotalActiveDriver/TActiveDriver";
// import TotalDriverPage from "./Pages/TotalDriverPage/TotalDriverPage";
// import StateAndCity from "./Pages/StateandCity/StateAndCity";
// import AboutUsStatic from "./Pages/static/AboutUsStatic";
// import PrivacyPolicyStatic from "./Pages/static/PrivacyPolicyStatic";
// import TermStatic from "./Pages/static/TermStatic";
// import { LoginContext } from "./Context";
// import { useContext } from "react";
// import { useEffect } from "react";
// import ProfileComp from "./Pages/Profie/ProfileComp";
// import ProtectedRoute from "./ProtectedRoutefile/ProtectedRoute";
// import ProfilePage from "./Pages/Profie/ProfilePage";
// import Gmap from "./Components/GoogleMap/Gmap";
// import YesActiveDriver from "./Components/TotalActiveDriver/YesActiveDriver";
// import DBYActiveDrivers from "./Components/TotalActiveDriver/DBYActiveDrivers";
// import LeftSideBar from "./Components/LeftSideBar/LeftSideBar";
// import BookingManagement from "./Pages/BookingManagement/BookingManagement";
// import ViewUserPage from "./Pages/TotalUserPage/ViewUserPage";
// import { NameContext } from "./Context";
// import TodayBookNow from "./Pages/BookNowPages/TodayBookNow";
// import YesBookNow from "./Pages/BookNowPages/YesBookNow";
// import DBYBookNow from "./Pages/BookNowPages/DBYBookNow1";
// import TodayBookLater from "./Pages/BookLaterPages/TodayBookLater";
// import YesBookLater from "./Pages/BookLaterPages/YesBookLater";
// import DBYBookLater from "./Components/DBYBookLater/DBYBookLater";
// import DBYBookLaterPage from "./Pages/BookLaterPages/DBYBookLaterPage";
// import TotalActiveUserPage from "./Pages/TotalActiveUserPage/TotalActiveUserPage";
// import CreateVehicleForm from "./Pages/VehicleManagementPage/CreateVehicleForm";
// import AddStatic from "./Pages/static/AddStatic";
// import ViewBooking from "./Pages/BookingManagement/ViewBooking";
// import DriverDocsPage from "./Pages/DriverManagement/DriverDocsPage";
// import { useJsApiLoader } from "@react-google-maps/api";
// import Test from "./Pages/StateandCity/Test";
// import ViewDriverPage from "./Pages/DriverManagement/ViewDriverPage";
// import CommisionPage from "./Pages/CommisionPage/CommisionPage";
// import PDFFile from "./Components/PDFFile/PDFFile";
// import EditVehicleForm from "./Pages/VehicleManagementPage/EditVehicleForm";

// const drawerWidth = 260;
// const toolbarStyle = {
//   minHeight: "70px",
//   backgroundColor: "var(--back)",
// };
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   fontFamily: "Quicksand, sans-serif",
//   // padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   fontFamily: "Quicksand, sans-serif",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     fontFamily: "Quicksand, sans-serif",
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   fontFamily: "Quicksand, sans-serif",
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// //table style={
// const queryClient = new QueryClient();
// function App() {
//   const theme = useTheme();
//   const { dashBoardName } = useContext(NameContext);
//   const libraries = ["places", "drawing"];
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });
//   const [open, setOpen] = React.useState(false);

//   // auto login
//   if (!isLoaded) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Map is loading
//       </div>
//     );
//   }
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="App">
//         <Scrolltotop />

//         <Box
//           sx={{
//             display: "flex",
//             backgroundColor: "var(--dark)",
//             overflow: "hidden",
//           }}
//         >
//           <CssBaseline />
//           <AppBar position="fixed" open={open}>
//             <Toolbar style={toolbarStyle}>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={handleDrawerOpen}
//                 edge="start"
//                 sx={{
//                   marginRight: 5,
//                   ...(open && { display: "none" }),
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="div"
//                 style={{
//                   textShadow: "2px 2px green",
//                   textOverflow: "unset",
//                   width: "30%",
//                 }}
//               >
//                 {dashBoardName}
//               </Typography>
//               <Typography
//                 variant="div"
//                 noWrap
//                 component="div"
//                 style={{
//                   marginLeft: "55%",
//                 }}
//               >
//                 <ProfileComp />
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             variant="permanent"
//             open={open}
//             PaperProps={{ style: { backgroundColor: "var(--back)" } }}
//           >
//             <DrawerHeader>
//               <IconButton onClick={handleDrawerClose}>
//                 {theme.direction === "rtl" ? (
//                   <ChevronRightIcon
//                     sx={{
//                       color: "white",
//                     }}
//                   />
//                 ) : (
//                   <ChevronLeftIcon
//                     sx={{
//                       color: "white",
//                     }}
//                   />
//                 )}
//               </IconButton>
//             </DrawerHeader>
//             <Divider />
//             <LeftSideBar open={open} />
//           </Drawer>
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               p: 0,
//               paddingTop: 1,
//               backgroundColor: "var(--dark2)",
//             }}
//           >
//             <DrawerHeader />
//             <Typography
//               className="Main_Routes backImage"
//               style={{
//                 backgroundColor: "var(--dark2)",
//                 width: open ? "calc(100vw - 260px)" : "calc(100vw - 60px)",
//               }}
//             >
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 {/* Dashboard Route */}
//                 <Route path="/Dashboard" element={<Dashboard />} />
//                 <Route
//                   path="/WithdrawlManagement"
//                   element={<WithdrawlManagementPage />}
//                 />
//                 <Route path="/ContactUs" element={<ContactUsPage />} />
//                 <Route path="/State&City" element={<StateAndCity />} />
//                 <Route path="/commision" element={<CommisionPage />} />
//                 <Route path="/AboutUsStatic" element={<AboutUsStatic />} />
//                 <Route path="/Terms&conditionStatic" element={<TermStatic />} />
//                 <Route
//                   path="/PrivacyPolicy"
//                   element={<PrivacyPolicyStatic />}
//                 />
//                 <Route path="/Profile" element={<ProfilePage />} />

//                 <Route
//                   path="/TransactionManagement"
//                   element={<TransactionPaymentpage />}
//                 />
//                 <Route
//                   path="/TransactionManagement/DownloadPdf"
//                   element={<PDFFile />}
//                 />
//                 <Route
//                   path="/BookingManagement"
//                   element={<BookingManagement />}
//                 />
//                 <Route
//                   path="/BookingManagement/Details"
//                   element={<ViewBooking />}
//                 />
//                 <Route path="/TrackDriver" element={<Gmap />} />
//                 <Route
//                   path="/StaticManagement"
//                   element={<StaticManagementPage />}
//                 />
//                 <Route
//                   path="/StaticManagement/EditStatic"
//                   element={<TermStatic />}
//                 />

//                 <Route
//                   path="/VehicleManagement"
//                   element={<VehicleManagementPage />}
//                 />
//                 <Route
//                   path="/VehicleManagement/AddNewVehicle"
//                   element={<CreateVehicleForm />}
//                 />
//                 <Route
//                   path="/VehicleManagement/editVehicles"
//                   element={<EditVehicleForm />}
//                 />

//                 <Route
//                   path="/DriverManagement"
//                   element={<DriverManagementPage sideBarState={open} />}
//                 />
//                 <Route
//                   path="/DriverManagement/DocsDetail"
//                   element={<DriverDocsPage sideBarState={open} />}
//                 />
//                 <Route
//                   path="/DriverManagement/ViewDriver"
//                   element={<ViewDriverPage />}
//                 />
//                 <Route path="/AddStatic" element={<AddStatic />} />
//                 <Route path="/UserManagement" element={<TotalUserPage />} />
//                 {/* inside dashboard */}
//                 <Route
//                   path="/Dashboard/TodayActiveDrivers"
//                   element={<TActiveDriver />}
//                 />
//                 <Route
//                   path="/Dashboard/yesActiveDrivers"
//                   element={<YesActiveDriver />}
//                 />
//                 <Route
//                   path="/Dashboard/DBYActive"
//                   element={<DBYActiveDrivers />}
//                 />

//                 <Route
//                   path="/DashBoard/dayBeforeYesterdayActiveUser"
//                   element={<DBYActiveUsers />}
//                 />
//                 <Route
//                   path="/DashBoard/yesterdayActiveUsers"
//                   element={<YActiveUsers />}
//                 />
//                 <Route
//                   path="/DashBoard/todayActiveUser"
//                   element={<TodayActiveUsers />}
//                 />
//                 {/* book now   ride routes Today Yesterday DaybeforeYesterday */}
//                 <Route
//                   path="/DashBoard/TodayBookNowRides"
//                   element={<TodayBookNow />}
//                 />
//                 <Route
//                   path="/DashBoard/YesterDayBookNow"
//                   element={<YesBookNow />}
//                 />
//                 <Route
//                   path="/DashBoard/DayBeforeYesterdayBookNow"
//                   element={<DBYBookNow />}
//                 />

//                 {/* book Later ride routes */}
//                 {/* book   Later ride routes Today Yesterday DaybeforeYesterday */}
//                 <Route
//                   path="/DashBoard/TodayBookLater"
//                   element={<TodayBookLater />}
//                 />
//                 <Route
//                   path="/DashBoard/YesterDayBooLater"
//                   element={<YesBookLater />}
//                 />
//                 <Route
//                   path="/DashBoard/DayBeforeYesterdayBookLater"
//                   element={<DBYBookLaterPage />}
//                 />

//                 {/* book Later ride routes */}
//                 <Route
//                   path="/DashBoard/TotalUser"
//                   element={<TotalUserPage />}
//                 />
//                 <Route
//                   path="/DashBoard/TotalUser/viewUser"
//                   element={<ViewUserPage />}
//                 />
//                 <Route
//                   path="/DashBoard/TotalActiveUser"
//                   element={<TotalActiveUserPage />}
//                 />
//                 <Route path="/Setting" element={<Setting />} />
//                 <Route
//                   path="/Dashboard/ActiveDriverDetail"
//                   element={<TotalActiveDriverDetailPage />}
//                 />
//                 <Route
//                   path="/Dashboard/TotalDriver"
//                   element={<TotalDriverDetailPage />}
//                 />
//                 <Route
//                   path="/Dashboard/TodayCommision"
//                   element={<TCommisionPage />}
//                 />
//                 <Route
//                   path="/Dashboard/BNCommision"
//                   element={<BNCommisionPage />}
//                 />
//                 {/* this test page is now add geofence feild page   */}
//                 <Route path="/test" element={<Test />} />
//               </Routes>
//             </Typography>
//           </Box>
//         </Box>
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;


import "./App.css";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Routes, Route, Navigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TotalDriverDetailPage from "./Pages/TotalActiveDriverPage/TotalActiveDriverDetailPage";
import TCommisionPage from "./Pages/TCommisionPage/TCommisionPage";
import BNCommisionPage from "./Pages/BNCommisionPage/BNCommisionPage";
import Scrolltotop from "./Components/scrolltop/Scrolltotop";

import Dashboard from "./Pages/Dashboard";
import StaticManagementPage from "./Pages/StaticManagementPage/StaticManagementPage";
import UserManagementPage from "./Pages/UserManagementPage/UserManagementPage";
import DriverManagementPage from "./Pages/DriverManagement/DriverManagementPage";
import VehicleManagementPage from "./Pages/VehicleManagementPage/VehicleManagementPage";
import BookingPaymentPage from "./Pages/BookingPaymentPage/BookingPaymentPage";
import WithdrawlManagementPage from "./Pages/WithdrawlManagementPage/WithdrawlManagementPage";
import TransactionPaymentpage from "./Pages/TransactionPaymentpage/TransactionPaymentpage";
import TotalUserPage from "./Pages/TotalUserPage/TotalUserPage";
import Setting from "./Pages/Setting";
import DBYActiveUsers from "./Components/DBYActiveUsers/DBYActiveUsers";
import YActiveUsers from "./Components/YActiveUsers/YActiveUsers";
import TodayActiveUsers from "./Components/TodayActiveUsers/TodayActiveUsers";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ContactUsPage from "./Pages/Contactus/ContactUs";
import TotalActiveDriverDetailPage from "./Pages/TotalActiveDriverPage/TotalActiveDriverDetailPage";
import TActiveDriver from "./Components/TotalActiveDriver/TActiveDriver";
import TotalDriverPage from "./Pages/TotalDriverPage/TotalDriverPage";
import StateAndCity from "./Pages/StateandCity/StateAndCity";
import AboutUsStatic from "./Pages/static/AboutUsStatic";
import PrivacyPolicyStatic from "./Pages/static/PrivacyPolicyStatic";
import TermStatic from "./Pages/static/TermStatic";
import { LoginContext } from "./Context";
import { useContext } from "react";
import ProfileComp from "./Pages/Profie/ProfileComp";
import ProfilePage from "./Pages/Profie/ProfilePage";
import Gmap from "./Components/GoogleMap/Gmap";
import YesActiveDriver from "./Components/TotalActiveDriver/YesActiveDriver";
import DBYActiveDrivers from "./Components/TotalActiveDriver/DBYActiveDrivers";
import LeftSideBar from "./Components/LeftSideBar/LeftSideBar";
import BookingManagement from "./Pages/BookingManagement/BookingManagement";
import ViewUserPage from "./Pages/TotalUserPage/ViewUserPage";
import { NameContext } from "./Context";
import TodayBookNow from "./Pages/BookNowPages/TodayBookNow";
import YesBookNow from "./Pages/BookNowPages/YesBookNow";
import DBYBookNow from "./Pages/BookNowPages/DBYBookNow1";
import TodayBookLater from "./Pages/BookLaterPages/TodayBookLater";
import YesBookLater from "./Pages/BookLaterPages/YesBookLater";
import DBYBookLater from "./Components/DBYBookLater/DBYBookLater";
import DBYBookLaterPage from "./Pages/BookLaterPages/DBYBookLaterPage";
import TotalActiveUserPage from "./Pages/TotalActiveUserPage/TotalActiveUserPage";
import CreateVehicleForm from "./Pages/VehicleManagementPage/CreateVehicleForm";
import AddStatic from "./Pages/static/AddStatic";
import ViewBooking from "./Pages/BookingManagement/ViewBooking";
import DriverDocsPage from "./Pages/DriverManagement/DriverDocsPage";
import { useJsApiLoader } from "@react-google-maps/api";
import Test from "./Pages/StateandCity/Test";
import ViewDriverPage from "./Pages/DriverManagement/ViewDriverPage";
import CommisionPage from "./Pages/CommisionPage/CommisionPage";
import PDFFile from "./Components/PDFFile/PDFFile";
import EditVehicleForm from "./Pages/VehicleManagementPage/EditVehicleForm";
import Promo from "./Pages/Promo/Promo";

const drawerWidth = 260;
const toolbarStyle = {
  minHeight: "70px",
  backgroundColor: "var(--back)",
};
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  fontFamily: "Quicksand, sans-serif",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  fontFamily: "Quicksand, sans-serif",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    fontFamily: "Quicksand, sans-serif",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  fontFamily: "Quicksand, sans-serif",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const queryClient = new QueryClient();

function App() {
  const theme = useTheme();
  const { dashBoardName } = useContext(NameContext);
  const libraries = ["places", "drawing"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [open, setOpen] = React.useState(false);
  const userType = sessionStorage.getItem("userType");
  useEffect(() => {

    console.log(userType, "this is user type")
  }, [userType])


  // Redirect if not authorized
  const RedirectToContactUs = () => {
    return <Navigate to="/ContactUs" />;
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        Map is loading
      </div>
    );
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Scrolltotop />

        <Box
          sx={{
            display: "flex",
            backgroundColor: "var(--dark)",
            overflow: "hidden",
          }}
        >
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar style={toolbarStyle}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{
                  textShadow: "2px 2px green",
                  textOverflow: "unset",
                  width: "30%",
                }}
              >
                {dashBoardName}
              </Typography>
              <Typography
                variant="div"
                noWrap
                component="div"
                style={{
                  marginLeft: "55%",
                }}
              >
                <ProfileComp />
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            PaperProps={{ style: { backgroundColor: "var(--back)" } }}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  <ChevronLeftIcon
                    sx={{
                      color: "white",
                    }}
                  />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <LeftSideBar open={open} />
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              paddingTop: 1,
              backgroundColor: "var(--dark2)",
            }}
          >
            <DrawerHeader />
            <Typography
              className="Main_Routes backImage"
              style={{
                backgroundColor: "var(--dark2)",
                width: open ? "calc(100vw - 260px)" : "calc(100vw - 60px)",
              }}
            >
              <Routes>
                {/* ContactUs route - accessible to both ADMIN and SUPPORT */}
                <Route path="/ContactUs" element={<ContactUsPage />} />
                <Route path="/Profile" element={<ProfilePage />} />
                {/* For SUPPORT users, redirect all other routes to ContactUs */}
                {userType === "SUPPORT" ? (
                  <>
                    {/* <Route path="/Profile" element={<ProfilePage />} /> */}
                    <Route path="*" element={<RedirectToContactUs />} />
                  </>
                ) : (
                  /* ADMIN routes - only accessible to ADMIN users */
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/WithdrawlManagement" element={<WithdrawlManagementPage />} />
                    <Route path="/State&City" element={<StateAndCity />} />
                    <Route path="/commision" element={<CommisionPage />} />
                    <Route path="/AboutUsStatic" element={<AboutUsStatic />} />
                    <Route path="/Terms&conditionStatic" element={<TermStatic />} />
                    <Route path="/PrivacyPolicy" element={<PrivacyPolicyStatic />} />
                    {/* <Route path="/Profile" element={<ProfilePage />} /> */}
                    <Route path="/TransactionManagement" element={<TransactionPaymentpage />} />
                    <Route path="/TransactionManagement/DownloadPdf" element={<PDFFile />} />
                    <Route path="/BookingManagement" element={<BookingManagement />} />
                    <Route path="/BookingManagement/Details" element={<ViewBooking />} />
                    <Route path="/TrackDriver" element={<Gmap />} />
                    <Route path="/StaticManagement" element={<StaticManagementPage />} />
                    <Route path="/StaticManagement/EditStatic" element={<TermStatic />} />
                    <Route path="/VehicleManagement" element={<VehicleManagementPage />} />
                    <Route path="/VehicleManagement/AddNewVehicle" element={<CreateVehicleForm />} />
                    <Route path="/VehicleManagement/editVehicles" element={<EditVehicleForm />} />
                    <Route path="/DriverManagement" element={<DriverManagementPage sideBarState={open} />} />
                    <Route path="/DriverManagement/DocsDetail" element={<DriverDocsPage sideBarState={open} />} />
                    <Route path="/DriverManagement/ViewDriver" element={<ViewDriverPage />} />
                    <Route path="/AddStatic" element={<AddStatic />} />
                    <Route path="/UserManagement" element={<TotalUserPage />} />
                    <Route path="/Dashboard/TodayActiveDrivers" element={<TActiveDriver />} />
                    <Route path="/Dashboard/yesActiveDrivers" element={<YesActiveDriver />} />
                    <Route path="/Dashboard/DBYActive" element={<DBYActiveDrivers />} />
                    <Route path="/DashBoard/dayBeforeYesterdayActiveUser" element={<DBYActiveUsers />} />
                    <Route path="/DashBoard/yesterdayActiveUsers" element={<YActiveUsers />} />
                    <Route path="/DashBoard/todayActiveUser" element={<TodayActiveUsers />} />
                    <Route path="/DashBoard/TodayBookNowRides" element={<TodayBookNow />} />
                    <Route path="/DashBoard/YesterDayBookNow" element={<YesBookNow />} />
                    <Route path="/DashBoard/DayBeforeYesterdayBookNow" element={<DBYBookNow />} />
                    <Route path="/DashBoard/TodayBookLater" element={<TodayBookLater />} />
                    <Route path="/DashBoard/YesterDayBooLater" element={<YesBookLater />} />
                    <Route path="/DashBoard/DayBeforeYesterdayBookLater" element={<DBYBookLaterPage />} />
                    <Route path="/DashBoard/TotalUser" element={<TotalUserPage />} />
                    <Route path="/DashBoard/TotalUser/viewUser" element={<ViewUserPage />} />
                    <Route path="/DashBoard/TotalActiveUser" element={<TotalActiveUserPage />} />
                    <Route path="/Setting" element={<Setting />} />
                    <Route path="/Dashboard/ActiveDriverDetail" element={<TotalActiveDriverDetailPage />} />
                    <Route path="/Dashboard/TotalDriver" element={<TotalDriverDetailPage />} />
                    <Route path="/Dashboard/TodayCommision" element={<TCommisionPage />} />
                    <Route path="/Dashboard/BNCommision" element={<BNCommisionPage />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/promo" element={<Promo />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                )}
              </Routes>
            </Typography>
          </Box>
        </Box>
      </div>
    </QueryClientProvider>
  );
}

export default App;