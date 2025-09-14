import React from "react";
import Login from "../../components/Login/Login";
import { Navigate } from "react-router-dom";

export default function ProtocetedRoutes({ children }) {
  if (localStorage.getItem("tok") == null) {
    return <Navigate to={"/login"} />;
  }
  return <>{children} </>;
}
