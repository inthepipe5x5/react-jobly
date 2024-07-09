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


const AuthPage = ({formBody}) => {
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

  const handleAuthSubmit = (inputData, authType) => {
    // try {
      const result = handleAuth(inputData, authType)
        .then((res) => {
          console.log(authType, inputData, "=>", res);
          loginUser(result.token, inputData.username);
          const successMessage = `${getTitle(authType)} Successful!`;
          console.debug(successMessage);
          return res
        })
        .catch((err) => console.error("handleAuthSubmit Error:", err))
        .finally(()=>{
          if (localStorage.getItem('JoblyUserToken')) {
            if (authType === "edit") {
              return navigate(`/users/${result.username}`);
            } else {
              return navigate("/");
            }
          } else {
            return navigate(`/${authType}`)
          }
        })

    //   if (result.token) {
    //     // const { username } = inputData;
    //     // const { token } = result;
    //     // showFlashMessage(result.status || "success", successMessage, "success");

    //   } else {
    //     throw new Error(
    //       `${capitalizeWord(
    //         getArticle(authType)
    //       )} ${authType} authentication error occurred. Server response: ${result}`,
    //       400
    //     );
    //   }
    // } catch (error) {
    //   console.error("handleAuthSubmit Error:", error);
    //   // showFlashMessage(
    //   //   error ||
    //   //     `${getTitle(authType)} error occurred. Please try again. ${error}`,
    //   //   "error"
    //   // );
  //   }
  // };

  // //set formBody based on authType
  // let formBody;
  
  // switch (authType) {
  //   case "logout":
  //     currentUser
  //       ? logoutUser()
  //       : () => {
  //           // showFlashMessage("Logout error", "You must log in first", "warning");
  //           navigate("/login");
  //         };
  //     break;
  //   case "login":
  //     formBody = <LoginForm onSubmit={handleAuthSubmit} />;
  //     break;
  //   case "signup":
  //     formBody = <SignUpForm onSubmit={handleAuthSubmit} />;
  //     break;
  //   case "edit":
  //     formBody = (
  //       <EditUserForm currentUser={currentUser} onSubmit={handleAuthSubmit} />
  //     );
  //     break;
  //   default:
  //     formBody = <LoginForm onSubmit={handleAuthSubmit} />;

  //     break;
  }

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
          {authType === 'logout' ? logoutUser() : createElement(formBody, {onSubmit: handleAuthSubmit})}
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
