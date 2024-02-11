import { apiClient } from "./apiVars";

type propsType = {
  token: string;
};

export default async function deleteUser({ token }: propsType) {
  const result = await apiClient.delete(`/login/${token}`);

  return result;
}
