import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = `${process.env.BE_API_URL}/api`;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    Accept: "*/*",
    "X-Request-Source": "website",
    "Content-Type": "application/json",
  },
};
//instance of axios
export const serverInstance = axios.create(config);
