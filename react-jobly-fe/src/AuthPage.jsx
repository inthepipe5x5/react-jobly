import React, { useState, useContext, useEffect } from "react";
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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import { FlashMessageContext } from "./FlashMessageContext";
import JoblyApi from "./api";
import { handleAuth, handleLogout, getTitle } from "./helper";
import FlashMessage from "./FlashMessage";

const AuthPage = ({ authType = "signup" }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { flashMessage, showFlashMessage, DismissFlashMessage } =
    useContext(FlashMessageContext);

  useEffect(() => {
    if (authType === "logout") {
      currentUser ? handleLogout(setCurrentUser) : navigate("/login");
    }
  }, [authType, currentUser, navigate, setCurrentUser]);

  const defaultInputData = ["login", "logout"].includes(authType)
    ? { username: "", password: "" }
    : {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      };

  const [inputData, setInputData] = useState(defaultInputData);
  // const [validInput, setValidInput] = useState(false)
  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    DismissFlashMessage();
    try {
      //user handleAuth to dynamically set API call function
      const result = await handleAuth(inputData, authType, setCurrentUser);
      //handle unsuccessful auth attempt
      if (![200, 201].includes(result.statusCode) || result instanceof Error) {
        throw new Error(
          result?.message ||
            result?.error ||
            "An authentication error occurred."
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
      console.error("Error:", error);
      showFlashMessage(
        error.message ||
          `${getTitle(authType)}error occurred. Please try again.`,
        "error"
      );
    }
  };

  return (
    <Card className="mt-5">
      <CardTitle className="font-weight-bold text-center mt-3">
        <h2>{getTitle(authType)}</h2>
        {flashMessage && (
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            onDismiss={DismissFlashMessage}
          />
        )}
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          {authType !== "login" && (
            <>
              <FormGroup container-fluid lg={10}>
                <Label for="firstName" sm={3}>
                  First Name
                </Label>
                <Col sm={9}>
                  <Input
                    // {validInput ? valid: ""}
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
              <FormGroup container-fluid lg={10}>
                <Label for="lastName" sm={3}>
                  Last Name
                </Label>
                <Col sm={9}>
                  <Input
                    // {validInput ? valid: ""}
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
          <FormGroup container-fluid lg={10}>
            <Label for="username" sm={3}>
              Username
            </Label>
            <Col sm={9}>
              <Input
                // {validInput ? valid: ""}
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
            <FormGroup container-fluid lg={10}>
              <Label for="password" sm={3}>
                Password
              </Label>
              <Col sm={9}>
                <Input
                  // {validInput ? valid: ""}
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
            <FormGroup container-fluid lg={10}>
              <Label for="email" sm={3}>
                Email
              </Label>
              <Col sm={9}>
                <Input
                  // {validInput ? valid: ""}
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
          <FormGroup container-fluid lg={10}>
            <Col sm={{ offset: 3, size: 9 }}>
              <Button color="primary" type="submit" onClick={handleSubmit}>
                {getTitle(authType)}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AuthPage;
