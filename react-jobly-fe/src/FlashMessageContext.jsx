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

export const FlashMessageContext = createContext(null);

export const DismissFlashMessage = () => {
  const [flashMessage, setFlashMessage] = useContext(FlashMessageContext);
  //   const location = useLocation();
  flashMessage ? setFlashMessage(null) : null;
  return null;
};

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  /*
  memoized function to show Flash Messages with a timed interval
  */
  const showFlashMessage = useCallback(
    (message, type, messageInterval = 5000) => {
      //clear previous flash message if existing
      DismissFlashMessage();
      //set new flash message
      setFlashMessage({ message, type });
      setTimeout(() => DismissFlashMessage(), messageInterval); // Auto-hide after 5 seconds

      showFlashMessage(message, type, setFlashMessage, messageInterval);

      return console.log(`Flash Message Context Updated: ${type}: ${message}`);
    },
    []
  );
  const contextValue = useMemo(() => {
    flashMessage, showFlashMessage, DismissFlashMessage;
  }, [flashMessage, showFlashMessage]);

  return (
    <FlashMessageContext.Provider value={{ contextValue }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
