import { postAsync } from "../functions";

const ROOT = "http://127.0.0.1:8000";

export const login = async (iinbin, password) =>
  postAsync(`${ROOT}/login`, JSON.stringify({ iinbin, password }));

export const registration = async (iinbin, fullName, password, birthplace, nation) =>
  postAsync(`${ROOT}/register`, JSON.stringify({ iinbin, password, fullName, birthplace, nation }));