/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createElement, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useUserContext } from "./useUserContext";
import JoblyApi from "./api";

const JobResult = ({ result, detailed = false }) => {
  const [application, setApplication] = useState(result.applied || false);
  const { currentUser, userDetails, fetchUserDetails } = useUserContext();
  if (!result) return null;

  const { id, title, salary, equity, company_handle } = result;

  const handleJobApp = async () => {
    const { username } = currentUser || userDetails;
    const app = await JoblyApi.newJobApp(username, id);
    if (app) {
      setApplication(true);
      fetchUserDetails();
    }
  };

  const detailedOnly = (
    <ListGroup flush>
      <ListGroupItem>
        Salary: {salary ? `$${salary.toLocaleString()}` : "Not specified"}
      </ListGroupItem>
      <ListGroupItem>
        Equity: {equity ? `${(equity * 100).toFixed(2)}%` : "None"}
      </ListGroupItem>
    </ListGroup>
  );
  return (
    <Card className="my-3">
      <CardBody>
        <CardTitle tag="h3">{title} </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {company_handle ? company_handle : "Unknown Company"}
        </CardSubtitle>
        {detailed ? createElement(detailedOnly) : ""}
        <CardText className="mt-3">
          <Badge color="primary" pill>
            Job ID: {id} {application ? "✅" : "📃"}
          </Badge>
        </CardText>
        {application ? (
          <Button color="secondary" disabled>
            Apply
          </Button>
        ) : (
          <Button color="primary" onClick={handleJobApp}>
            Apply
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default JobResult;
