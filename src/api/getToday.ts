import { cardInfoType, inputDataType } from "../utils/types";
import { apiClient } from "./apiVars";

export default async function getToday(): Promise<cardInfoType> {

  const response = await apiClient.get(`/today`);
  console.log(response.data);
  console.log(typeof response.data);
  return response.data;
}
