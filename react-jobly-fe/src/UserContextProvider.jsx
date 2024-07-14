import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useEffect,
} from "react";
import JoblyApi from "./api.js";
import useLocalStorage from "./useLocalStorage.jsx";
import { retrieveStoredPrevUser } from "./helper.js";

const UserContext = createContext({
  currentUser: retrieveStoredPrevUser(),
  loginUser: () => {},
  logoutUser: () => {},
  fetchUserDetails: () => {},
});

const UserContextProvider = ({ children }) => {
  const [localUserToken, setLocalUserToken] = useLocalStorage();
  const [currentUser, setCurrentUser] = useState(localUserToken);
  const [userDetails, setUserDetails] = useState(null);
  const [jobApps, setJobApps] = useState([]);

  const loginUser = useCallback(
    (token, username) => {
      if (!token || !username) return;
      const user = { token, username };
      setLocalUserToken(user);
      JoblyApi.token = token;
      setCurrentUser(user);
    },
    [setLocalUserToken]
  );

  const logoutUser = useCallback(() => {
    setLocalUserToken(undefined); // Clear localStorage
    JoblyApi.token = null;
    //reset stored currentUser & userDetails
    setCurrentUser({ token: null, username: null });
    setUserDetails(null);
    //result job apps
    setJobApps([]);
  }, [setLocalUserToken]);

  const fetchUserDetails = useCallback(async () => {
    if (!currentUser || !currentUser.username) return null;
    const { username } = currentUser;
    try {
      const response = await JoblyApi.getUser(username);
      const jobs = await (await JoblyApi.request(`jobs`)).data.jobs;
      const currentApps =
        response.applications.length > 0
          ? jobs.filter((job) => response.applications.includes(job.id))
          : [];

      setUserDetails(response);
      setJobApps(currentApps);
      return response;
    } catch (err) {
      console.error("Failed to fetch user details", err);
      return null;
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchUserDetails();
    }
  }, [currentUser, fetchUserDetails]);

  const contextValue = useMemo(
    () => ({
      currentUser,
      userDetails,
      jobApps,
      loginUser,
      logoutUser,
      fetchUserDetails,
    }),
    [currentUser, userDetails, loginUser, logoutUser, fetchUserDetails, jobApps]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
