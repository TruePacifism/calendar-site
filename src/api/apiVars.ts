import axios from "axios";

const PORT = 80;
// export const uri = `http://localhost:${PORT}`;
export const uri = `http://45.8.99.86:${PORT}`;
export const apiClient = axios.create({ baseURL: uri });
