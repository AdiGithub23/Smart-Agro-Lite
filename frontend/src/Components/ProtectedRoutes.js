import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Unauthorized from "./Unauthorized";

const ProtectedRoute = ({ element: Component, roles = [], ...rest }) => {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
    } catch (error) {
      userRole = null;
    }
  }

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Unauthorized />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
