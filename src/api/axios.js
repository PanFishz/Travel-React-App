import axios from 'axios';
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' :
    'https://www.api.rinmeyers.com/'
//'https://travelapp-u9pi.onrender.com'
//const BASE_URL = 'http://localhost:3001';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});