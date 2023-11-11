import { userInput } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  token: string;
};

export default async function getUserInfo({ token }: propsType) {
  const response = await apiClient.get(`/login/${token}`);
  return response.data;
}
