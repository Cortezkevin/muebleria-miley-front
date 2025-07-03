import axios from "axios";
import Cookies from 'js-cookie';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    "Authorization": "Bearer " + Cookies.get("token") || ''
  }
});

export { AxiosInstance };



/* urlPRODUCTION = https://creaciones-joaquin-back.onrender.com/api/ 
    urlTEST = http://localhost:4000/api/
*/