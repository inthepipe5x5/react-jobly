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
  Spinner,
} from "reactstrap";
import { v4 as uuid } from "uuid";

import { capitalizeWord } from "./helper";
import LoadingSpinner from "./LoadingSpinner";
import JobResult from "./JobResult";
import UserResult from "./UserResult";
import CompanyResult from "./CompanyResult";
import JoblyApi from "./api";
import NotFound from "./NotFound";

const List = () => {
  const [listContent, setListContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1];

  useEffect(() => {
    const getAllData = async () => {
      try {
        const resp = await JoblyApi.request(`${currentPath}`);
        console.log({
          list_data: resp,
        });
        setListContent(resp[currentPath] || []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else if (error.response && error.response.status === 404) {
          setError('Not Found');
        } else {
          setError('An unexpected error occurred');
        }
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
          {createElement(listItemComponent, { result: item })}
        </Link>
      </ListGroupItem>
    ));
  };

  if (error === 'Not Found') {
    return <NotFound />;
  }

  return (
    <section>
      <Card>
        <CardBody>
          <CardHeader className="font-weight-bold text-center">
            <CardTitle>{capitalizeWord(currentPath)} Directory</CardTitle>
          </CardHeader>
          <CardText>
            {isLoading ? (
              <Spinner>Loading...</Spinner>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              `Found the following ${currentPath}: ${listContent.length}`
            )}
          </CardText>
          {isLoading ? <LoadingSpinner /> : <ListGroup>{generateContentCards(listContent)}</ListGroup>}
        </CardBody>
      </Card>
    </section>
  );
}

export default List;
