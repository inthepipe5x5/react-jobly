/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, createElement, useContext } from "react";
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
  Container,
} from "reactstrap";
import { v4 as uuid } from "uuid";
// import { FlashMessageContext } from "./FlashMessageContext";
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
  const { userDetails } = useUserContext();
  // const { flashMessage, showFlashMessage, DismissFlashMessage } =
  // useContext(FlashMessageContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1];
  useEffect(() => {
    //clear any pre-existing content
    setListContent((listContent) => []);
    const getAllData = async () => {
      try {
        const resp = await JoblyApi.request(`${currentPath}`);
        const listData =
          userDetails.applications.length === 0
            ? resp["data"][currentPath]
            : resp["data"][currentPath].map(
                (listItem) =>
                  (listItem = userDetails.applications.includes(listItem.id)
                    ? (listItem.applied = true)
                    : listItem.applied=false)
              );
        setListContent(listData || []);
      } catch (error) {
        const { errTitle, errMessage, errType } = handleCaughtError(error);
        //set listContent to reflect the error
        setListContent({
          error: error,
          type: currentPath,
          status: errTitle,
          message: errMessage,
        });
        // showFlashMessage(errTitle, errMessage, errType);
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, [currentPath, navigate /*showFlashMessage*/]);

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

    return content.error ? (
      <ErrorPageContent
        contentType={currentPath || location.pathname}
        errStatus={content?.status || content.error?.status}
        message={content?.message || content.error?.message}
      />
    ) : (
      content.map((item) => (
        <ListGroupItem key={uuid()}>
          <Link to={`/${currentPath}/${item[uniqueIdentifier]}`}>
            {createElement(listItemComponent, { result: item })}
          </Link>
        </ListGroupItem>
      ))
    );
  };

  if (isLoading) return <LoadingSpinner />;

  if (listContent.length === 0) return <NotFound></NotFound>;

  return (
    <Container tag="section" className="col-8" fluid>
      <Card>
        <CardBody>
          <CardHeader tag="h3" className="font-weight-bold text-center">
            <CardTitle>{capitalizeWord(currentPath)} Directory</CardTitle>
          </CardHeader>
          <CardText>{`${currentPath} Results: ${listContent.length}`}</CardText>
          <ListGroup>{generateContentCards(listContent)}</ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
};
export default List;
