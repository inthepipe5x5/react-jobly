import { React, useEffect } from "react";
import Route from "react-router";
import axios from "axios";

import Home from "./Home";
import List from "./List";
import Result from "./Result";
import AuthPage from "./AuthPage";
import NotFound from "./NotFound";
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
const Routes = ({jobs, companies, users}) => {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='signup' element={(<AuthPage newUser={true} />)}></Route>
      <Route path='login' element={(<AuthPage newUser={false} />)}></Route>
      <Route path="companies/:companyName" element={<Result />} />
      <Route exact path="companies" element={<List list={companies} />} />
      <Route exact path="users" element={<List list={users} />} />
      <Route path="jobs/:jobName" element={<Result />} />
      <Route exact path="jobs" element={<List list={jobs} />} />
      <Route exact path="jobs/new" element={<SubmitNew type="job" />} />
      <Route path="*" element={NotFound}></Route>
    </Routes>
  );
};

export default Routes;
