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

const updateLocalStorageToken = (token, username) => {
  const localToken = localStorage.setItem(
    tokenKey,
    JSON.stringify({ token, username })
  );
  console.log(`{${localToken} successfully saved to local storage.}`);
  return true;
};

const getUserByToken = async ({ token, username }) => {
  try {
    const api = new JoblyApi(token);
    const user = await api.requests(`/${username}`);

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

const handleAuth = async (userData, authType = "login", setCurrentUserFunc) => {
  //userData = {username || password}
  //setCurrentUserFunc = useContext(UserContext).setCurrentUser
  if (!userData) localStorage.getItem(tokenKey);
  else {
    try {
      const { username } = userData;
      let result =
        {
          signup: await JoblyApi.registerNewUser(userData),
          login: await JoblyApi.loginUser(userData),
          edit: await JoblyApi.editUser(userData.username, userData),
        }[authType] ||
        new Error("An authentication error occurred. Bad request", 400);

      //handle if API rejects auth attempt or if result=== error
      if (
        result.data.error ||
        result.error ||
        ![200, 201].includes(result.status)
      )
        throw new Error(result.error, 400);
      else {
        const { token } = result || result.token;
        //save token to localStorage
        updateLocalStorageToken(token, username);
        setCurrentUserFunc({ token, username });
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};

const handleLogout = (setCurrentUserFunc) => {
  //setCurrentUserFunc is from: //const { currentUser, setCurrentUser } = useContext(UserContext);

  //remove user token from local storage
  localStorage.removeItem(tokenKey);
  //remove user token from context
  setCurrentUserFunc(null);
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
const handleCaughtError = (error, origin="") => {
  let errMessage =
    error.message ||
    `Detail.jsx -> Error retrieving ${origin? + origin : "api call"} `;
  let errTitle = error.status || error.error;
  let errType = [400, 401, 500].includes(error.status) ? "danger" : "warning";

  return {
    title: errTitle,
    message: errMessage,
    type: errType
  };
};

export {
  capitalizeWord,
  formatSalary,
  /*validateNewJobFormData,*/
  getTitle,
  handleAuth,
  handleLogout,
  getUserByToken,
  handleCaughtError,
};
