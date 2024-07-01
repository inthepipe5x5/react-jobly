/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardText,
  ListGroup,
  ListGroupItem,
  Spinner,
  Row,
} from "reactstrap";
import { v4 as uuid } from "uuid";

import { capitalizeWord } from "./helper";
import LoadingSpinner from "./LoadingSpinner";
import JobResult from "./JobResult";
import UserResult from "./UserResult";
import CompanyResult from "./CompanyResult";
import JoblyApi from "./api";

function List() {
  const [listContent, setListContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  // Extract the current path
  const currentPath = location.pathname.split("/")[1];

  useEffect(() => {
    const getAllData = async () => {
      //GET request using JoblyApi class
      const resp = await JoblyApi.request(`/${currentPath}`);
      console.log({
        list_data: resp,
      });
      //update listContent
      setListContent((listContent) => [...resp.data, ...listContent]);
    };
    try {
      getAllData();
      //update isLoading state
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [currentPath]);

  const generateContentCards = (listContent) => {
    //dynamically generate uniqueIdentifier
    let uniqueIdentifier = {
      companies: "handle",
      jobs: "title",
      users: "username",
    }[currentPath];
    let listItemComponent = {
      companies: CompanyResult,
      jobs: JobResult,
      users: UserResult,
    }[currentPath];

    listContent.map((item) => (
      <ListGroup key={uuid()}>
        <Link to={`/${currentPath}/${item[uniqueIdentifier]}`} key={uuid()}>
          <ListGroupItem>{listItemComponent(item)}</ListGroupItem>
        </Link>
      </ListGroup>
    ));
  };
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardHeader className="font-weight-bold text-center">
            <CardTitle>{capitalizeWord(currentPath)} Directory</CardTitle>
          </CardHeader>
          <CardText>
            {isLoading ? (
              <Spinner>Loading...</Spinner>
            ) : (
              `Found the following ${currentPath}: ${listContent.length}`
            )}
    
          </CardText>
          {isLoading ? LoadingSpinner : generateContentCards(listContent)}
        </CardBody>
      </Card>
    </section>
  );
}

export default List;
