import React, {
  useState,
  useContext,
  createContext,
  //   useEffect,
  useMemo,
  useCallback,
} from "react";
// import { useLocation } from "react-router";
// import { showFlashMessage } from "./helper";

export const FlashMessageContext = createContext({
  title: null,
  message: null,
  type: null,
  interval: null,
});

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error(
      "useFlashMessage must be used within a FlashMessageProvider"
    );
  }
  return context;
};

export const DismissFlashMessage = () => {
  const [flashMessage, setFlashMessage] = useContext(FlashMessageContext);
  //   const location = useLocation();
  setFlashMessage((flashMessage) => {
    ["title", "message", "type", "interval"].forEach(
      (fmKey) => (flashMessage[fmKey] = null)
    );
  });
  return null;
};

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  /*
  memoized function to show Flash Messages with a timed interval
  */
  const showFlashMessage = useCallback(
    (title, message, type, interval = 5000) => {
      //clear previous flash message if existing
      DismissFlashMessage();
      //set new flash message
      setFlashMessage(flashMessage => { title, message, type, interval });
      setTimeout(() => DismissFlashMessage(), interval); // Auto-hide after 5 seconds

      showFlashMessage(title, message, type, setFlashMessage, interval);

      return console.log(`Flash Message Context Updated: ${title} - ${type}: ${message}`);
    },
    []
  );
  const contextValue = useMemo(
    () => ({
      flashMessage,
      showFlashMessage,
      DismissFlashMessage,
    }),
    [flashMessage, showFlashMessage]
  );

  return (
    <FlashMessageContext.Provider value={{ contextValue }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
