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
} from "react-bootstrap";
import { Link } from "react-router";
const Home = ({ jobs, companies, users }) => {
  return (
    <Container fluid>
      <Row>
        <section className="col-md-8">
          <Card>
            <CardBody className="text-center">
              <CardTitle>
                <h3 className="font-weight-bold">Welcome to Jobly!</h3>
              </CardTitle>
              <p>
                Currently, we have {users.length} users searching for{" "}
                {jobs.length} job postings from {companies.length} companies!
              </p>
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
