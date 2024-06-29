/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import JoblyApi from "../../api";

const AuthPage = ({ authType = "signup" }) => {
  const navigate = useNavigate()
  // Default state for the form inputs
  const defaultInputData = {
    name: "",
    description: "",
    recipe: "",
    serve: "",
    foodType: "snack", // Default to 'snack'; controlled by radio buttons
  };

  // useState hook to manage form input data
  const [inputData, setInputData] = useState(defaultInputData);
  const [currentUser, setCurrentUser] = useContext(UserContext);

  //handle user login => update UserContext
  const handleLogin = async (userData) => {
    try {
      const resp = await JoblyApi.loginUser(userData); //send userData to backend for authentication
      setCurrentUser(resp); //update context
    } catch (error) {
      console.error(`handleLogin error: ${error}`);
    }
  };
  //handle user registration => update UserContext
  const handleNewUser = async (userData) => {
    try {
      const resp = await JoblyApi.registerNewUser(userData); //send userData to backend to save to db
      setCurrentUser(resp); //update context
    } catch (error) {
      console.error(`handleLogin error: ${error}`);
    }
  };
  // Handle input changes for text and textarea fields
  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle radio button input changes
  const handleRadioInput = (evt) => {
    setInputData((prevState) => ({
      ...prevState,
      foodType: evt.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // const { name, description, recipe, serve } = inputData;
    const userData = currentUser
      ? { ...inputData, currentUser }
      : { ...inputData };
    try {
      // Make API call based on authType => truthy => register; falsy => login
      if (authType === "signup") {
        const newUser = await JoblyApi.handleNewUser(userData);
        console.log('signup successful', newUser)
      }
      if (authType === "login") {
        const newUser = await JoblyApi.handleLogin(userData);
        console.log('login successful', newUser)
      }
      if (authType === "edit") {
        const newUser = await JoblyApi.editUser(userData);
        console.log('edit successful', newUser)
      }
      // Reset the form after successful submission
      setInputData(defaultInputData);
      
      //navigate user to homepage or user profile if authType === 'edit'
      authType !== 'edit' ? navigate.push('/') : navigate.push(`/users/${currentUser.username}`)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Card>
      <CardTitle className="font-weight-bold text-center">
        Submit Your Own Snack or Booze Creation!
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={8}>
              Food Name
            </Label>
            <Col sm={10}>
              <Input
                id="name"
                name="name"
                placeholder="New food name"
                type="text"
                value={inputData.name}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="description" sm={8}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                id="description"
                name="description"
                type="textarea"
                value={inputData.description}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="recipe" sm={8}>
              Recipe
            </Label>
            <Col sm={10}>
              <Input
                id="recipe"
                name="recipe"
                type="textarea"
                value={inputData.recipe}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="serve" sm={8}>
              How To Serve
            </Label>
            <Col sm={10}>
              <Input
                id="serve"
                name="serve"
                type="textarea"
                value={inputData.serve}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row tag="fieldset">
            <legend className="col-form-label col-sm-8">Food Type</legend>
            <Col sm={10}>
              <FormGroup check>
                <Input
                  type="radio"
                  name="foodType"
                  value="snack"
                  checked={inputData.foodType === "snack"}
                  onChange={handleRadioInput}
                />
                <Label check>Snack</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="radio"
                  name="foodType"
                  value="drink"
                  checked={inputData.foodType === "drink"}
                  onChange={handleRadioInput}
                />
                <Label check>Drink</Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ offset: 2, size: 10 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AuthPage;
