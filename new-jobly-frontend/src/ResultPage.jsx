/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createElement } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";
import CompanyResult from "./CompanyResult";
import JobResult from "./JobResult";
import UserResult from "./UserResult";
import JoblyApi from "./api";
import { capitalizeWord } from "./helper";
import { useUserContext } from "./useUserContext";

const ResultPage = (resultType = "company", cantFind = NotFound) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUserContext();
  const { companyName, jobName, username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchResult = async () => {
      const uniqueIdentifier = {
        companies: "handle",
        jobs: "id",
        users: "username",
      }[location.pathname.split("/")[1]];

      try {
        let data;
        if (resultType === "company" && companyName) {
          data = await JoblyApi.getCompany(companyName)[uniqueIdentifier];
        } else if (resultType === "job" && jobName) {
          data = await JoblyApi.getJob(jobName)[uniqueIdentifier];
        } else if (resultType === "user" && username) {
          data = await JoblyApi.getUser(username)[uniqueIdentifier];
        } else {
          navigate(cantFind);
          return;
        }
        setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate(cantFind);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [resultType, cantFind, username, companyName, jobName, navigate, location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // if (!result && !isLoading) {
  //   return <NotFound />;
  // }

  if (username && username === currentUser.username) {
    navigate("/profile");
    return null;
  }

  const ResultComponent = {
    company: CompanyResult,
    job: JobResult,
    user: UserResult,
  }[resultType.toLowerCase()];

  return (
    <div className="card-container mb-5">
      <div className="container">
        <h5 className="display-4 mb-4 font-weight-bold">{`${capitalizeWord(
          resultType
        )}`}</h5>
        {ResultComponent ? (
          createElement(ResultComponent, {
            result: result,
            detailed: false,
          })
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default ResultPage;
