// Axios
import axios from 'axios';

const MossApi = axios.create({
  // baseURL: 'https://uao-project-backend-production.up.railway.app/api',
  // baseURL: 'https://uao-project-backend-dev.up.railway.app/api',
  // baseURL: 'https://uao-project-backend-newft.up.railway.app/api',

  // TS
  // baseURL: 'https://ts-uao-project-production.up.railway.app/api',
  baseURL: 'http://localhost:3001/api',
});

// MossApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['x-token'] = token;
//   }
//   return config;
// });

export default MossApi;
