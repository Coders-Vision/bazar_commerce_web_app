import axios from 'axios';
export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}`;

const config = {
  baseURL: BASE_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
};
//instance of axios
export const instance = axios.create(config);


