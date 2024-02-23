import axios from 'axios';
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' :
    'https://www.wanderlistapi.rinmeyers.com/'
//'https://travelapp-u9pi.onrender.com'


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});