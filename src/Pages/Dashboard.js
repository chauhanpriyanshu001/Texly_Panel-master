import React from "react";
import Driver from "../Components/Driver/Driver";
import OnlineUser from "../Components/OnlineUser/OnlineUser";
import TotalActiveDriver from "../Components/TotalActiveDriver/TotalActiveDriver";
import YBookNow from "../Components/YBookNow/YBookNow";
import YBookLater from "../Components/YBookLater/YBookLater";
import DBYBookNow from "../Components/DBYBookNow/DBYBookNow";
import DBYBookLater from "../Components/DBYBookLater/DBYBookLater";
import TBookNow from "../Components/TBookNow/TBookNow";
import TBookLater from "../Components/TBookLater/TBookLater";
import TCommision from "../Components/TCommision/TCommision";
import BLCommision from "../Components/BLCommision/BLCommision";
import BNCommision from "../Components/BNCommision/BNCommision";
import { NameContext } from "../Context";
import { useContext } from "react";
import FreightCommision from "../Components/FreightCommision/FreightCommision";
import Freight from "../Components/Freight";
import { useEffect } from "react";
import { UsersContext } from "../Context";
const Dashboard = () => {
  const { setDashBoardName } = useContext(NameContext);
  const { scrollDashboard, setScrollDashboard } = useContext(UsersContext);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollDashboard(scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    setDashBoardName("Texly Dashboard");
    if (scrollDashboard) {
      window.scrollTo(0, scrollDashboard);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8vw",
      }}
    >
      <Driver />
      <OnlineUser />
      <TotalActiveDriver />
      <TCommision />
      <BNCommision />
      <TBookNow />
      <YBookNow />
      <DBYBookNow />
      <BLCommision />
      <TBookLater />
      <YBookLater />
      <DBYBookLater />
      <FreightCommision />
      <Freight />
    </div>
  );
};

export default Dashboard;
