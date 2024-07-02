/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createElement } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardImg,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap";

const CompanyResult = ({ result, detailed = false }) => {
  const { handle, name, num_employees, description, logo_url } = result;
  const detailedOnly = (
    <>
      <CardText>{description}</CardText>
      <ListGroup flush>
        <ListGroupItem>
          Number of Employees: {num_employees || "Not specified"}
        </ListGroupItem>
      </ListGroup>
      {logo_url && (
        <img
          src={logo_url}
          alt={`${name} logo`}
          className="mt-3"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      )}
    </>
  );
  return (
    <Card className="my-3">
      <CardBody>
        <CardTitle tag="h3">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Handle: {handle}
        </CardSubtitle>
        {detailed ? createElement(detailedOnly) : ""}
      </CardBody>
    </Card>
  );
};

export default CompanyResult;
