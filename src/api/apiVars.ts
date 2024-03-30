import axios from "axios";

const PORT = 3000;
export const uri = `http://192.168.0.101:${PORT}`;
// export const uri = `http://45.8.99.86:${PORT}`;
export const apiClient = axios.create({ baseURL: uri });
