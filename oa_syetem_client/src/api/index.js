import ajax from "./ajax";

const BASE = "";

//login
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
