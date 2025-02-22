import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useEventContext } from "../context/EventProvider";
function Logout() {
  const { LogoutUser } = useEventContext();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);
  return <Navigate to="/signin" />;
}

export default Logout;
