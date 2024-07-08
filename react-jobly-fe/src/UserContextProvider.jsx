/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useMemo, useCallback, createContext } from "react";
import JoblyApi from "./api.js";
import {
  createNewJoblyAPI,
  getUserByToken,
  updateLocalStorageToken,
  removeLocalStorageTokenAfterLogout,
} from "./helper.js";
import { useFlashMessage } from "./FlashMessageContext.jsx";
import { useUserContext } from "./useUserContext.jsx";
/* This is a React context called `UserContext` using `React.createContext()`. 
It also defines a component called `UserProvider` that takes in `children` as a prop. 
Within the `UserProvider` component, it uses the `useState` hook to create a state variable `currentUser`
initialized to `null` and a function `setCurrentUser` to update the `currentUser` state. 
Intended use: 
- providing user authentication context (user vs anon user) to React components

*/
const defaultUserContext = {
  username: "testuser",
  password: "password",
  token: JoblyApi.token,
};

const UserContext = createContext({
  currentUser: null,
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    token: null,
    username: null,
  });
  const { showFlashMessage } = useFlashMessage();

  const loginUser = useCallback(
    (token, username) => {
      //update provider state
      setCurrentUser(() => {
        token, username;
      });
      //update local storage
      updateLocalStorageToken(token);
      //update api instance
      showFlashMessage(`Welcome back, ${username}!`, "success");
    },
    [showFlashMessage]
  );

  const logoutUser = useCallback(() => {
    //set token, username in Provider state & LS to null;
    setCurrentUser({ token: null, username: null });
    removeLocalStorageTokenAfterLogout();
    //show FlashMessage with success
    showFlashMessage("Successfully logged out", "success");
  }, [showFlashMessage]);

  const contextValue = useMemo(
    () => ({ currentUser, loginUser, logoutUser }),
    [currentUser, loginUser, logoutUser]
  );
  return (
    <UserContext.Provider value={{ contextValue }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
