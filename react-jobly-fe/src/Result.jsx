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

const Result = ({ resultType = "company", cantFind = NotFound }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!result) {
    return null;
  }

  const ResultComponent = {
    company: CompanyResult,
    job: JobResult,
    user: UserResult,
  }[resultType.toLowerCase()];

  if (!ResultComponent) {
    navigate(cantFind);
    return null;
  }

  return (
    <section>
      <ResultComponent result={result} />
    </section>
  );
};

export default Result;
