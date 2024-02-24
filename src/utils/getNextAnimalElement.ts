import { Animals, Elements } from "./enums";
import { animalType, elementType } from "./types";

export default function getNextAnimalElement(
  animalElement: animalType | elementType
): animalType | elementType {
  const isAnimal = Object.keys(animalElement).includes("collisions");
  console.log(animalElement, isAnimal);

  if (isAnimal) {
    const index = Object.keys(Animals).findIndex(
      (animal) => Animals[animal].name === animalElement.name
    );
    const nextIndex = index === 11 ? 0 : index + 1;
    return {
      ...Object.values(Animals)[nextIndex],
      collisions: [],
      isBlack: false,
      isGood: true,
    };
  } else {
    const index = Object.keys(Elements).findIndex(
      (element) => Elements[element].name === animalElement.name
    );
    const nextIndex = index === 9 ? 0 : index + 1;
    return {
      ...Object.values(Elements)[nextIndex],
      isBlack: false,
      isGood: true,
    };
  }
}
