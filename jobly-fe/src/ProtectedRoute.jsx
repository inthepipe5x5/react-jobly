import React from "react";
import { Navigate } from "react-router";
import { useUserContext } from "./useUserContext";
import { checkAuthStatus } from "./helper";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { currentUser } = useUserContext();
  const permission = checkAuthStatus(currentUser);

  if (!permission) {
    console.error("wrong permissions");
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
