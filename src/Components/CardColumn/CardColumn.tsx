import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CardColumn.module.css";
import { animalType, elementType } from "../../types";
import AnimalPic from "../AnimalElementPic/AnimalPic";
import ElementPic from "../AnimalElementPic/ElementPic";

type propsType = {
  animal: animalType;
  element: elementType;
};

export default function CardColumn({ element, animal }: propsType) {
  return (
    <li className={styles.container}>
      <h3 className={styles.heading}>23:51</h3>
      <AnimalPic animal={animal} />
      <ElementPic element={element} />
    </li>
  );
}
