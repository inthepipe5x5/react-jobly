/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";

const LoadingSpinner = () => {
    <Button color="primary" disabled>
        <Spinner size="sm">Loading...</Spinner>
        {/* <span> Loading</span> */}
      </Button>
}

export default LoadingSpinner