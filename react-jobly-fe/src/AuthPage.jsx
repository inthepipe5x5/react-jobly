import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { FlashMessageContext, useFlashMessage } from "./FlashMessageContext";
import JoblyApi from "./api";
import { handleAuth, handleLogout, getTitle } from "./helper";
import FlashMessage from "./FlashMessage";

const AuthPage = ({ authType = "signup" }) => {
  const navigate = useNavigate();
  const location = useLocation()
  authType = authType ? authType : location.pathname 
  console.log("AUTHPAGE",location.pathname, authType)
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { flashMessage, showFlashMessage, dismissFlashMessage } =
    useContext(FlashMessageContext);

  useEffect(() => {
    if (authType === "logout") {
      currentUser ? handleLogout(setCurrentUser) : navigate("/login");
    }
  }, [authType, currentUser, navigate, setCurrentUser]);

  const defaultInputData = ["login", "logout"].includes(authType)
    ? { username: "test123", password: "test123" }
    : {
        username: "test123",
        password: "test123",
        firstName: "test123",
        lastName: "test123",
        email: "test123@test123.com",
      };

  const [inputData, setInputData] = useState(defaultInputData);

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      //user handleAuth to dynamically set API call function
      const result = await handleAuth(inputData, authType, setCurrentUser);
      console.log(authType, inputData, result?.status, result?.statusCode, result?.data, result);
      //handle unsuccessful auth attempt
      if (
        ![200, 201].includes(result.statusCode) ||
        result instanceof Error ||
        result.data.error
      ) {
        throw new Error(
          result?.message ||
            result?.error ||
            `An ${authType} authentication error occurred.`,
          result?.status || result?.statusCode || 400
        );
      } else {
        //handle successful auth attempt
        const successMessage = `${getTitle(authType)} Successful!`;
        showFlashMessage(successMessage, "success");

        //reset input fields
        setInputData(defaultInputData);
        if (authType === "edit") {
          navigate(`/users/${result.username}`);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("handleSubmit Error:", error?.status, error.message);
      showFlashMessage(
        error.message ||
          `${getTitle(authType)}error occurred. Please try again.`,
        "error"
      );
    }
  };

  return (
    <Container className="col-8">
      <Card className="card-container mt-5 mb-5">
        <CardTitle className="font-weight-bold text-center mt-3">
          <h2>{getTitle(authType)}</h2>
          {flashMessage && (
            <FlashMessage
              title={FlashMessage.title}
              message={flashMessage.message}
              type={flashMessage.type}
              onDismiss={dismissFlashMessage}
            />
          )}
        </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            {authType !== "login" && (
              <>
                <FormGroup>
                  <Label for="firstName" sm={3}>
                    First Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      bsSize="sm"
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
                <FormGroup>
                  <Label for="lastName" sm={3}>
                    Last Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      bsSize="sm"
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
            <FormGroup>
              <Label for="username" sm={3}>
                Username
              </Label>
              <Col sm={9}>
                <Input
                  bsSize="sm"
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
              <FormGroup>
                <Label for="password" sm={3}>
                  Password
                </Label>
                <Col sm={9}>
                  <Input
                    bsSize="sm"
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={inputData.password}
                    onChange={handleInput}
                    required
                    autoComplete="current-password"
                  />
                </Col>
              </FormGroup>
            )}
            {authType !== "login" && (
              <FormGroup>
                <Label for="email" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
                  <Input
                    bsSize="sm"
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
            )}
            <FormGroup>
              <Col sm={{ offset: 3, size: 9 }}>
                <Button color="primary" type="submit">
                  {getTitle(authType)}
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <Row>
            <Col sm={{ offset: 3, size: 9 }}>
              <Button
                color="secondary"
                onClick={() =>
                  navigate(authType !== "signup" ? "/signup" : "/login")
                }
              >
                {authType !== "signup" ? "Sign up" : "Login"}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AuthPage;
