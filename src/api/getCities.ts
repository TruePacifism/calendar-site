import { cityInfoType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  query: string;
};

export default async function getCities({
  query,
}: propsType): Promise<cityInfoType[]> {
  console.log(query);

  const response = await apiClient.get(`/city/${query}`);
  console.log(response.data);
  console.log(typeof response.data);
  return response.data;
}
