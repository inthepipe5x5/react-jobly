/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  const { id, title, salary, equity, company_handle } = result;
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
          <b> Company:</b> {company_handle}
        </CardSubtitle>
        <CardText className="font-italic">
          <ListGroup horizontal='md'>
            <ListGroupItem>${formatSalary(salary)}</ListGroupItem>
            <ListGroupItem>{`equity: ${equity}`}</ListGroupItem>
            <ListGroupItem>{`Job Id: ${id}`}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default JobResult;
