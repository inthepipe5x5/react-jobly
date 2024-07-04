/*
Helper functions for Jobly react frontend
*/

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

const showFlashMessage = (
  message,
  type,
  setFlashMessageFunc,
  messageInterval = 5000
) => {
  setFlashMessageFunc({ message, type });
  setTimeout(() => setFlashMessageFunc(null), messageInterval); // Auto-hide after 5 seconds
};

const dismissFlashMessage = (setFlashMessageFunc) => {
  setFlashMessageFunc(null);
};

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

const handleLogin = async (userData, setCurrentUserFunc) => {
  //userData = {username || password}
  //setCurrentUserFunc = useContext(UserContext).setCurrentUser
  if (!userData) localStorage.getItem(tokenKey);
  else {
    try {
      const result = await JoblyApi.loginUser(userData);
      //handle if API rejects login credentials
      if (!result.error) throw new Error(result.error, 400);
      else {
        const { username } = userData;
        const { token } = result;
        //save token to localStorage
        updateLocalStorageToken(token, username);
        const loggedInUser = await getUserByToken(token);
        setCurrentUserFunc({ token, loggedInUser });
      }
    } catch (error) {
      console.error(error);
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

export {
  capitalizeWord,
  formatSalary,
  /*validateNewJobFormData,*/
  showFlashMessage,
  dismissFlashMessage,
  handleLogin,
  handleLogout,
  getUserByToken,
};
