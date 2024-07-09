import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Col,
  Row,
  ButtonGroup,
} from "reactstrap";
import { capitalizeWord } from "./helper";

const ErrorPageContent = ({ contentType = "company", errStatus = 404, message }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const contentMessageHeader = message || {
    404: `The ${capitalizeWord(contentType)} you are looking for does not exist.`,
    401: `You are not authorized to view the ${capitalizeWord(contentType)} you are looking for.`,
    500: "Internal server error",
  }[errStatus];

  return (
    <Row className="justify-content-center">
      <Col sm="10" md="8">
        <Card className="text-center">
          <CardBody>
            <CardTitle tag="h1" className="font-weight-bold">
              {`${errStatus} - Page Not Found`}
            </CardTitle>
            <p>{contentMessageHeader}</p>
            <hr />
            <p>{message || "An error occurred"}</p>
            <ButtonGroup>
              <Button color="primary" onClick={handleGoHome}>
                Go to Home Page
              </Button>
              {errStatus === 401 && (
                <>
                  <Button
                    color="secondary"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </Button>
                  <Button
                    color="info"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </>
              )}
            </ButtonGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ErrorPageContent;
