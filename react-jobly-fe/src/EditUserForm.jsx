import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";

const EditUserForm = ({ currentUser, onSubmit }) => {
  const [inputData, setInputData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setInputData({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputData, "edit");
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
            Update
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default EditUserForm;
