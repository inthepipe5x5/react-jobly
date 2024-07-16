import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

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

const SignUpForm = ({ onSubmit }) => {
  const [inputData, setInputData] = useState(defaultProdInputData);

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

  return (
    <Form onSubmit={handleSubmit}>
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
      <FormGroup>
        <Col>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default SignUpForm;
