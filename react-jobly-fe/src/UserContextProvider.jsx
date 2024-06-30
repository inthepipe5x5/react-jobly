/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";

/* This is a React context called `UserContext` using `React.createContext()`. 
It also defines a component called `UserProvider` that takes in `children` as a prop. 
Within the `UserProvider` component, it uses the `useState` hook to create a state variable `currentUser`
initialized to `null` and a function `setCurrentUser` to update the `currentUser` state. 
Intended use: 
- providing user authentication context (user vs anon user) to React components

*/
const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
