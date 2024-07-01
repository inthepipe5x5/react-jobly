/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Container fluid>
      <Row>
        <section className="col-md-8">
          <Card>
            <CardTitle>
              <h3 className="font-weight-bold">Welcome to Jobly!</h3>
            </CardTitle>
            <CardBody className="text-center">
              Let's apply for some jobs!
              {/* Currently, we have {users.length} users searching for{" "}
                {jobs.length} job postings from {companies.length} companies! */}
              <Link to="/jobs">
                <Button outline color="primary">
                  View Job Postings
                </Button>
              </Link>
              <Link to="/companies">
                <Button outline color="secondary">
                  Discover Companies
                </Button>
              </Link>
            </CardBody>
          </Card>
        </section>
      </Row>
    </Container>
  );
};

export default Home;
