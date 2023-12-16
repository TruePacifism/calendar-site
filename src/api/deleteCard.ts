import { apiClient } from "./apiVars";

type propsType = {
  id: string;
  token: string;
};

export default async function deleteCard({ id, token }: propsType) {
  const response = await apiClient.delete(`/card/${token}/${id}`);
  return response;
}
