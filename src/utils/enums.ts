import { colorType, CustomEnum } from "./types";

export const Colors: CustomEnum<colorType> = {
  BROWN: {
    backgroundClassName: "brown",
    hex: "#C3A770",
    name: "brown",
  },
  RED: {
    backgroundClassName: "red",
    hex: "#D12A21",
    name: "red",
  },
  LIGHT_GREEN: {
    backgroundClassName: "lightGreen",
    hex: "#278926",
    name: "light green",
  },
  DARK_GREEN: {
    backgroundClassName: "darkGreen",
    hex: "#278926",
    name: "dark green",
  },
  PURPLE: {
    backgroundClassName: "purple",
    hex: "#88385B",
    name: "purple",
  },
  ORANGE: {
    backgroundClassName: "orange",
    hex: "#FF7510",
    name: "orange",
  },
  LIGHT_BLUE: {
    backgroundClassName: "lightBlue",
    hex: "#94B7D5",
    name: "light blue",
  },
  DARK_BLUE: {
    backgroundClassName: "darkBlue",
    hex: "#314b70",
    name: "dark blue",
  },
  YELLOW: {
    backgroundClassName: "yellow",
    hex: "#EAD522",
    name: "yellow",
  },
  PINK: {
    backgroundClassName: "pink",
    hex: "#D094AF",
    name: "pink",
  },
};
