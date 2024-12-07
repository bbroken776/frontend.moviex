import axios from 'axios';

const apiServer = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiServer;
