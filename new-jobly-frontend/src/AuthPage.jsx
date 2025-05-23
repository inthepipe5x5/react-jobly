import {
  useState,
  useEffect,
  createElement,
} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Button,
} from "reactstrap";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useUserContext } from "./useUserContext";
import { useFlashMessage } from "./FlashMessageContext";
import {
  handleAuth,
  getTitle,
  handleCaughtError,
} from "./helper";
import PropTypes from "prop-types";

const AuthPage = ({
  ChildAuthForm,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authType, setAuthType] =
    useState(
      location.pathname.split("/")[1] ||
        "login"
    );
  const { loginUser, logoutUser } =
    useUserContext();
  const {
    flashMessage,
    showFlashMessage,
  } = useFlashMessage();

  //useEffect to sync authType to location changes
  useEffect(() => {
    setAuthType(
      location.pathname.split("/")[1] ||
        "login"
    );
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    showFlashMessage(
      "Logout successful",
      "Hope to see you again!",
      "success"
    );
    navigate("/login");
  };

  const handleAuthSubmit = async (
    inputData,
    authType
  ) => {
    try {
      const result = await handleAuth(
        inputData,
        authType
      );
      console.log(
        authType,
        inputData,
        "=>",
        result
      );
      if (result.token) {
        loginUser(
          result.token,
          result.username ||
            inputData.username
        );
        const successMessage = `Welcome ${inputData.username}`;
        showFlashMessage(
          `${authType} successful!`,
          successMessage,
          "success"
        );
        if (authType === "edit") {
          return navigate(
            `/users/${result.username}`
          );
        } else {
          return navigate("/");
        }
      } else {
        let newErr = handleCaughtError(
          result,
          `${location.pathname}`
        );
        console.debug(newErr);
        showFlashMessage(
          newErr.title,
          newErr.message,
          "danger"
        );
        throw new Error(newErr);
      }
    } catch (err) {
      console.error(
        "handleAuthSubmit Error:",
        err
      );
      if (!flashMessage) {
        const fm =
          authType === "login"
            ? "Invalid credentials"
            : "Sorry, try again.";
        showFlashMessage(
          "Auth Error",
          fm,
          "danger"
        );
      }
    }
  };

  const toggleAuthType = () => {
    const newAuthType =
      authType === "signup"
        ? "login"
        : "signup";
    navigate(`/${newAuthType}`);
    setAuthType(newAuthType);
  };

  return (
    <Container className="col-8">
      <Card className="card-container mt-5 mb-5">
        <CardTitle className="font-weight-bold text-center mt-3">
          <h2>{getTitle(authType)}</h2>
        </CardTitle>
        <CardBody>
          {authType === "logout"
            ? handleLogout()
            : createElement(
                ChildAuthForm,
                {
                  onSubmit:
                    handleAuthSubmit,
                }
              )}
          {authType !== "edit" ? (
            <Row
              style={{
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                color="secondary"
                onClick={toggleAuthType}
                style={{
                  width: "85%",
                  flex: 1,
                  display: "flex",
                }}
              >
                {authType === "signup"
                  ? "Login"
                  : "Sign up"}
              </Button>
            </Row>
          ) : null}
        </CardBody>
      </Card>
    </Container>
  );
};
AuthPage.propTypes = {
  ChildAuthForm:
    PropTypes.elementType.isRequired,
};

export default AuthPage;
