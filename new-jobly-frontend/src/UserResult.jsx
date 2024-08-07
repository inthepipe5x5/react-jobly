import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useUserContext } from "./useUserContext";
import "./UserResult.css";
import LoadingSpinner from "./LoadingSpinner";
import { capitalizeWord } from "./helper";
import teamworkImg from "./assets/teamwork.png";

const UserResult = (user) => {
  const { userDetails, jobApps } = useUserContext();
  if (!userDetails) return <LoadingSpinner></LoadingSpinner>;

  const { username, firstName, lastName, email, isAdmin = [] } = userDetails;

  return (
    // <section className="vw-100 vh-100" style={{ backgroundColor: "#f4f5f7" }}>
    // <Container className="py-5 vh-100">
    <Row className="justify-content-center align-items-center vh-100 vw-100">
      <Col lg="6" className="mb-4 mb-lg-0">
        <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
          <Row className="g-0">
            <Col
              md="4"
              className="gradient-custom text-center text-white"
              style={{
                borderTopLeftRadius: ".5rem",
                borderBottomLeftRadius: ".5rem",
              }}
            >
              <CardImg
                src={teamworkImg}
                alt="Person icons created by Freepik - Flaticon"
                className="my-5 user-icon"
                style={{ width: "80px" }}
              />
              <CardTitle tag="h5" className="mb-2 px-2">
                {capitalizeWord(firstName)} {capitalizeWord(lastName)}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted">
                {isAdmin ? "Admin 🔐" : "Job Seeker ✔"}
              </CardSubtitle>
              <Button color="success" tag={Link} to={`/users/${username}/edit`}>
                Edit Profile
              </Button>
            </Col>
            <Col md="8">
              <CardBody className="p-4">
                <CardTitle tag="h5">User Profile</CardTitle>
                <hr className="mt-0 mb-4" />
                <Row className="pt-1">
                  <Col size="6" className="mb-3">
                    <CardTitle tag="h6">Email</CardTitle>
                    <CardText className="text-muted">{email}</CardText>
                  </Col>
                  <Col size="6" className="mb-3">
                    <CardTitle tag="h6">Username</CardTitle>
                    <CardText className="text-muted">{username}</CardText>
                  </Col>
                </Row>

                <CardTitle tag="h6">Job Applications</CardTitle>
                <hr className="mt-0 mb-4" />
                {jobApps.length > 0 ? (
                  <ListGroup className="pt-1">
                    {jobApps.map((job) => (
                      <ListGroupItem key={uuid()}>
                        <Link to={`/jobs/${job.id}`}>
                          Applied for {job.title} at {job.companyName}
                          <span className="badge rounded-pill text-bg-primary">
                            ID: {job.id}
                          </span>
                        </Link>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                ) : (
                  <>
                    <CardSubtitle className="mb-3 text-muted-sm">
                      No job apps found
                    </CardSubtitle>
                    <Button color="primary" tag={Link} to="/jobs">
                      Apply for your first job!
                    </Button>
                  </>
                )}
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    // </Container>
    // </section>
  );
};

export default UserResult;
