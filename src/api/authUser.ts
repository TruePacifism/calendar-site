import { userInput } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  user: userInput;
};

export default async function authUser({ user }: propsType) {
  const response = await apiClient.post(`/login`, {
    ...user,
  });
  return response.data.token;
}
