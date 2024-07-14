/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import ErrorPageContent from "./ErrorContent";
import NotFound from "./NotFound";
import JobResult from "./JobResult";
import CompanyResult from "./CompanyResult";
import UserResult from "./UserResult";
import LoadingSpinner from "./LoadingSpinner";
import { handleCaughtError } from "./helper";

const Detail = () => {
  const [detailContent, setDetailContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; // ie. users, companies, jobs
  const uniqueIdentifier = location.pathname.split("/")[2]; // ie. username, company_handle, job_title
  const uniqueIdentifierType = {
    companies: "handle",
    jobs: "id",
    users: "username",
  }[currentPath];

  useEffect(() => {
    const getAllData = async () => {
      try {
        const resp = await JoblyApi.request(`${location.pathname}`);
        if (resp.error) {
          throw new Error(resp.error.message);
        }
        setDetailContent(resp.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 404) {
          setDetailContent({ error: true, status: 404 });
        } else {
          setDetailContent({
            error: true,
            status: error.response?.status,
            message: error.message || "Error fetching detail data",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, [location.pathname, navigate]);

  const detailItemComponent = {
    companies: CompanyResult,
    jobs: JobResult,
    users: UserResult,
  }[currentPath];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (detailContent?.error) {
    return detailContent.status === 404 ? (
      <NotFound />
    ) : (
      <ErrorPageContent
        contentType={currentPath}
        errStatus={detailContent.status}
        message={detailContent.message}
      />
    );
  }

  return createElement(detailItemComponent, {
    result: detailContent,
    detailed: true,
  });
};

export default Detail;
