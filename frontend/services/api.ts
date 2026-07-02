import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://162.248.164.246:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});