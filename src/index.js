import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersContextProvider from "./Context/UsersContextProvider";
import LoginContextProvider from "./Context/LoginContextProvider";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoutefile/ProtectedRoute";
import NameContextProvider from "./Context/NameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <NameContextProvider>
        <UsersContextProvider>
          <BrowserRouter >
            <Routes>
              <Route path="/Adminlogin" element={<LoginPage />} />
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </UsersContextProvider>
      </NameContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
