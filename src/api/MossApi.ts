// Axios
import axios from 'axios';

const MossApi = axios.create({
  baseURL: 'https://moss-back-production.up.railway.app//api',
});

export default MossApi;
