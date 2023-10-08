import { Colors } from "./enums";
import { animalType, colorType } from "./types";

const getColorByAnimal = (animal: animalType): colorType => {
  const { name } = animal;
  switch (name) {
    case "Лошадь":
      return Colors.RED;
    case "Кролик":
      return Colors.LIGHT_GREEN;
    case "Петух":
      return Colors.PURPLE;
    default:
      return Colors.BROWN;
  }
};

export default getColorByAnimal;
