import React from "react";
import { useState } from "react";
import { NameContext } from ".";
const NameContextProvider = ({ children }) => {
  const [dashBoardName, setDashBoardName] = useState("Texly Dashboard");
  return (
    <NameContext.Provider value={{ dashBoardName, setDashBoardName }}>
      {children}
    </NameContext.Provider>
  );
};

export default NameContextProvider;
