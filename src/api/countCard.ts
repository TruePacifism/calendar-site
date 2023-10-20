import { cardInfoType, inputDataType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  inputData: inputDataType;
};

export default async function countCard({
  inputData,
}: propsType): Promise<cardInfoType> {
  console.log(inputData);

  const response = await apiClient.get(`/count`, { params: inputData });
  console.log(response.data);
  console.log(typeof response.data);
  return response.data;
}
