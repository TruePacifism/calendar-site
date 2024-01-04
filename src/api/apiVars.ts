import axios from "axios";

// const PORT = 3333;
// export const uri = `http://localhost:${PORT}`;
export const uri = "http://89.23.116.112:25:3333";
export const apiClient = axios.create({ baseURL: uri });
