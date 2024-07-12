import React, { useState, useMemo, useCallback, createContext } from "react";
import JoblyApi from "./api.js";
import {
  updateLocalStorageToken,
  removeLocalStorageTokenAfterLogout,
  retrieveStoredPrevUser,
} from "./helper.js";
import { useNavigate } from "react-router";

const UserContext = createContext({
  currentUser: retrieveStoredPrevUser(),
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(retrieveStoredPrevUser());

  const loginUser = useCallback((token, username) => {
    if (!token || !username) return;
    updateLocalStorageToken({ token, username });
    JoblyApi.token = token;
    setCurrentUser({ token, username });
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser({ token: null, username: null });
    removeLocalStorageTokenAfterLogout();
  }, []);

  const contextValue = useMemo(() => ({ currentUser, loginUser, logoutUser }), [currentUser, loginUser, logoutUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
