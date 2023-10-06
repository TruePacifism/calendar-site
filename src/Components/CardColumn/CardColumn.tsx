import React from "react";
import styles from "./CardColumn.module.css";
import { animalType, elementType } from "../../utils/types";
import AnimalPic from "../AnimalElementPic/AnimalPic";
import ElementPic from "../AnimalElementPic/ElementPic";
import CollisionsList from "../CollisionsList/CollisionsList";

type propsType = {
  animal: animalType;
  element: elementType;
  isCurrentPillar?: boolean;
};

export default function CardColumn({
  element,
  animal,
  isCurrentPillar,
}: propsType) {
  return (
    <li
      className={
        isCurrentPillar
          ? [styles.container, styles.currentPillar].join(" ")
          : styles.container
      }
    >
      <h3 className={styles.heading}>23:51</h3>
      <ElementPic element={element} />
      <AnimalPic animal={animal} />
      <CollisionsList collisions={animal.collisions} />
    </li>
  );
}
