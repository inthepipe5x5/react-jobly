import React from "react";
import { Badge, Card, CardBody, CardTitle, CardText, CardSubtitle, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useUserContext } from "./useUserContext";
import JoblyApi from "./api";
import { useNavigate } from "react-router-dom";

const JobResult = ({ result, detailed = false }) => {
  const { currentUser, userDetails, fetchUserDetails } = useUserContext();
  const { id, title, salary, equity, companyName } = result;
  const { applications } = userDetails || fetchUserDetails();
  const navigate = useNavigate();

  const handleJobApp = async () => {
    const { username } = currentUser || userDetails;
    await JoblyApi.newJobApp(username, id);
    fetchUserDetails();
    navigate('/jobs');
  };

  return (
    <Card className="my-3">
      <CardBody>
        <CardTitle tag="h3">{title} </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {companyName ? companyName : "Unknown Company"}
        </CardSubtitle>
        {detailed && (
          <ListGroup flush>
            <ListGroupItem>
              Salary: {salary ? `$${salary.toLocaleString()}` : "Not specified"}
            </ListGroupItem>
            <ListGroupItem>
              Equity: {equity ? `${(equity * 100).toFixed(2)}%` : "None"}
            </ListGroupItem>
          </ListGroup>
        )}
        <CardText className="mt-3">
          <Badge color={applications.includes(id) ? "success" : "primary"} pill>
            Job ID: {id} {applications.includes(id) ? "✅" : "📃"}
          </Badge>
        </CardText>
        {applications.includes(id) ? (
          <Button color="secondary" disabled>Apply</Button>
        ) : (
          <Button color="primary" onClick={handleJobApp}>Apply</Button>
        )}
      </CardBody>
    </Card>
  );
};

export default JobResult;
