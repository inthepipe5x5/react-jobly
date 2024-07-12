/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";
import CompanyResult from "./CompanyResult";
import JobResult from "./JobResult";
import UserResult from "./UserResult";
import JoblyApi from "./api";
import { capitalizeWord } from "./helper";
import { useUserContext } from "./useUserContext";

const Result = ({ resultType = "company", cantFind = NotFound }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUserContext();
  const { companyName, jobName, username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        let data;
        if (resultType === "company" && companyName) {
          data = await JoblyApi.getCompany(companyName);
        } else if (resultType === "job" && jobName) {
          data = await JoblyApi.getJob(jobName);
        } else if (resultType === "user" && username) {
          data = await JoblyApi.getUser(username);
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
  }, [resultType, cantFind, username, companyName, jobName, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!result) {
    return null;
  }

  if (username && username === currentUser.username)
    return navigate("/profile");

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
        {!ResultComponent ? (
          () => {
            navigate(cantFind);
          }
        ) : (
          <ResultComponent result={result} />
        )}
      </div>
    </div>
  );
};

export default Result;
