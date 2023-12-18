import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { JsxElement } from "typescript";

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

export type dateType = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export type colorType = {
  mainHex: string;
  backgroundHex: string;
  backgroundClassName: string;
  name: string;
};

export type CustomEnum<T> = {
  [key: string]: T;
};

export type genderType = "Мужской" | "Женский";

export type collisionTimeType = "день" | "месяц" | "год" | "час" | "такт";

export type collisionTargetType = {
  target: string;
  animal: {
    name: string;
    element: {
      name: string;
    };
    monthBounds: {
      start: number;
      end: number;
    };
  };
  targetTime: collisionTimeType;
};

export type collisionType = {
  id: number;
  secondTarget: collisionTargetType;
  thirdTarget?: collisionTargetType;
  animal: {
    name: string;
    element: {
      name: string;
    };
    monthBounds: {
      start: number;
      end: number;
    };
  };
  shape: string;
  color: string;
  kind: string;
  targetName: collisionTimeType;
  description: string;
};

export type animalType = {
  name: string;
  collisions?: collisionType[];
  isGood: boolean;
  isBlack: boolean;
};
export type elementType = {
  name: string;
  isGood: boolean;
  isBlack: boolean;
};

export type pillarType = {
  year: number;
  month: number;
  ageYear: number;
  ageMonth: number;
  animal: animalType;
  element: elementType;
};

export type mainElementType = {
  name: string;
  animals: animalType[];
  elements: elementType[];
};
export type cardStrengthType = {
  power: number;
  powerDescription: string;
  powerfulElements: mainElementType[];
  maxPower: number;
  leader?: mainElementType;
};

export type fallingStarType = {
  yearNumber: number;
  monthNumber: number;
  description: string;
  direction: string;
};

export type ageType = {
  year: number;
  month: number;
};

export type chartDataType = {
  BULL: number;
  TIGER: number;
  RABBIT: number;
  MONKEY: number;
  DRAGON: number;
  RAT: number;
  DOG: number;
  ROOSTER: number;
  PIG: number;
  HORSE: number;
  SNAKE: number;
  GOAT: number;
};
export type directionType = {
  shortName: string;
  fullName: string;
};
export type lineChartDataPartType = {
  date: number;
  value: number;
};
export type lineChartDataType = {
  year: lineChartDataPartType[];
  month: lineChartDataPartType[];
  day: lineChartDataPartType[];
};

export type cardInfoType = {
  id: string;
  name: string;
  gender: "Мужской" | "Женский";
  birthdate: dateType;
  trueBirthdate: dateType;
  birthcity: string;
  livingcity: string;
  age: ageType;
  year: {
    animal: animalType;
    element: elementType;
  };
  month: {
    animal: animalType;
    element: elementType;
  };
  day?: {
    animal: animalType;
    element: elementType;
  };
  hour?: {
    animal: animalType;
    element: elementType;
  };
  currentPillar: pillarType;
  pillars: pillarType[];
  mainElement: mainElementType;
  cardStrength: cardStrengthType;
  movedDirection: directionType;
  fallingStars: fallingStarType[];
  lineChartData: lineChartDataType;
  chartData: chartDataType;
  direction: directionType;
  genderCount: {
    male: number;
    female: number;
  };
  momCard?: string;
  dadCard?: string;
};

export type stylesType = {
  readonly [key: string]: string;
};

export type inputDataType = {
  name: string;
  birthdate: dateType;
  birthcity: string;
  gender: genderType;
  livingcity: string;
};

export type cityInfoType = {
  name: string;
  // coordinates: {
  //   lat: number;
  //   lng: number;
  // };
};

export type userInput = {
  token: string;
  name: string;
  mail: string;
  livingcity: string;
  birthcity: string;
};

export type stateType = {
  user: userType;
  token: string;
  modalContent: ReactJSXElement;
  isLoading: boolean;
  loadingImages: string[];
  isErrorPage: boolean;
};

export type userType = {
  name: string;
  mail: string;
  livingcity: string;
  birthcity: string;
  UTC: number;
  cards: cardInfoType[];
};
