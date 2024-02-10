import axios from 'axios';
export const BASE_URL = `http://localhost:3333/api/`;

const config = {
  baseURL: BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
};
//instance of axios
export const instance = axios.create(config);


