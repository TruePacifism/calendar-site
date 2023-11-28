import { cardInfoType, userType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  user: userType;
  dayOffset: number;
};

export default async function getToday({
  user,
  dayOffset,
}: propsType): Promise<cardInfoType> {
  const response = await apiClient.get(`/today`, {
    params: {
      user: {
        ...user,
        cards: [],
      },
      dayOffset,
    },
  });
  return response.data;
}
