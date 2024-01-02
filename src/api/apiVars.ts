import axios from "axios";

// const PORT = 3333;
// export const uri = `http://localhost:${PORT}`;
export const uri = "https://2355021-yo82697.twc1.net";
export const apiClient = axios.create({ baseURL: uri });
