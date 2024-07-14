/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, createElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardText,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";
import { v4 as uuid } from "uuid";
import { capitalizeWord, handleCaughtError } from "./helper";
import LoadingSpinner from "./LoadingSpinner";
import JobResult from "./JobResult";
import UserResult from "./UserResult";
import CompanyResult from "./CompanyResult";
import JoblyApi from "./api";
import NotFound from "./NotFound";
import ErrorPageContent from "./ErrorContent";
import { useUserContext } from "./useUserContext";

const List = () => {
  const [listContent, setListContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1];

  useEffect(() => {
    setListContent([]);
    const getAllData = async () => {
      try {
        const resp = await JoblyApi.request(`${currentPath}`);
        const listData = resp.data[currentPath];
        setListContent(listData || []);
        console.debug("List.jsx =>", listData);
      } catch (error) {
        const { errTitle, errMessage } = handleCaughtError(error);
        setListContent({
          error: true,
          status: errTitle,
          message: errMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, [currentPath, navigate]);

  const generateContentCards = (content) => {
    const uniqueIdentifier = {
      companies: "handle",
      jobs: "id",
      users: "username",
    }[currentPath];

    const listItemComponent = {
      companies: CompanyResult,
      jobs: JobResult,
      users: UserResult,
    }[currentPath];

    return content.map((item) => (
      <ListGroupItem key={uuid()}>
        <Link to={`/${currentPath}/${item[uniqueIdentifier]}`}>
          {console.debug("List.jsx item=>", item instanceof Object)}
          {createElement(listItemComponent, { result: item, detailed: false })}
        </Link>
      </ListGroupItem>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  if (!isLoading && listContent.error)
    return (
      <ErrorPageContent
        contentType={currentPath || location.pathname}
        errStatus={listContent.status}
        message={listContent.message}
      />
    );

  return (
    <Container tag="section" className="col-8" fluid>
      <Card>
        <CardBody>
          <CardHeader tag="h3" className="font-weight-bold text-center">
            <CardTitle>{capitalizeWord(currentPath)} Directory</CardTitle>
          </CardHeader>
          <CardText>{`${capitalizeWord(currentPath)} Results: ${
            listContent.length
          }`}</CardText>
          <ListGroup>{generateContentCards(listContent)}</ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
};

export default List;
