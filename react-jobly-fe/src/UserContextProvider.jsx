/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { userContext, createContext, useState, useEffect } from "react";
import JoblyApi from "./api.js";
import { createNewJoblyAPI, getUserByToken } from "./helper.js";
import { useFlashMessage } from "./FlashMessageContext.jsx";
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
  currentUser: { token, username },
  loginUser: () => {},
  logoutUser: () => {},
  apiInstance: new JoblyApi(),
});

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a FlashMessageProvider"
    );
  }
  return context;
};

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    token: null,
    username: null,
  });
  const { showFlashMessage } = useFlashMessage();
  const checkToken = async () => {
    const localToken = localStorage.getItem("JoblyUserToken");
    if (localToken) {
      try {
        let user = await getUserByToken(JSON.parse(localToken));
        user = !(user instanceof Error || user.error) ? user : null;
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user by token:", error);
      }
    }
  };
  checkToken();
  const loginUser = useCallback(
    (token, username) => {
      //update provider state
      setCurrentUser((currentUser) => {
        token, username;
      });
      //update local storage
      updateLocalStorageToken(token);
      //update api instance
      apiInstance = createNewJoblyAPI(token);
      showFlashMessage(`Welcome back, ${username}!`, "success");
    },
    [apiInstance]
  );

  const logoutUser = useCallback(() => {
    setCurrentUser({ token: null, username: null });
    apiInstance.token = null;
    removeLocalStorageTokenAfterLogout();
    showFlashMessage("Successfully logged out", "success");
  }, [apiInstance]);

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

export { UserContextProvider, UserContext, useUserContext };
