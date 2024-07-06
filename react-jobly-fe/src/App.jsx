/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import {
  Tooltip,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import LoadingSpinner from "./LoadingSpinner";
import { UserContext, UserContextProvider } from "./UserContextProvider";
import "./App.css";
import { FlashMessageContext } from "./FlashMessageContext";
import FlashMessage from "./FlashMessage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { flashMessage, showFlashMessage, DismissFlashMessage } =
    useContext(FlashMessageContext);
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);

  console.log(currentUser);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <UserContextProvider>
        <MainNavBar user={currentUser} />
        {flashMessage && (
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            onDismiss={() => DismissFlashMessage(showFlashMessage)}
          />
        )}
        <div className="hero-wrapper bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className=" min-vw-50 min-vh-50 w-100 d-flex align-items-center">
            <Container
              fluid
              className=" d-flex justify-content-center align-items-center mb-5"
            >
              <AppRoutes />
            </Container>
          </div>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;
