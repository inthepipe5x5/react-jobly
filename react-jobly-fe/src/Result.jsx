/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import CompanyResult from "./CompanyResult";
import JobResult from "./JobResult";
import JoblyApi from "../../api";
const Result = ({ resultType = "company", cantFind = NotFound }) => {
  let urlParams = useParams();
  let result = null;
  if (resultType === "company") {
    const { companyName } = urlParams;
    result = JoblyApi.getCompany(companyName);
  }
  if (resultType === "job") {
    const { jobName } = urlParams;
    result = JoblyApi.getCompany(jobName);
  }

  if (!result) return <Redirect to={cantFind} />;

  return (
    <section>
      {resultType === "company" ? (
        <CompanyResult result={result}></CompanyResult>
      ) : (
        <JobResult result={result}></JobResult>
      )}
    </section>
  );
};

export default Result;
