import axios from "axios";

// const PORT = 3333;
// export const uri = `http://localhost:${PORT}`;
export const uri = "https://calendar-2vknvhi8.b4a.run";
export const apiClient = axios.create({ baseURL: uri });
