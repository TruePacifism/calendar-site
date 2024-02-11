import getMonthName from "./getMonthName";
import { dateType } from "./types";

export const normalizeBirthdate = (birthdate: dateType): string => {
  const { year, month, day, hour, minute } = birthdate;
  return `${
    hour === -1 || minute === -1
      ? ""
      : `${hour < 10 ? "0" + hour : hour}:${
          minute < 10 ? "0" + minute : minute
        }`
  } ${day === -1 ? "" : day < 10 ? "0" + day : day} ${getMonthName(month)
    .substring(0, 3)
    .toLowerCase()} ${year}`;
};
