import { baseFetchAsync } from "./base-fetch";

export const deleteAsync = async (url, token) =>
  baseFetchAsync(url, "DELETE", undefined, token);