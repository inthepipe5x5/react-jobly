/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from "react";
import { Container } from "reactstrap";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import LoadingSpinner from "./LoadingSpinner";
import { UserContextProvider } from "./UserContextProvider";
import "./App.css";
import { useFlashMessage } from "./FlashMessageContext";
import FlashMessage from "./FlashMessage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { flashMessage, showFlashMessage, dismissFlashMessage } =
    useFlashMessage();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <MainNavBar />
      <div className="hero-wrapper bg-composed-wrapper bg-midnight-bloom min-vh-100">
        <div className="min-vw-50 min-vh-50 w-200 d-flex align-items-center">
          <Container
            fluid
            className=" d-flex justify-content-center align-items-center mb-5"
          >
            {flashMessage && (
              <FlashMessage
                title={flashMessage.title}
                message={flashMessage.message}
                type={flashMessage.type}
                onDismiss={dismissFlashMessage}
              />
            )}
            <Suspense
              fallback={
                <>
                  <LoadingSpinner></LoadingSpinner>
                </>
              }
              >
              <AppRoutes />
            </Suspense>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
