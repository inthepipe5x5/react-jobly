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
import { handleAuth, getTitle, getArticle, capitalizeWord } from "./helper";
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
  //retrieve contexts
  const { currentUser, loginUser, logoutUser } = useUserContext();
  const { flashMessage, showFlashMessage, dismissFlashMessage } =
    useFlashMessage();

  const handleAuthSubmit = async (inputData, authType) => {
    try {
      const result = await handleAuth(inputData, authType);
      console.log(authType, inputData, "=>", result);

      if (
        !result ||
        result instanceof Error ||
        (+result.status !== 201 && +result.status !== 200)
      ) {
        throw new Error(
          result?.message ||
            result?.data ||
            result?.error ||
            result`${capitalizeWord(
              getArticle(authType)
            )} ${authType} authentication error occurred.`,
          result?.status || result?.statusCode || 400
        );
      } else {
        const { username } = result.data || result || inputData;
        const { token } = result.data || result;
        loginUser({ username, token });
        const successMessage = `${getTitle(authType)} Successful!`;
        showFlashMessage(successMessage, "success");

        if (authType === "edit") {
          navigate(`/users/${result.username}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("handleAuthSubmit Error:", error);
      showFlashMessage(
        error ||
          `${getTitle(authType)} error occurred. Please try again. ${error}`,
        "error"
      );
    }
  };

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
