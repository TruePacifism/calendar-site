import { cityInfoType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  query: string;
};

export default async function getCities({
  query,
}: propsType): Promise<cityInfoType[]> {
  const response = await apiClient.get(`/city/${query}`);
  return response.data;
}
