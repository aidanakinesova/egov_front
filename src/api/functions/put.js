import { baseFetchAsync } from "./base-fetch";

export const putAsync = async (url, body, token) =>
  baseFetchAsync(url, "PUT", body, token);