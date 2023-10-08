import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./CardColumn-Calculator.module.css";
import cardGridItemStyles from "./CardColumn-CardGridItem.module.css";
import homePageStyles from "./CardColumn-HomePage.module.css";
import { animalType, elementType, stylesType } from "../../utils/types";
import AnimalPic from "../AnimalElementPic/AnimalPic";
import ElementPic from "../AnimalElementPic/ElementPic";
import CollisionsList from "../CollisionsList/CollisionsList";

type propsType = {
  animal: animalType;
  element: elementType;
  isCurrentPillar?: boolean;
  doneFor: doneForType;
};

type doneForType = "Calculator" | "CardGridItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
  }
};

export default function CardColumn({
  element,
  animal,
  isCurrentPillar,
  doneFor,
}: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState();

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  });
  return (
    styles && (
      <li
        className={
          isCurrentPillar
            ? [styles.container, styles.currentPillar].join(" ")
            : styles.container
        }
      >
        <h3 className={styles.heading}>23:51</h3>
        <ElementPic element={element} doneFor={doneFor} />
        <AnimalPic animal={animal} doneFor={doneFor} />
        {doneFor === "Calculator" && (
          <CollisionsList collisions={animal.collisions} />
        )}
      </li>
    )
  );
}
