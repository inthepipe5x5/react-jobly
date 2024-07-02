import React, { useState, createElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import NotFound from "./NotFound";
import JobResult from "./JobResult";
import CompanyResult from "./CompanyResult";
import UserResult from "./UserResult";
import LoadingSpinner from "./LoadingSpinner";
import JoblyApi from "./api";

const Detail = ({ data }) => {
  const [detailContent, setDetailContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //grab location, currentPath, url params
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; //ie. users,companies,jobs
  const uniqueIdentifier = location.pathname.split("/")[2]; //ie. username, company_handle, job_title
  const uniqueIdentifierType = {
    companies: "handle",
    jobs: "id",
    users: "username",
  }[currentPath];
  //grab data from api using location variables
  useEffect(() => {
    const getAllData = async () => {
      try {
        const resp = await JoblyApi.request(`${location.pathname}`);
        console.log({
          list_data: resp,
        });
        setDetailContent(
          resp[uniqueIdentifierType][uniqueIdentifier] || resp || []
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else if (error.response && error.response.status === 404) {
          setError("Not Found");
        } else {
          setError("An unexpected error occurred");
        }
        setIsLoading(false);
      }
    };
    getAllData();
  }, [currentPath, navigate]);
  //dynamically set component based on current path
  const detailItemComponent = {
    companies: CompanyResult,
    jobs: JobResult,
    users: UserResult,
  }[currentPath];
  //handle if no results found
  if (error === "Not Found") return createElement(NotFound);

  if (isLoading) {
    return createElement(LoadingSpinner);
  } else {
    return createElement(detailItemComponent, {
      result: detailContent,
      detailed: true,
    });
  }
};

export default Detail;
