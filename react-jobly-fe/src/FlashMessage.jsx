/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Alert, Button } from "reactstrap";
import { FlashMessageContext } from "./FlashMessageContext";

const FlashMessage = ({ title, message, type = "danger", onDismiss }) => {
  const [visible, setVisible] = useState(true);
  const onAcknowledge = () => {
    onDismiss();
    setVisible(false);
  };

  if (!message) return null;
  if (type === "error") type = "danger";

  return (
    <Alert color={type} isOpen={visible} toggle={onAcknowledge}>
      {message}
    </Alert>
  );
};

export default FlashMessage;
