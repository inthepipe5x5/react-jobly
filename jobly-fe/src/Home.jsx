/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center home-container"
    >
      <section className="col-md-8">
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <h3 className="font-weight-bold">Welcome to Jobly!</h3>
            </CardTitle>
            <CardSubtitle>
              <small>
                <i>Where jobs meet people</i>
              </small>
            </CardSubtitle>
            <Row className="mt-3 d-flex justify-content-around">
              <Link to="/jobs">
                <Button outline color="primary">
                  View Jobs
                </Button>
              </Link>
              <Link to="/companies">
                <Button outline color="secondary">
                  Discover Companies
                </Button>
              </Link>
            </Row>
          </CardBody>
        </Card>
      </section>
    </Container>
  );
};

export default Home;
