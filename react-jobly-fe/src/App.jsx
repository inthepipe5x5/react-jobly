/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Alert, Container } from "reactstrap";

import JoblyApi from "./api";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import LoadingSpinner from "./LoadingSpinner";
import { UserContext, UserContextProvider } from "./UserContextProvider";
import { showFlashMessage, dismissFlashMessage } from "./helper";
import "./App.css";
import { FlashMessageContextProvider } from "./FlashMessageContext";
import FlashMessage from "./FlashMessage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const flashMessages = useContext();
  const [flashMessage, setFlashMessage] = useState(flashMessages);
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  console.log(currentUser);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      <div className="App">
        <UserContextProvider>
          <MainNavBar user={currentUser}></MainNavBar>
          <FlashMessageContextProvider>
          {flashMessage && ( //show Alert component if flashMessage
            <FlashMessage message={flashMessage.message} type={flashMessage.type} onDismiss={dismissFlashMessage(setFlashMessage)} />
          )}
            <Container
              fluid
              className="d-flex justify-content-center align-items-center home-container"
            >
              <AppRoutes />
            </Container>
          </FlashMessageContextProvider>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
