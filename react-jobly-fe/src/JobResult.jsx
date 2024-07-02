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

const JobResult = ({ result }) => {
  if (!result) return null;

  const { id, title, salary, equity, companyName } = result;

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="font-weight-bold text-center">{title}</CardTitle>
        <CardSubtitle>
          <small>
            <i> Company:</i> {companyName}
          </small>
        </CardSubtitle>
        <CardText className="font-italic">
          <ListGroup horizontal="md">
            <ListGroupItem>{formatSalary(salary)}</ListGroupItem>
            <ListGroupItem>{`Equity: ${
              equity ? equity : "no equity ❌"
            }`}</ListGroupItem>
            <ListGroupItem>{`Job Id: ${id}`}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default JobResult;
