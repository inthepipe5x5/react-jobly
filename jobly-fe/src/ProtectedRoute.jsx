import React from "react";
import { Navigate, useParams } from "react-router";
import { useUserContext } from "./useUserContext";
import { checkAuthStatus } from "./helper";
import ErrorContentCard from "./ErrorContentCard";

const ProtectedRoute = ({
  requireAdmin = false,
  redirectPath = "/login",
  children,
}) => {
  const {username} = useParams()

  const { currentUser, userDetails } = useUserContext();
  const permission = checkAuthStatus(currentUser);
  if (requireAdmin && userDetails.isAdmin === false && username !== (currentUser.username || userDetails.username)) {
    return (
      <ErrorContentCard
        errStatus={401}
        contentType="users"
        message="You must be an admin to view this page"
      />
    );
  }
  if (!permission) {
    console.error("wrong permissions");
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
