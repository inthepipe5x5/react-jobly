/*
Helper functions for Jobly react frontend
*/
// import { useContext, useEffect } from "react";
import JoblyApi from "./api";

const capitalizeWord = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  const final = firstLetterCap + remainingLetters;
  return final;
};

const formatSalary = (salary) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
};

// const validateNewJobFormData = async (data) => {
//   try {
//     const { company_handle } = data;
//     // Validate company existence
//     const validCompany = await JoblyApi.getCompany(company_handle);
//     if (!validCompany) {
//       throw new Error("Try again: Non-existent Company");
//     }

//     // Validate data against schema
//     const validator = jsonschema.validate(data, jobNewSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map((e) => e.stack);
//       throw new Error(errs.join(", "));
//     }
//   } catch (error) {
//     console.error("Form submission validation error:", error.message || error);
//     return false;
//   }

//   return true;
// };
const tokenKey = "JoblyUserToken";

const updateLocalStorageToken = ({ token, username }) => {
  if (!token || !username) {
    console.error("Invalid token or username");
    return false;
  }
  const user = { token, username };
  localStorage.setItem(tokenKey, JSON.stringify(user));
  console.log(`{${username} successfully saved to local storage.}`);
  return true;
};

const retrieveStoredPrevUser = () => {
  //init user as empty object
  const user = { token: null, username: null };
  let prevUser = localStorage.getItem(tokenKey);
  if (prevUser) {
    prevUser = JSON.parse(prevUser);
    const { token, username } = prevUser;
    user.token = token;
    user.username = username;
  }

  console.log(
    `${
      user.token
        ? "found previous user token in storage: " + user.username
        : "no token found in storage, initiated with anon user context"
    }`
  );
  //return user if found, else return template currentUser object with null property values
  return user;
};

const getUserByToken = async ({ token, username }) => {
  try {
    const api = new JoblyApi(token);
    const user = await api.requests(`/users/${username}`);

    if (user instanceof Error || user.error) {
      // The user is an instance of Error
      console.log("An error occurred:", user.message);
      throw new Error(user, 404);
    } else {
      // The user is not an Error
      console.log("Operation successful:", user);
      return user;
    }
  } catch (error) {
    console.error(error);
  }
};

const handleAuth = async (userData, authType = "login") => {
  // if (!userData) localStorage.getItem(tokenKey);
  // else {
  try {
    let BASE_URL = "auth/";
    let subpath = { signup: "register", login: "token" }[authType];

    const result = await JoblyApi.request(BASE_URL + subpath, userData, "post");
    console.debug("handleAuth call", authType, userData, "=>", result);

    if (
      result.statusText === "OK" ||
      result.data.token ||
      `${result.status}`[0] === 2
    ) {
      console.debug(`handleAuth OUTPUT: ${result.token}`);
      return { token: result.data.token, username: userData.username };
    } else {
      throw new Error(result.error, 400);
    }
  } catch (error) {
    console.error("handleAuth", error);
    return error;
    // }
  }
};

const getUserByUsername = async (username) => {
  try {
    const res = await JoblyApi.getUser(username);
    return res.data;
  } catch (error) {
    console.error(`getUserByUsername function error: ${error}`);
  }
};

const createNewJoblyAPI = (token) => {
  return new JoblyApi(token);
};

const removeLocalStorageTokenAfterLogout = (key = tokenKey) => {
  //setCurrentUserFunc is from: //const { currentUser, setCurrentUser } = useContext(UserContext);

  //remove user token from local storage
  localStorage.removeItem(key);
};
const getTitle = (authPageType) => {
  switch (authPageType) {
    case "signup":
      return "Sign Up";
    case "login":
      return "Log In";
    case "edit":
      return "Edit Profile";
    default:
      return "Authentication";
  }
};

/*
Helper function to handle caught errors in API calls and turn into FlashMessages
console.error(error origin, error)
returns FlashMessage Object: 
  {
    title: 《str》
    message: 《str》
    type: 《str》
  }
*/
const handleCaughtError = (error, origin = "") => {
  let errMessage =
    error.message ||
    `Detail.jsx -> Error retrieving ${origin ? +origin : "api call"} `;
  let errTitle = error.status || error.error;
  let errType = [400, 401, 500].includes(error.status) ? "danger" : "warning";

  return {
    title: errTitle,
    message: errMessage,
    type: errType,
  };
};

const checkToken = async () => {
  const localToken = localStorage.getItem("JoblyUserToken");
  if (localToken) {
    try {
      let user = await getUserByToken(JSON.parse(localToken));
      user = !(user instanceof Error || user.error) ? user : null;
      return user;
    } catch (error) {
      console.error("Error fetching user by token:", error);
    }
  }
};

function getArticle(followingWord) {
  // Convert the word to lowercase for case-insensitive comparison
  const word = followingWord.toLowerCase().trim();

  // List of vowels
  const vowels = ["a", "e", "i", "o", "u"];

  // Check if the word starts with a vowel
  if (vowels.includes(word[0])) {
    return "an";
  }

  // Special case for words starting with 'h' where the 'h' is silent
  const silentHWords = ["hour", "honest", "honour", "heir"];
  if (silentHWords.includes(word)) {
    return "an";
  }

  // For all other cases, return "a"
  return "a";
}
const checkAuthStatus = (userObj) => {
  //takes userObject (ie. currentUser object) and returns true if .token or .username values are true
  //else returns true

  if (!userObj) return false;
  if (userObj.values().some((val) => !val)) return false;

  return true;
};
export {
  capitalizeWord,
  formatSalary,
  /*validateNewJobFormData,*/
  getTitle,
  handleAuth,
  retrieveStoredPrevUser,
  updateLocalStorageToken,
  removeLocalStorageTokenAfterLogout,
  createNewJoblyAPI,
  getUserByToken,
  getUserByUsername,
  checkAuthStatus,
  handleCaughtError,
  checkToken,
  getArticle,
};
