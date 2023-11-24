import { cardInfoType, userType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  user: userType;
};

export default async function getToday({
  user,
}: propsType): Promise<cardInfoType> {
  const response = await apiClient.get(`/today`, {
    params: {
      user,
    },
  });
  return response.data;
}
