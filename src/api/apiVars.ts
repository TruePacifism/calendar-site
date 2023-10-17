import axios from "axios";

const PORT = 3333;
export const uri = `http://localhost:${PORT}`;
export const apiClient = axios.create({ baseURL: uri });
