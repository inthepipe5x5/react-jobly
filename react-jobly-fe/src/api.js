import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

// for now, put token ("testuser" / "password" on class)
const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
class JoblyApi {
  // the token for interactive with the API will be stored here.
  constructor(token) {
    this.token = token
      ? token
      : localStorage.getItem("JoblyUserToken") || testToken;
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : null;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a job by title. */

  static async getJob(title) {
    let res = await this.request(`jobs/${title}`);
    return res.job;
  }

  /** register a new user */

  static async registerNewUser(userData) {
    const { username, firstName, lastName, password, email } = userData;
    let res = await this.request(
      `auth/register`,
      { username, firstName, lastName, password, email },
      "post"
    );
    return res;
  }
  /** Login a user */

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
  /** Edit a user */

  static async editUser(userData) {
    if (!userData || !userData.username || !userData.password)
      throw new Error(`Bad Client Patch Request`, 400);
    const { username } = userData;
    try {
      let res = await this.request(`users/${username}`, { userData }, "patch");
      return res.user;
    } catch (error) {
      console.error("Error in user patch attempt", error);
      return new Error(error, 400);
    }
  }

  static async getUser(username) {
    try {
      if (!username)
        throw new Error(`Bad get user request: username= ${username}`);
      const res = await this.request(`users/${username}`)
      console.debug(`getUser api result = ${[res?.data.data , res?.user , res]}`)
      return res?.data || res?.user || res 
    } catch (error) {
      console.error(`API call: getUser ERR ${error}`);
      const res = { status: error.status, message: error.message };
      return res
    }
  }
}

export default JoblyApi;
