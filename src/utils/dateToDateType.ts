import { dateType } from "./types";

export const dateToDateType = (date: Date): dateType => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const newDate: dateType = {
    year,
    month,
    day,
    hour,
    minute,
  };
  return newDate;
};
export const dateTypeToDate = (date: dateType): Date => {
  const { year, month, day, hour, minute } = date;
  const newDate = new Date(year, month, day, hour, minute);
  return newDate;
};
