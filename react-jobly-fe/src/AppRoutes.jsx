import { React } from "react";
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

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<AuthPage ChildAuthForm={SignUpForm} />} />
      <Route path="login" element={<AuthPage ChildAuthForm={LoginForm} />} />
      <Route
        path="logout"
        element={
          <>
            <Alert color="success">Log Out Successful!</Alert>
            <AuthPage />
          </>
        }
      />
      <Route
        path="companies/:companyName"
        element={
          <ProtectedRoute>
            <Result resultType="company" />
          </ProtectedRoute>
        }
      />
      <Route
        path="users/:username/edit"
        element={
          <ProtectedRoute>
            <AuthPage ChildAuthForm={EditUserForm} />
          </ProtectedRoute>
        }
      />
      <Route
        path="companies"
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
      <Route
        path="users/:username"
        element={
          <ProtectedRoute>
            <Result resultType="user" />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Result resultType="user" />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
      <Route
        path="jobs/:jobName"
        element={
          <ProtectedRoute>
            <Result resultType="job" />
          </ProtectedRoute>
        }
      />
      <Route
        path="jobs"
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
      <Route
        path="jobs/new"
        element={
          <ProtectedRoute>
            <SubmitNew type="job" />
          </ProtectedRoute>
        }
      />
      <Route path="/NotFound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
