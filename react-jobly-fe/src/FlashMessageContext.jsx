import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";

export const FlashMessageContext = createContext({
  flashMessage: null,
  showFlashMessage: () => {},
  dismissFlashMessage: () => {},
});

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error(
      "useFlashMessage must be used within a FlashMessageProvider"
    );
  }
  return context;
};

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const dismissFlashMessage = useCallback(() => {
    setFlashMessage(null);
  }, []);

  const showFlashMessage = useCallback(
    (title, message, type, interval = 50000) => {
      type = type === "error" ? type : "danger";
      setFlashMessage({ title, message, type });
      setTimeout(() => dismissFlashMessage(), interval);
    },
    [dismissFlashMessage]
  );
  //useMemo to optimize performance and re-renders
  const contextValue = useMemo(
    () => ({
      flashMessage,
      showFlashMessage,
      dismissFlashMessage,
    }),
    [flashMessage, showFlashMessage, dismissFlashMessage]
  );

  return (
    <FlashMessageContext.Provider value={contextValue}>
      {children}
    </FlashMessageContext.Provider>
  );
};
