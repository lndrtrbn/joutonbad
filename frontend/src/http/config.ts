export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.32:3000"
    : "/api";
