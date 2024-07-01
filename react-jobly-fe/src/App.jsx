/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import LoadingSpinner from "./LoadingSpinner";
import { UserContext, UserContextProvider } from "./UserContextProvider";
import { Container } from "reactstrap";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  console.log(currentUser);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <>
      <UserContextProvider>
        <div className="App">
          <MainNavBar user={currentUser}></MainNavBar>
          <Container
            fluid
            className="d-flex justify-content-center align-items-center home-container"
          >
            <AppRoutes /*jobs={jobs} companies={companies} users={users}*/ />
          </Container>
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
