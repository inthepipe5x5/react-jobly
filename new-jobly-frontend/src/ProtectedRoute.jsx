import { useMemo } from "react";
import {
  Navigate,
  useParams,
} from "react-router";
import PropTypes from "prop-types";
import { useUserContext } from "./useUserContext";
import { checkAuthStatus } from "./helper";
import ErrorContentCard from "./ErrorContentCard";
import { useFlashMessage } from "./FlashMessageContext";

const ProtectedRoute = ({
  requireAdmin = false,
  requireLogin = false,
  redirectPath = "/login",
  children,
}) => {
  const { username } = useParams();

  const userContext = useUserContext();
  const { currentUser, userDetails } =
    userContext ?? null;

  const permission = useMemo(() => {
    /**Determine if user has permission to view the route */
    switch (true) {
      // If no admin check is required, always allow
      case !requireAdmin:
        return true;

      // If user is not logged in or userDetails missing, deny
      case requireLogin &&
        checkAuthStatus(currentUser) ===
          false:
        return false;

      // Allow if currentUser is admin or username matches
      case userDetails.isAdmin:
      case username === currentUser:
        return true;

      // Otherwise, deny
      default:
        return false;
    }
  }, [
    requireAdmin,
    userDetails,
    currentUser,
    username,
    requireLogin,
  ]);
  const { showFlashMessage } =
    useFlashMessage();
  //handle admin check requirement === True
  if (requireAdmin === true)
    if (!permission) {
      showFlashMessage(
        "You don't have permission to view this page",
        "You must be logged in to view this page",
        "error",
        5000
      );
      return (
        <Navigate to={redirectPath} />
      );
    }

  return children;
};
ProtectedRoute.propTypes = {
  requireAdmin: PropTypes.bool,
  redirectPath: PropTypes.string,
  requireLogin: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
