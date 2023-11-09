import { userInput } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  user: userInput;
};

export default async function signUp({ user }: propsType) {
  await apiClient.post("/login", { ...user });
  return user.token;
}
