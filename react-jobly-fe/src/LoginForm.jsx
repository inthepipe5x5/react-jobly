import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

const defaultProdInputData = { username: "", password: "" };
const defaultDevInputData = { username: "test123", password: "test123" };

const LoginForm = ({ onSubmit }) => {
  const [inputData, setInputData] = useState(defaultDevInputData);

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
    <Form onSubmit={handleSubmit}>
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
        <Col sm={{ offset: 3, size: 9 }}>
          <Button color="primary" type="submit">
            Login
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default LoginForm;
