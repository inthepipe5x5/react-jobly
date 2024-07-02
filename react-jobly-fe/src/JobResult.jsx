/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const JobResult = ({ result, detailed = false }) => {
  if (!result) return null;

  const { id, title, salary, equity, company_handle } = result;
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
        <CardTitle tag="h3">{title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {company_handle}
        </CardSubtitle>
        {detailed ? createElement(detailedOnly) : ""}
        <CardText className="mt-3">
          <Badge color="primary" pill>
            Job ID: {id}
          </Badge>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default JobResult;
