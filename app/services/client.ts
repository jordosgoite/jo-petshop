import axios from 'axios';

const apiClientPets = axios.create({
  baseURL: 'https://ikp-mobile-challenge-backend.up.railway.app',
  responseType: 'json',
  withCredentials: true,
});

export { apiClientPets };
