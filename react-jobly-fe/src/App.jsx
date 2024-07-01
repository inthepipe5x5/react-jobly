/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import AppRoutes from "./AppRoutes";
import MainNavBar from "./MainNavBar";
import { UserContext, UserContextProvider } from "./UserContextProvider";
import {Button, Spinner} from 'reactstrap'
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const [companies, setCompanies] = useState([]);
  // const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getAllData = async () => {
      //GET requests
      // const usersResp = await JoblyApi.request("users");
      const jobsResp = await JoblyApi.request("jobs");
      const companiesResp = await JoblyApi.request("companies");
      console.log({
        // users: usersResp,
        jobs: jobsResp,
        company_data: companiesResp,
      });
      //update users, jobs and companies state
      // setUsers((users) => [...users, ...usersResp]);
      setJobs((jobs) => [...jobs, ...jobsResp]);
      setCompanies((companies) => [...companies, ...companiesResp]);
      //update isLoading state
    };
    try {
      getAllData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return (
      <Button color="primary" disabled>
        <Spinner size="sm">Loading...</Spinner>
        {/* <span> Loading</span> */}
      </Button>
    );
  }

  return (
    <>
      <UserContextProvider>
        <div className="App">
          <MainNavBar user={currentUser}></MainNavBar>
          <main></main>
          <AppRoutes jobs={jobs} companies={companies} /*users={users}*/ />
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
