import React from "react";
import { Routes, Route } from "react-router-dom";
import { Alert } from "reactstrap";

import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import ListPage from "./ListPage";
import UserResult from "./UserResult";
import ResultPage from "./ResultPage";
import AuthPage from "./AuthPage";
import NotFound from "./NotFound";
import SubmitNew from "./SubmitNew";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import EditUserForm from "./EditUserForm";
import { useUserContext } from "./useUserContext";
import DetailPage from "./DetailPage";

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
            <DetailPage />
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
            <ListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="users/:username"
        element={
          <ProtectedRoute>
            <ResultPage resultType="user" detailed requireAdmin/>
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <UserResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="users"
        element={
          <ProtectedRoute requireAdmin>
            <ListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="jobs/:jobName"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="jobs"
        element={
          <ProtectedRoute>
            <ListPage />
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
