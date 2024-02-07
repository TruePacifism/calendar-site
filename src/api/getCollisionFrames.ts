import { dateType } from "../utils/types";
import { apiClient } from "./apiVars";

type propsType = {
  birthdate: dateType;
  trueBirthdate: dateType;
};

export default async function getCollisionFrames({
  birthdate,
  trueBirthdate,
}: propsType) {
  console.log(birthdate);

  const response = await apiClient.get(`/collisionframes`, {
    params: { birthdate, trueBirthdate },
  });

  return response.data;
}
