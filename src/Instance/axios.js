import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://unified-cart-server.vercel.app',
  withCredentials: true // Ensure credentials are sent
});

export default instance;
