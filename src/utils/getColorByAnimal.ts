import { Colors } from "./enums";
import { animalType, colorType, elementType } from "./types";

const getColorByAnimalElement = (
  animalElement: animalType | elementType
): colorType => {
  const { name } = animalElement;
  switch (name) {
    case "Вода Инь":
      return Colors.LIGHT_BLUE;
    case "Вода Ян":
      return Colors.DARK_BLUE;
    case "Земля Инь":
      return Colors.YELLOW;
    case "Земля Ян":
      return Colors.BROWN;
    case "Металл Инь":
      return Colors.PINK;
    case "Металл Ян":
      return Colors.PURPLE;
    case "Дерево Инь":
      return Colors.LIGHT_GREEN;
    case "Дерево Ян":
      return Colors.DARK_GREEN;
    case "Огонь Инь":
      return Colors.ORANGE;
    case "Огонь Ян":
      return Colors.RED;
    case "Бык":
      return Colors.LIGHT_BLUE;
    case "Тигр":
      return Colors.DARK_BLUE;
    case "Кролик":
      return Colors.LIGHT_GREEN;
    case "Дракон":
      return Colors.BROWN;
    case "Свинья":
      return Colors.LIGHT_BLUE;
    case "Обезьяна":
      return Colors.BROWN;
    case "Коза":
      return Colors.ORANGE;
    case "Крыса":
      return Colors.DARK_BLUE;
    case "Собака":
      return Colors.PURPLE;
    case "Петух":
      return Colors.PINK;
    case "Лошадь":
      return Colors.RED;
    case "Змея":
      return Colors.LIGHT_GREEN;
    default:
      return Colors.BROWN;
  }
};

export default getColorByAnimalElement;
