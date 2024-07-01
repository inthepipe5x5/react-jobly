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
  // const [companies, setCompanies] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getAllData = async () => {
  //     //GET requests
  //     // const usersResp = await JoblyApi.request("users");
  //     // const jobsResp = await JoblyApi.request("jobs");
  //     const companiesResp = await JoblyApi.request("companies");
  //     console.log({
  //       // users: usersResp,
  //       // jobs: jobsResp,
  //       company_data: companiesResp,
  //     });
  //     //update users, jobs and companies state
  //     // setUsers((users) => [...users, ...usersResp]);
  //     // setJobs((jobs) => [...jobs, ...jobsResp]);
  //     setCompanies((companies) => [companiesResp, ...companies]);
  //     //update isLoading state
  //   };
  //   try {
  //     getAllData();
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

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
