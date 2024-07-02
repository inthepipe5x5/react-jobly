import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Alert
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import JoblyApi from "./api";

const AuthPage = ({ authType = "signup" }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  // Default state for the form inputs
  const defaultInputData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  // useState hook to manage form input data
  const [inputData, setInputData] = useState(defaultInputData);
  const [error, setError] = useState(null);

  // Handle input changes for all fields
  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      let result;
      if (authType === "signup") {
        result = await JoblyApi.registerNewUser(inputData);
      } else if (authType === "login") {
        result = await JoblyApi.loginUser(inputData);
      } else if (authType === "edit") {
        result = await JoblyApi.editUser(currentUser.username, inputData);
      }
      
      setCurrentUser(result);
      setInputData(defaultInputData);
      
      if (authType === "edit") {
        navigate(`/users/${result.username}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  const getTitle = () => {
    switch (authType) {
      case "signup": return "Sign Up";
      case "login": return "Log In";
      case "edit": return "Edit Profile";
      default: return "Authentication";
    }
  };

  return (
    <Card className="mt-5">
      <CardTitle className="font-weight-bold text-center mt-3">
        <h2>{getTitle()}</h2>
      </CardTitle>
      <CardBody>
        {error && <Alert color="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {authType !== "login" && (
            <>
              <FormGroup row>
                <Label for="firstName" sm={3}>First Name</Label>
                <Col sm={9}>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={inputData.firstName}
                    onChange={handleInput}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lastName" sm={3}>Last Name</Label>
                <Col sm={9}>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={inputData.lastName}
                    onChange={handleInput}
                    required
                  />
                </Col>
              </FormGroup>
            </>
          )}
          <FormGroup row>
            <Label for="username" sm={3}>Username</Label>
            <Col sm={9}>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                value={inputData.username}
                onChange={handleInput}
                required
              />
            </Col>
          </FormGroup>
          {authType !== "edit" && (
            <FormGroup row>
              <Label for="password" sm={3}>Password</Label>
              <Col sm={9}>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={inputData.password}
                  onChange={handleInput}
                  required
                />
              </Col>
            </FormGroup>
          )}
          <FormGroup row>
            <Label for="email" sm={3}>Email</Label>
            <Col sm={9}>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={inputData.email}
                onChange={handleInput}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ offset: 3, size: 9 }}>
              <Button color="primary" type="submit">
                {getTitle()}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AuthPage;