import { React, useEffect } from "react";
import Route from "react-router";
import axios from "axios";

import Home from "./Home";
import List from "./List";
import Result from "./Result";

/**
 * 
 *  Homepage — just a simple welcome message

/companies  List all companies

/companies/apple  View details of this company

/jobs  List all jobs

/login  Login/signup

/signup  Signup form

/profile  Edit profile page
 * 
 * 
 * 
 */
const Routes = () => {
  const BASE_URL = "http://localhost:3001";

  // Function to make a GET request
  const fetchData = async (endpoint = "companies") => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const companies = useEffect(fetchData("companies"), []);
  const users = useEffect(fetchData("users"), []);
  const jobs = useEffect(fetchData("jobs"), []);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="companies/:companyName" element={<Result />} />
      <Route path="companies" element={<List list={companies} />} />
      <Route path="users" element={<List list={users} />} />
      <Route path="jobs/:jobName" element={<Result />} />
      <Route path="jobs" element={<List list={jobs} />} />
    </Routes>
  );
};

export default Routes;
