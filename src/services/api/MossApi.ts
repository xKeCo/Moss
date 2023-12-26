import axios from 'axios';

const MossApi = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: process.env.BASE_URL ?? 'http://localhost:3001/api',
});

export default MossApi;
