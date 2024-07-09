import React, { useState } from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const FlashMessage = ({ title, message, type = "danger", onDismiss }) => {
  const [visible, setVisible] = useState(true);

  const onAcknowledge = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!message) return null;
  if (type === "error") type = "danger";

  return (
    <Toast isOpen={visible}>
      <ToastHeader toggle={onAcknowledge}>
        {type} {title}
      </ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  );
};

export default FlashMessage;
