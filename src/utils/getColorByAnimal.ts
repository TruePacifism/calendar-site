import { Colors } from "./enums";
import { animalType, colorType, elementType } from "./types";

const getColorByAnimalElement = (
  animalElement: animalType | elementType | string
): colorType => {
  const name =
    typeof animalElement === "string" ? animalElement : animalElement.name;
  switch (name) {
    case "вода инь":
      return Colors.LIGHT_BLUE;
    case "вода ян":
      return Colors.DARK_BLUE;
    case "земля инь":
      return Colors.YELLOW;
    case "земля ян":
      return Colors.BROWN;
    case "металл инь":
      return Colors.PINK;
    case "металл ян":
      return Colors.PURPLE;
    case "дерево инь":
      return Colors.LIGHT_GREEN;
    case "дерево ян":
      return Colors.DARK_GREEN;
    case "огонь инь":
      return Colors.ORANGE;
    case "огонь ян":
      return Colors.RED;
    case "бык":
      return Colors.LIGHT_BLUE;
    case "тигр":
      return Colors.DARK_BLUE;
    case "кролик":
      return Colors.LIGHT_GREEN;
    case "дракон":
      return Colors.BROWN;
    case "свинья":
      return Colors.LIGHT_BLUE;
    case "обезьяна":
      return Colors.BROWN;
    case "коза":
      return Colors.ORANGE;
    case "крыса":
      return Colors.DARK_BLUE;
    case "собака":
      return Colors.PURPLE;
    case "петух":
      return Colors.PINK;
    case "лошадь":
      return Colors.RED;
    case "змея":
      return Colors.LIGHT_GREEN;
    default:
      return Colors.BROWN;
  }
};

export default getColorByAnimalElement;
