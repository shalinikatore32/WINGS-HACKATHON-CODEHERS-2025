// ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEventContext } from "./context/EventProvider";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useEventContext();
  const location = useLocation();

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
