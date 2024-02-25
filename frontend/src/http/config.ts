export const API_URL =
  import.meta.env.NODE_ENV === "development"
    ? "http://192.168.46.103:3000"
    : "/api";