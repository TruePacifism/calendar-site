import { Animals, Elements } from "./enums";
import { animalType, elementType } from "./types";

export default function getPrevAnimalElement(
  animalElement: animalType | elementType
): animalType | elementType {
  const isAnimal = Object.keys(animalElement).includes("collisions");
  if (isAnimal) {
    const index = Object.keys(Animals).findIndex(
      (animal) => Animals[animal].name === animalElement.name
    );
    const prevIndex = index === 0 ? 11 : index - 1;
    return {
      ...Object.values(Animals)[prevIndex],
      isBlack: false,
      collisions: [],

      isGood: true,
    };
  } else {
    const index = Object.keys(Elements).findIndex(
      (element) => Elements[element].name === animalElement.name
    );
    const prevIndex = index === 0 ? 9 : index - 1;
    return {
      ...Object.values(Elements)[prevIndex],
      isBlack: false,
      isGood: true,
    };
  }
}
