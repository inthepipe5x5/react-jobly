/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createElement } from "react";
import {
  Button,
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
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import JobResult from "./JobResult";
import ImageWithDefault from "./ImageWithDefault";

const CompanyResult = ({ result, detailed = false }) => {
  const { handle, name, numEmployees, description, logoUrl, jobs } = result;
  const navigate = useNavigate();
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
              <hr></hr>
              {jobs.map((job) => (
                <Link key={uuid()} to={`/jobs/${job.title}`}>
                  <ListGroupItem key={uuid()}>
                    {createElement(JobResult, { result: job, detailed: true })}
                  </ListGroupItem>
                </Link>
              ))}
            </ListGroup>
            {logoUrl && (
              <CardImg top>
                {createElement(ImageWithDefault, {
                  src: logoUrl,
                  defaultSrc: "company",
                  altInfo: `${name} logo`,
                })}
              </CardImg>
            )}
            <Button
              color="info"
              onClick={() => {
                navigate("/companies");
              }}
            >
              Go back to Companies
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CompanyResult;
