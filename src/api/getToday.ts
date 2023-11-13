import { cardInfoType } from "../utils/types";
import { apiClient } from "./apiVars";

export default async function getToday(): Promise<cardInfoType> {
  const response = await apiClient.get(`/today`);
  return response.data;
}
