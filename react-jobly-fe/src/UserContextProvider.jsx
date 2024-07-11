import React, { useState, useMemo, useCallback, createContext } from "react";
import JoblyApi from "./api.js";
import {
  updateLocalStorageToken,
  removeLocalStorageTokenAfterLogout,
  retrieveStoredPrevUser,
} from "./helper.js";
import { useFlashMessage } from "./FlashMessageContext.jsx";
import LoginForm from "./LoginForm.jsx";

const UserContext = createContext({
  currentUser: null,
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(retrieveStoredPrevUser() || { token: null, username: null });
  // const { showFlashMessage } = useFlashMessage();

  const loginUser = useCallback((token, username) => {
    //save token to local storage first
    updateLocalStorageToken(token);
    //set current user and cause re-rendering
    setCurrentUser({ token, username });
    // showFlashMessage("Login Success", `Welcome back, ${username}!`, "success");
    return LoginForm;
  }, [/*showFlashMessage*/]);

  const logoutUser = useCallback(() => {
    setCurrentUser({ token: null, username: null });
    removeLocalStorageTokenAfterLogout();
    // showFlashMessage("Logout Success", "Successfully logged out", "success");
  }, [/*showFlashMessage*/]);

  const contextValue = useMemo(() => ({ currentUser, loginUser, logoutUser }), [currentUser, loginUser, logoutUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
