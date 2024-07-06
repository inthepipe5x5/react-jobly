/* eslint-disable no-unused-vars */
import React, { useState, createElement, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashMessageContext } from "./FlashMessageContext";
import JoblyApi from "./api";
import ErrorPageContent from "./ErrorContent";
import NotFound from "./NotFound";
import JobResult from "./JobResult";
import CompanyResult from "./CompanyResult";
import UserResult from "./UserResult";
import LoadingSpinner from "./LoadingSpinner";
import { handleCaughtError } from "./helper";

const Detail = ({ data }) => {
  const [detailContent, setDetailContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { flashMessage, showFlashMessage, DismissFlashMessage } =
    useContext(FlashMessageContext);
  //grab location, currentPath, url params
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; //ie. users,companies,jobs
  const uniqueIdentifier = location.pathname.split("/")[2]; //ie. username, company_handle, job_title
  const uniqueIdentifierType = {
    companies: "handle",
    jobs: "id",
    users: "username",
  }[currentPath];
  //grab data from api using location variables
  // useEffect(() => {
  const getAllData = async () => {
    try {
      const resp = await JoblyApi.request(`${location.pathname}`);
      console.log("DETAIL.jsx",{
        list_data: resp,
      });
      if (![200, 201].includes(resp.status) || resp.data.error)
        throw new Error(resp.data.error, resp.status);
      else {
        setDetailContent(
          resp[uniqueIdentifierType][uniqueIdentifier] || resp.data || []
        );
      }
    } catch (error) {
      if (error.statusCode === 401 || error.status === 401) {
        navigate("/login");
      }
      const { errTitle, errMessage, errType } = handleCaughtError(
        error,
        location.pathname
      );
      setDetailContent({
        error: error,
        status: error?.status || error?.statusCode,
        message: error?.message || "error fetching detail data",
      });

      showFlashMessage(errTitle, errMessage, errType);
    } finally {
      setIsLoading(false);
    }
  };
  getAllData();
  // });
  //dynamically set component based on current path
  const detailItemComponent = {
    companies: CompanyResult,
    jobs: JobResult,
    users: UserResult,
  }[currentPath];
  //handle if no results found
  if (detailContent.error)
    return +detailContent?.status === 404 ? (
      createElement(NotFound)
    ) : (
      <ErrorPageContent
        contentType={currentPath || location.pathname}
        errStatus={detailContent?.status || detailContent.error?.status}
        message={detailContent?.message || detailContent.error?.message}
      />
    );
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
