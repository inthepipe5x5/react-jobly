/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert } from "reactstrap";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import List from "./List";
import Result from "./Result";
import AuthPage from "./AuthPage";
import NotFound from "./NotFound";
import SubmitNew from "./SubmitNew";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import EditUserForm from "./EditUserForm";
import { useUserContext } from "./useUserContext";
import { checkAuthStatus } from "./helper";

/**
 * React Routes for Jobly App:
 * Routes
 * - Homepage — just a simple welcome message
 * - /companies  List all companies
 * - /companies/apple  View details of this company
 * - /jobs  List all jobs
 * - /login  Login/signup
 * - /signup  Signup form
 * - /profile  Edit profile page
 *
 */

const AppRoutes = () => {
  const { currentUser } = useUserContext();
  const [authorized, setAuthorized] = useState(checkAuthStatus(currentUser));
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="signup"
        element={<AuthPage ChildAuthForm={SignUpForm} />}
      ></Route>
      <Route
        path="login"
        element={<AuthPage ChildAuthForm={LoginForm} />}
      ></Route>
      <Route
        path="logout"
        element={
          <>
            <Alert color="success">Log Out Successful!</Alert>
            <AuthPage />
          </>
        }
      ></Route>
      <ProtectedRoute permission={authorized}>
        <Route
          path="companies/:companyName"
          element={<Result resultType="company" />}
        />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        {" "}
        <Route
          path="users/:username/edit"
          element={<AuthPage ChildAuthForm={EditUserForm} />}
        />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="companies" element={<List />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="users/:username" element={<Result resultType="user" />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="profile" element={<Result resultType="user" />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="users" element={<List />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="jobs/:jobName" element={<Result resultType="job" />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="jobs" element={<List />} />
      </ProtectedRoute>
      <ProtectedRoute permission={authorized}>
        <Route path="jobs/new" element={<SubmitNew type="job" />} />
      </ProtectedRoute>
      <Route path="/NotFound" element={NotFound}></Route>
      <Route path="*" element={NotFound}></Route>
    </Routes>
  );
};

export default AppRoutes;
