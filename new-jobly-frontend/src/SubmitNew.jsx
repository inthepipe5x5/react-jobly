/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createElement, useState } from "react";
import {
  Alert,
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
import JoblyApi from "./api";
import LoadingSpinner from "./LoadingSpinner";
import { validate } from "uuid";
// import { validateNewJobFormData } from "./helper";

const SubmitNew = () => {
  const defaultJobInputData = {
    title: "",
    description: "",
    salary: "",
    equity: "",
    company_handle: "",
  };

  const [inputData, setInputData] = useState(defaultJobInputData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    const { title, salary, equity, company_handle } = inputData;

    try {
      // const validInput = await validateNewJobFormData({
      //   title,
      //   salary,
      //   equity,
      //   company_handle,
      // });
      // if (!validInput) throw new Error("Invalid form submission");
      await JoblyApi.postJob({
        title,
        salary: parseInt(salary),
        equity: parseFloat(equity),
        company_handle,
      });

      setInputData(defaultJobInputData);
    } catch (error) {
      console.error("Error submitting job data:", error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };
  if (isLoading) {
    return createElement(LoadingSpinner);
  }
  return (
    <Card>
      <CardTitle tag="h3" className="font-weight-bold text-center">
        Submit A New Job
      </CardTitle>
      {error && <Alert color="danger">{error}</Alert>}
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="title" sm={8}>
              Job Title
            </Label>
            <Col sm={10}>
              <Input
                id="title"
                name="title"
                placeholder="Job title"
                type="text"
                value={inputData.title}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="salary" sm={8}>
              Salary
            </Label>
            <Col sm={10}>
              <Input
                id="salary"
                name="salary"
                placeholder="Salary"
                type="number"
                value={inputData.salary}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="equity" sm={8}>
              Equity
            </Label>
            <Col sm={10}>
              <Input
                id="equity"
                name="equity"
                placeholder="Equity (0 to 1)"
                type="number"
                step="0.01"
                value={inputData.equity}
                onChange={handleInput}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="company_handle" sm={8}>
              Company Handle
            </Label>
            <Col sm={10}>
              <Input
                id="company_handle"
                name="company_handle"
                placeholder="Company handle"
                type="text"
                value={inputData.company_handle}
                onChange={handleInput}
              />
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

export default SubmitNew;
