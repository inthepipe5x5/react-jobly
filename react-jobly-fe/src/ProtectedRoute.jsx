import React from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "./useUserContext";


const ProtectedRoute = ({ permission=false, redirectPath = '/login', children }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  if (!permission || !currentUser.token) {
    console.error('wrong permissions')
    return navigate(redirectPath);
  }

  return children;
};

export default ProtectedRoute;
