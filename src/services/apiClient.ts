import axios from 'axios';
import { parseCookies } from 'nookies';

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  config => {
    const { 'moviex.session': session } = parseCookies();
    if (session) config.headers.Authorization = `Bearer ${session}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
