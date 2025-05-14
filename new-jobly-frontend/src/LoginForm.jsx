import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";

const defaultProdInputData = {
  username: "",
  password: "",
};
//for testing purposes
// const defaultDevInputData = { username: "test123", password: "test123" };

const LoginForm = ({ onSubmit }) => {
  const [inputData, setInputData] =
    useState(defaultProdInputData);

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputData, "login");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        marginBottom: "1rem",
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      <FormGroup
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent:
            "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Label for="username">
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
      <FormGroup
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent:
            "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Label for="password">
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
      <Button
        style={{
          width: "85%",
          margin: "1rem",
          padding: "0.5rem",
          marginLeft: "auto",
          marginRight: "auto",
          alignContent: "center",
        }}
        color="primary"
        type="submit"
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
