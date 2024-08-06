import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || import.meta.env.REACT_APP_BASE_URL //||  "https://react-jobly-60nf.onrender.com";
// const BASE_URL = "http://localhost:3001";

class JoblyApi {
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    console.log(import.meta.env)
    const url = `${BASE_URL || import.meta.env.VITE_REACT_APP_BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token
      ? { Authorization: `Bearer ${JoblyApi.token}` }
      : null;
    const params = method === "get" ? data : {};

    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJob(title) {
    let res = await this.request(`jobs/${title}`);
    return res.job;
  }

  static async registerNewUser(userData) {
    const { username, firstName, lastName, password, email } = userData;
    let res = await this.request(
      `auth/register`,
      { username, firstName, lastName, password, email },
      "post"
    );
    return res;
  }

  static async loginUser(userData) {
    if (!userData || !userData.username || !userData.password)
      throw new Error(`Bad Client Login Request`, 400);
    try {
      const { username, password } = userData;

      let res = await this.request(
        `auth/token`,
        { username, password },
        "post"
      );
      return res.token;
    } catch (error) {
      console.error("Error in login attempt", error);
      return new Error();
    }
  }

  static async editUser(username, userData) {
    if (!userData || username === undefined || !username)
      throw new Error(`Bad Client Patch Request`, 400);
    try {
      let res = await this.request(`users/${username}`, userData, "patch");
      return res?.user || res;
    } catch (error) {
      console.error("Error in user patch attempt", error);
      return new Error(error, 400);
    }
  }

  static async getUser(username) {
    try {
      if (!username)
        throw new Error(`Bad get user request: username= ${username}`);
      const res = await this.request(`users/${username}`);
      console.debug(`getUser api result = ${res.data.user}`);
      return res.data.user;
    } catch (error) {
      console.error(`API call: getUser ERR ${error}`);
      const res = { status: error.status, message: error.message };
      return res;
    }
  }

  static async newJobApp(username, jobId) {
    try {
      const newJobApp = this.request(
        `users/${username}/jobs/${jobId}`,
        { username, id: jobId },
        "post"
      );
      return newJobApp.applied
    } catch (error) {
      console.error('Job app error', error)
    }
  }
}
// for now, put token ("testuser" / "password" on class)
JoblyApi.token = localStorage.getItem("JoblyUserToken");
// ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"; /* REMOVE test token in prod*/

export default JoblyApi;
