/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Button, Col, Row } from "reactstrap";

const NotFound = () => {
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Handler for the button click event
  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Row className="justify-content-center">
      <Col sm="10" md="8">
        <Card className="text-center">
          <CardBody>
            <CardTitle tag="h1" className="font-weight-bold">
              404 - Page Not Found
            </CardTitle>
            <p>The page you are looking for does not exist.</p>
            <Button color="primary" onClick={handleGoHome}>
              Go to Home Page
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NotFound;
