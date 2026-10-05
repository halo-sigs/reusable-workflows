import * as githubCore from "@actions/core";
import axios from "axios";

const baseURL = githubCore.getInput("halo-backend-baseurl");
const pat = githubCore.getInput("halo-pat");
if (pat) githubCore.setSecret(pat);

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${pat}`,
  },
});

export default apiClient;
