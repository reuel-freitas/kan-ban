import axios from 'axios';

let baseURL = 'http://10.0.0.115:3000'

const api = axios.create({ baseURL });

export default api;