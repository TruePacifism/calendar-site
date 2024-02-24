import { animalType, colorType, CustomEnum, elementType } from "./types";

export const Colors: CustomEnum<colorType> = {
  BROWN: {
    backgroundClassName: "brown",
    mainHex: "#7c5037",
    backgroundHex: "#ba917a",
    name: "brown",
  },
  RED: {
    backgroundClassName: "red",
    mainHex: "#d12a21",
    backgroundHex: "#ee7872",
    name: "red",
  },
  LIGHT_GREEN: {
    backgroundClassName: "lightGreen",
    mainHex: "#a6bf3f",
    backgroundHex: "#c5da6f",
    name: "light green",
  },
  DARK_GREEN: {
    backgroundClassName: "darkGreen",
    mainHex: "#278926",
    backgroundHex: "#75c574",
    name: "dark green",
  },
  PURPLE: {
    backgroundClassName: "purple",
    mainHex: "#88385b",
    backgroundHex: "#cc8ca8",
    name: "purple",
  },
  ORANGE: {
    backgroundClassName: "orange",
    mainHex: "#ff7510",
    backgroundHex: "#ffad72",
    name: "orange",
  },
  LIGHT_BLUE: {
    backgroundClassName: "lightBlue",
    mainHex: "#94b7d5",
    backgroundHex: "#d0d6ec",
    name: "light blue",
  },
  DARK_BLUE: {
    backgroundClassName: "darkBlue",
    mainHex: "#314b70",
    backgroundHex: "#8ea2be",
    name: "dark blue",
  },
  YELLOW: {
    backgroundClassName: "yellow",
    mainHex: "#e9d621",
    backgroundHex: "#f5eb89",
    name: "yellow",
  },
  PINK: {
    backgroundClassName: "pink",
    mainHex: "#f475a2",
    backgroundHex: "#ffbad2",
    name: "pink",
  },
};
export const Elements: CustomEnum<Omit<elementType, "isGood" | "isBlack">> = {
  METAL_YAN: {
    name: "металл ян",
  },
  METAL_IN: {
    name: "металл инь",
  },
  WATER_YAN: {
    name: "вода ян",
  },
  WATER_IN: {
    name: "вода инь",
  },
  WOOD_YAN: {
    name: "дерево ян",
  },
  WOOD_IN: {
    name: "дерево инь",
  },
  FIRE_YAN: {
    name: "огонь ян",
  },

  FIRE_IN: {
    name: "огонь инь",
  },
  EARTH_YAN: {
    name: "земля ян",
  },
  EARTH_IN: {
    name: "земля инь",
  },
  NULL_ELEMENT: {
    name: " ",
  },
};
export const Animals: CustomEnum<Omit<animalType, "isGood" | "isBlack">> = {
  BULL: {
    name: "бык",
  },
  TIGER: {
    name: "тигр",
  },
  RABBIT: {
    name: "кролик",
  },
  DRAGON: {
    name: "дракон",
  },
  SNAKE: {
    name: "змея",
  },
  HORSE: {
    name: "лошадь",
  },
  GOAT: {
    name: "коза",
  },
  MONKEY: {
    name: "обезьяна",
  },
  ROOSTER: {
    name: "петух",
  },
  DOG: {
    name: "собака",
  },
  PIG: {
    name: "свинья",
  },
  RAT: {
    name: "крыса",
  },
  NULL_ANIMAL: {
    name: " ",
  },
};
