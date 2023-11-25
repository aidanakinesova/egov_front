import { baseFetchAsync } from "./base-fetch";

export const getAsync = async (url, token) =>
  baseFetchAsync(url, "GET", undefined, token);