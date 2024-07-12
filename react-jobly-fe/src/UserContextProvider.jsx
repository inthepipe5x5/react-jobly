import React, { useState, useMemo, useCallback, createContext } from "react";
import JoblyApi from "./api.js";
import useLocalStorage from "./useLocalStorage.jsx";

const UserContext = createContext({
  currentUser: { token: null, username: null },
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [localUserToken, setLocalUserToken] = useLocalStorage();
  const [currentUser, setCurrentUser] = useState(localUserToken);

  const loginUser = useCallback((token, username) => {
    if (!token || !username) return;
    const user = { token, username };
    setLocalUserToken(user);
    JoblyApi.token = token;
    setCurrentUser(user);
  }, [setLocalUserToken]);

  const logoutUser = useCallback(() => {
    setLocalUserToken(undefined); // Clear localStorage
    JoblyApi.token = null;
    setCurrentUser({ token: null, username: null });
  }, [setLocalUserToken]);

  const contextValue = useMemo(() => ({
    currentUser,
    loginUser,
    logoutUser,
  }), [currentUser, loginUser, logoutUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
