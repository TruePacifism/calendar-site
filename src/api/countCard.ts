import { cardInfoType, inputDataType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  inputData: inputDataType;
};

export default async function countCard({
  inputData,
}: propsType): Promise<cardInfoType> {
  const response = await apiClient.get(`/count`, { params: inputData });
  return response.data;
}
