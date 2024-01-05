import axios from "axios";

// const PORT = 3333;
// export const uri = `http://localhost:${PORT}`;
export const uri = "http://45.8.99.86:443";
export const apiClient = axios.create({ baseURL: uri });
