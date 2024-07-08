import React, { createContext, useContext } from "react";
import { UserContext } from "./UserContextProvider";

//custom hook to use UserContext in child components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a FlashMessageProvider"
    );
  }
  return context;
};
