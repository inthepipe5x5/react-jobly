/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Alert } from 'reactstrap';

const FlashMessage = ({ message, type = 'danger', onDismiss }) => {
  if (!message) return null;

  return (
    <Alert color={type} toggle={onDismiss}>
      {message}
    </Alert>
  );
};

export default FlashMessage;
