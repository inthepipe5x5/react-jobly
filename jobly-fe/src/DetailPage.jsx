import React, { useState, useEffect, createElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import ErrorContentCard from "./ErrorContent";
import NotFound from "./NotFound";
import JobResult from "./JobResult";
import CompanyResult from "./CompanyResult";
import UserResult from "./UserResult";
import LoadingSpinner from "./LoadingSpinner";
import { handleCaughtError } from "./helper";

const DetailPage = () => {
  const [detailContent, setDetailContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; // ie. users, companies, jobs
  const uniqueIdentifier = location.pathname.split("/")[2]; // ie. username, company_handle, job_title

  useEffect(() => {
    const dataType = {
      jobs: "job",
      companies: "company",
      users: "user",
    }[currentPath];
    
    const getAllData = async () => {
      setIsLoading(true);
      try {
        console.log(location.pathname);
        const resp = await JoblyApi.request(
          `${currentPath}/${uniqueIdentifier}`
        );
        setDetailContent(resp.data[dataType]);
        console.log("Fetched data:", resp.data[dataType]);
      } catch (error) {
        console.error("Error fetching Details.jsx data:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 404) {
          setDetailContent({ error: true, status: 404 });
        } else {
          const { errTitle, errMessage } = handleCaughtError(error);
          setDetailContent({
            error: true,
            status: error.response?.status,
            message: errMessage,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    getAllData();
  }, [location.pathname, currentPath, uniqueIdentifier, navigate]);

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
      <ErrorContentCard
        contentType={currentPath}
        errStatus={detailContent.status}
        message={detailContent.message}
      />
    );
  }

  return detailContent ? createElement(detailItemComponent, {
    result: detailContent,
    detailed: true,
  }) : null;
};

export default DetailPage;
