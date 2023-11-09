import { apiClient } from "./apiVars";

type propsType = {
  token: string;
};

export default async function signIn({ token }: propsType) {
  const user = await apiClient.get(`/login/${token}`);
  return user ? token : "error";
}
