/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, createElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
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
import ErrorContentCard from "./ErrorContentCard";
import { useUserContext } from "./useUserContext";

const ListPage = () => {
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
        if (
          resp.error ||
          resp?.statusText !== "ok" ||
          `${resp.status}`[0] !== 2
        ) {
          const err = new Error(resp.error || resp.data.error.message);
          err.status = resp.status || resp.statusText || 404;
          throw err
        }
        const listData = resp.data[currentPath];
        setListContent(listData || []);
      } catch (error) {
        const { errTitle, errMessage } = handleCaughtError(error);
        setListContent({
          error: true,
          status: error.status || errTitle,
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

    if (!isLoading && content.error) {
      return (
        <ErrorContentCard
          contentType={currentPath || location.pathname}
          errStatus={content.status}
          message={listContent.message}
        />
      );
    }
    return content.map((item) => (
      <ListGroupItem key={uuid()}>
        <Link to={`/${currentPath}/${item[uniqueIdentifier]}`}>
          {createElement(listItemComponent, { result: item, detailed: false })}
        </Link>
      </ListGroupItem>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  const foundCountBadgeColor = listContent.length > 0 ? "success" : "secondary";

  return (
    <Container tag="section" className="col-8" fluid>
      <Card>
        <CardBody>
          <CardHeader tag="h3" className="font-weight-bold text-center">
            <CardTitle>{capitalizeWord(currentPath)} Directory</CardTitle>
          </CardHeader>
          <CardText>
            {`${capitalizeWord(currentPath)} found:`}{" "}
            <Badge pill color={foundCountBadgeColor}>
              {listContent.length}
            </Badge>
          </CardText>
          <ListGroup>{generateContentCards(listContent)}</ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ListPage;
