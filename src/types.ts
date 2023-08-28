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
};

export type collisionType = {
  secondTarget: collisionTargetType;
  thirdTarget?: collisionTargetType;
  shape: string;
  color: string;
  kind: string;
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

export type cardInfoType = {
  id: string;
  name: string;
  gender: "Мужской" | "Женский";
  birthdate: {
    year: number;
    month: number;
    day?: number;
    hour?: number;
    minute?: number;
  };
  birthcity: string;
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
  fallingStars: fallingStarType[];
  momCard?: cardInfoType;
  dadCard?: cardInfoType;
};
