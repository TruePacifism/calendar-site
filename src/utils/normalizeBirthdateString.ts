import getMonthName from "./getMonthName";
import { dateType } from "./types";

export const normalizeBirthdate = (birthdate: dateType): string => {
  const { year, month, day, hour, minute } = birthdate;
  return `${hour === -1 || minute === -1 ? "" : `${hour}:${minute}`} ${
    day === -1 ? "" : day
  } ${getMonthName(month).substring(0, 3).toLowerCase()} ${year}`;
};
