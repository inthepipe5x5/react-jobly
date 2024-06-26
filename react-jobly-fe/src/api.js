import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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
    let res = await this.request(`/auth/register`, { userData }, "post");
    return res.company;
  }
  /** Login a user */

  static async LoginUser(userData) {
    if (!userData || !userData.username || !userData.password)
      throw new Error(`Bad Client Login Request`, 400);
    try {
      let res = await this.request(`/auth/token`, { userData }, "post");
      return res.company;
    } catch (error) {
      console.error("Error in login attempt", error);
    }
  }
  /** Edit a user */

  static async editUser(userData) {
    if (!userData || !userData.username || !userData.password)
      throw new Error(`Bad Client Patch Request`, 400);
    const { id } = userData;
    try {
      let res = await this.request(`/users/${id}`, { userData }, "patch");
      return res.company;
    } catch (error) {
      console.error("Error in user patch attempt", error);
    }
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
