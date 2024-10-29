import axios from "axios";

export const API = axios.create({
  baseURL: "http://www.omdbapi.com/",
  headers: { "Content-Type": "application/json" },
});
