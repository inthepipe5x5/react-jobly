import {
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import {
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

const FlashMessage = ({
  title,
  message,
  onDismiss,
  type = "danger",
  duration = 5000,
  autoDismiss = true,
}) => {
  const [visible, setVisible] =
    useState(true);

  const onAcknowledge = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };
  //#region auto dismiss effect
  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [
    duration,
    onDismiss,
    autoDismiss,
  ]);
  //#endregion auto dismiss effect

  if (!message) return null;
  if (type === "error") type = "danger";

  return (
    <Toast
      isOpen={visible}
      style={{
        position: "absolute",
        top: "60px",
        right: "50%",
        zIndex: 1000,
      }}
    >
      <ToastHeader
        toggle={onAcknowledge}
        icon={type}
      >
        {title}
      </ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  );
};
FlashMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onDismiss: PropTypes.func,
  duration: PropTypes.number,
  autoDismiss: PropTypes.bool,
};

export default FlashMessage;
