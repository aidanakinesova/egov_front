import { baseFetchAsync } from "./base-fetch";

export const postAsync = async (url, body, token) =>
  baseFetchAsync(url, "POST", body, token);