/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from "react";
import { Container } from "reactstrap";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import LoadingSpinner from "./LoadingSpinner";
import { UserContextProvider } from "./UserContextProvider";
import "./App.css";
import { FlashMessageContext } from "./FlashMessageContext";
import FlashMessage from "./FlashMessage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  console.log("localStorage token: ", localStorage.getItem("JoblyUserToken"));
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <UserContextProvider>
        <MainNavBar />
        <div className="hero-wrapper bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="min-vw-50 min-vh-50 w-200 d-flex align-items-center">
            <Container
              fluid
              className=" d-flex justify-content-center align-items-center mb-5"
            >
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
      </UserContextProvider>
    </div>
  );
}

export default App;
