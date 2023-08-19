import { monthType } from "./types";

export enum MonthName {
  Январь = 0,
  Февраль,
  Март,
  Апрель,
  Май,
  Июнь,
  Июль,
  Август,
  Сентябрь,
  Октябрь,
  Ноябрь,
  Декабрь,
}

export const months: monthType[] = [
  { length: 31, orderNumber: 0, name: "Январь" },
  { length: 28, orderNumber: 1, name: "Февраль" },
  { length: 31, orderNumber: 2, name: "Март" },
  { length: 30, orderNumber: 3, name: "Апрель" },
  { length: 31, orderNumber: 4, name: "Май" },
  { length: 30, orderNumber: 5, name: "Июнь" },
  { length: 31, orderNumber: 6, name: "Июль" },
  { length: 31, orderNumber: 7, name: "Август" },
  { length: 30, orderNumber: 8, name: "Сентябрь" },
  { length: 31, orderNumber: 9, name: "Октябрь" },
  { length: 30, orderNumber: 10, name: "Ноябрь" },
  { length: 31, orderNumber: 11, name: "Декабрь" },
];
