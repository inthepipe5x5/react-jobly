import React, { useState, useContext, useEffect, createElement } from "react";
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
// import { useFlashMessage } from "./FlashMessageContext";
import { handleAuth, getTitle, getArticle, capitalizeWord } from "./helper";
// import FlashMessage from "./FlashMessage";

const AuthPage = ({ ChildAuthForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authType, setAuthType] = useState(
    location.pathname.replace("/", "") || "login"
  );
  console.log("AUTHPAGE", location.pathname, authType);
  //retrieve contexts
  const { currentUser, loginUser, logoutUser } = useUserContext();
  // const { flashMessage, showFlashMessage, dismissFlashMessage } =
  //   useFlashMessage();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleAuthSubmit = async (inputData, authType) => {
    try {
      const result = await handleAuth(inputData, authType);
      console.log(authType, inputData, "=>", result);
      if (result.token) {
        loginUser(result.token, result.username || inputData.username);
        const successMessage = `${getTitle(authType)} Successful!`;
        console.debug(successMessage);
        if (authType === "edit") {
          return navigate(`/users/${result.username}`);
        } else {
          return navigate("/");
        }
      } else {
        throw new Error(`handleAuthError: res.token=${result.token}`);
      }
    } catch (err) {
      console.error("handleAuthSubmit Error:", err);
    }
  };

  return (
    <Container className="col-8">
      <Card className="card-container mt-5 mb-5">
        <CardTitle className="font-weight-bold text-center mt-3">
          <h2>{getTitle(authType)}</h2>
          {/* {flashMessage && (
            <FlashMessage
              title={flashMessage.title}
              message={flashMessage.message}
              type={flashMessage.type}
              onDismiss={dismissFlashMessage}
            />
          )} */}
        </CardTitle>
        <CardBody>
          {authType === "logout"
            ? handleLogout()
            : createElement(ChildAuthForm, { onSubmit: handleAuthSubmit })}
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
