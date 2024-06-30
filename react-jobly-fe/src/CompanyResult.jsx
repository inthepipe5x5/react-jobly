/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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

const CompanyResult = ({ result }) => {
  const { handle, name, num_employees, description, logo_url } = result;
  return (
    <Card>
      <CardImg
        alt={`${handle} Logo`}
        src={logo_url}
        style={{
          height: 180,
        }}
        top
        width="100%"
      />
      <CardBody>
        <CardTitle className="font-weight-bold text-center">{name}</CardTitle>
        <CardSubtitle>
          <b> Company Handle:</b> {handle}
        </CardSubtitle>
        <CardText className="font-italic">{description}</CardText>
        <ListGroup horizontal="md">
          <ListGroupItem>
            <ListGroupItemHeading>Employees:</ListGroupItemHeading>
            <ListGroupItemText>{num_employees}</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default CompanyResult;
