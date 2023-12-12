// Axios
import axios from 'axios';

const MossApi = axios.create({
  // TS
  // baseURL: 'https://ts-uao-project-production.up.railway.app/api',
  baseURL: 'https://moss-back-dev.up.railway.app/api',
});

// MossApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['x-token'] = token;
//   }
//   return config;
// });

export default MossApi;
