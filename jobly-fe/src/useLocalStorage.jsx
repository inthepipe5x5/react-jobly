import React, { useState } from "react";
import {
  updateLocalStorageToken,
  retrieveStoredPrevUser,
  removeLocalStorageTokenAfterLogout,
} from "./helper";

const useLocalStorage = (key = "JoblyUserToken") => {
  // Create state variable to store
  // localStorage value in state
  const [localVal, setLocalVal] = useState(retrieveStoredPrevUser());

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (
    newValOrFunc = updateLocalStorageToken
  ) => {
    let newValue;
    //dynamically set the newValue to be stored in localStorage
    if (!newValOrFunc || newValOrFunc === undefined) {
      removeLocalStorageTokenAfterLogout();
    } else if (typeof newValOrFunc === "function") {
      newValue = newValOrFunc(localVal);
      updateLocalStorageToken(newValue);
    } else {
      newValue = newValOrFunc;
      updateLocalStorageToken(newValue);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalVal(newValue);
  };
  return [localVal, setLocalStorageStateValue];
};

export default useLocalStorage;
