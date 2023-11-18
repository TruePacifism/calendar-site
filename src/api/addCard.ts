import { cardInfoType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  card: cardInfoType;
  token: string;
};

export default async function addCard({ card, token }: propsType) {
  const response = await apiClient.post(`/card/${token}`, card);
  return response;
}
