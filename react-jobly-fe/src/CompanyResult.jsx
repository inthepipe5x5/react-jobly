/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createElement } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const CompanyResult = ({result, detailed = false}) => {
  const { handle, name, numEmployees, description, logoUrl } = result;
  return (
    <Card className="my-3">
      <CardBody>
        <CardTitle tag="h3">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Handle: {handle}
        </CardSubtitle>
        {detailed && (
          <>
            <CardText>{description}</CardText>
            <ListGroup flush>
              <ListGroupItem>
                Number of Employees: <Badge>{numEmployees || "❓"}</Badge>
              </ListGroupItem>
            </ListGroup>
            {logoUrl && (
              <CardImg top>
                <img
                  src={logoUrl}
                  alt={`${name} logo`}
                  className="mt-3"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </CardImg>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CompanyResult;
