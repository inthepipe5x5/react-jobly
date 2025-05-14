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
  redirectPath = "/login",
  children,
}) => {
  const { username } = useParams();

  const userContext = useUserContext();
  const { currentUser, userDetails } =
    userContext ?? null;
  const permission = checkAuthStatus(
    currentUser
  );
  const { showFlashMessage } =
    useFlashMessage();
  if (
    requireAdmin &&
    userDetails.isAdmin === false &&
    username !==
      (currentUser.username ||
        userDetails.username)
  ) {
    return (
      <ErrorContentCard
        errStatus={401}
        contentType="users"
        message="You must be an admin to view this page"
      />
    );
  }
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
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
