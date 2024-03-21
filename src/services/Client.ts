import axios from 'axios';
export const BASE_URL = `${process.env.BE_API_URL}/api`;

const config = {
  baseURL: BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
};
//instance of axios
export const instance = axios.create(config);


