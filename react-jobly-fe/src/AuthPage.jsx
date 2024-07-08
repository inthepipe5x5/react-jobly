import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "./useUserContext";
import { useFlashMessage } from "./FlashMessageContext";
import { handleAuth, getTitle } from "./helper";
import FlashMessage from "./FlashMessage";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import EditUserForm from "./EditUserForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authType, setAuthType] = useState(
    location.pathname.replace("/", "") || "login"
  );
  console.log("AUTHPAGE", location.pathname, authType);
  const { currentUser, loginUser, logoutUser } = useUserContext();
  const { flashMessage, showFlashMessage, dismissFlashMessage } =
    useFlashMessage();

  //set formBody based on authType
  let formBody;
  switch (authType) {
    case "logout":
      currentUser
        ? logoutUser()
        : () => {
            showFlashMessage("You must log in first", "warning");
            navigate("/login");
          };
      break;
    case "login":
      formBody = <LoginForm onSubmit={handleAuthSubmit} />;
      break;
    case "signup":
      formBody = <SignUpForm onSubmit={handleAuthSubmit} />;
      break;
    case "edit":
      formBody = (
        <EditUserForm currentUser={currentUser} onSubmit={handleAuthSubmit} />
      );
      break;
    default:
      formBody = <LoginForm onSubmit={handleAuthSubmit} />;

      break;
  }

  const handleAuthSubmit = async (inputData, authType) => {
    try {
      const result = await handleAuth(inputData, authType, setCurrentUser);
      console.log(
        authType,
        inputData,
        result?.status,
        result?.statusCode,
        result?.data,
        result
      );

      if (
        !result ||
        result instanceof Error ||
        ![200, 201].includes(result.status)
      ) {
        throw new Error(
          result?.message ||
            result?.error ||
            `An ${authType} authentication error occurred.`,
          result?.status || result?.statusCode || 400
        );
      } else {
        const successMessage = `${getTitle(authType)} Successful!`;
        showFlashMessage(successMessage, "success");

        if (authType === "edit") {
          navigate(`/users/${result.username}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("handleSubmit Error:", error?.status, error.message);
      showFlashMessage(
        error.message ||
          `${getTitle(authType)} error occurred. Please try again.`,
        "error"
      );
    }
  };

  return (
    <Container className="col-8">
      <Card className="card-container mt-5 mb-5">
        <CardTitle className="font-weight-bold text-center mt-3">
          <h2>{getTitle(authType)}</h2>
          {flashMessage && (
            <FlashMessage
              title={flashMessage.title}
              message={flashMessage.message}
              type={flashMessage.type}
              onDismiss={dismissFlashMessage}
            />
          )}
        </CardTitle>
        <CardBody>
          {formBody}
          <Row>
            <Col>
              <Button
                color="secondary"
                onClick={() =>
                  setAuthType(authType !== "signup" ? "signup" : "login")
                }
              >
                {authType !== "signup" ? "Sign up" : "Login"}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AuthPage;
