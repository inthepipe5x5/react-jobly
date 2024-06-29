import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, Button, Col, Row } from "reactstrap";

const NotFound = () => {
  // useHistory hook to programmatically navigate
  const history = useHistory();

  // Handler for the button click event
  const handleGoHome = () => {
    history.push("/"); // Navigate to the home page
  };

  return (
    <Row className="justify-content-center">
      <Col sm="10" md="8">
        <Card className="text-center">
          <CardBody>
            <CardTitle className="font-weight-bold">
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
