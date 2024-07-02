import React, { useState, useContext, createContext } from "react";

const FlashMessageContext = createContext();

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error("useFlashMessage must be used within a FlashMessageProvider");
  }
  return context;
};

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const showFlashMessage = (message, type = "info", duration = 3000) => {
    setFlashMessage({ message, type });
    setTimeout(() => {
      setFlashMessage(null);
    }, duration);
  };

  return (
    <FlashMessageContext.Provider value={{ flashMessage, showFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
