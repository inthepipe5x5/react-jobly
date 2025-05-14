import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import { config } from "./config";
const { ENV } = config;
//#region default input data
const defaultProdInputData = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};
//for testing purposes
const defaultDevInputData = {
  username: "test123test",
  password: "test123",
  firstName: "test123first",
  lastName: "test123first",
  email: "test123@test123.com",
};
// #endregion default input data
//#region SignUpForm
const SignUpForm = ({ onSubmit }) => {
  const [inputData, setInputData] =
    useState(
      ENV === "production"
        ? defaultProdInputData
        : defaultDevInputData
    );
  //#region methods
  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputData, "signup");
  };

  const Names = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        marginBottom: "1rem",
        marginTop: "1rem",
        padding: "1rem",
        width: "80%", // Match sibling flex container width
        margin: "auto", // Center align like sibling
        borderRadius: "5px",
      }}
    >
      <FormGroup
        style={{
          flex: 1,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem",
        }}
      >
        <Label
          for="firstName"
          style={{
            textAlign: "left",
            paddingLeft: "5px",
          }}
        >
          First Name
        </Label>
        <Col>
          <Input
            style={{
              textAlign: "left",
              paddingLeft: "5px",
            }}
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
      <FormGroup
        style={{
          flex: 1,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem",
        }}
      >
        <Label
          for="lastName"
          style={{
            textAlign: "left",
            paddingLeft: "5px",
          }}
        >
          Last Name
        </Label>
        <Col>
          <Input
            style={{
              textAlign: "left",
              paddingLeft: "5px",
            }}
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
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Names />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: "1rem",
          marginTop: "1rem",
          padding: "0.5rem",
          // border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <FormGroup
          style={{
            flex: 1,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <Label
            style={{
              textAlign: "left",
              paddingLeft: "5px",
            }}
            for="username"
          >
            Username
          </Label>
          <Col>
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
        <FormGroup
          style={{
            flex: 1,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <Label
            for="password"
            style={{
              textAlign: "left",
              paddingLeft: "5px",
            }}
          >
            Password
          </Label>
          <Col>
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
        <FormGroup
          style={{
            flex: 1,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <Label
            for="email"
            style={{
              textAlign: "left",
              paddingLeft: "5px",
            }}
          >
            Email
          </Label>
          <Col>
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
      </div>
      <FormGroup>
        <Col>
          <Button
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default SignUpForm;
