/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import JoblyApi from "../../api";
import AppRoutes from "./AppRoutes";
import { MainNavBar } from "./MainNavBar";
import { UserContext, UserContextProvider } from "./UserContextProvider";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      //GET requests
      const usersResp = await JoblyApi.request("users");
      const jobsResp = await JoblyApi.request("jobs");
      const companiesResp = await JoblyApi.request("companies");
      //update users, jobs and companies state
      setUsers((users) => [...users, ...usersResp]);
      setJobs((jobs) => [...jobs, ...jobsResp]);
      setCompanies((companies) => [...companies, ...companiesResp]);
      //update isLoading state
      setIsLoading(false);
    };
    getAllData();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <>
    <UserContextProvider>
      <div className="App">
        <MainNavBar user={currentUser}></MainNavBar>
        <main>
          
        </main>
        <AppRoutes jobs={jobs} companies={companies} users={users} />
      </div>
    </UserContextProvider>
    </>
  );
}

export default App;
