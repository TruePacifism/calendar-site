export type monthNameType =
  | "Январь"
  | "Февраль"
  | "Март"
  | "Апрель"
  | "Май"
  | "Июнь"
  | "Июль"
  | "Август"
  | "Сентябрь"
  | "Октябрь"
  | "Ноябрь"
  | "Декабрь";
export type monthType = {
  length: number;
  orderNumber: number;
  name: string;
};
export type monthListType = [
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType,
  monthType
];

export type genderType = "Мужской" | "Женский";
