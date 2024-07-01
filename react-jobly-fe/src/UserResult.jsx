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

const UserResult = ({ result }) => {
  const { username, first_name, last_name, email, is_admin } = result;
  return (
    <Card>
      <CardBody>
        <CardTitle className="font-weight-bold text-center">
          {first_name} {last_name}
        </CardTitle>
        <CardSubtitle>
          <b> User Handle:</b> {username}
        </CardSubtitle>
        <CardText></CardText>
        <ListGroup horizontal="md">
          <ListGroupItem>
            <ListGroupItemHeading>Email:</ListGroupItemHeading>
            <ListGroupItemText>{email}</ListGroupItemText>
            <ListGroupItemHeading>Admin Privileges:</ListGroupItemHeading>
            <ListGroupItemText>
              {is_admin ? "Admin ✔" : "Not Admin ❌"}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default UserResult;
