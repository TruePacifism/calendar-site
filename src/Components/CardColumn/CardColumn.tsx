import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./CardColumn-Calculator.module.css";
import cardGridItemStyles from "./CardColumn-CardGridItem.module.css";
import homePageStyles from "./CardColumn-HomePage.module.css";
import { animalType, elementType, stylesType } from "../../utils/types";
import AnimalPic from "../AnimalElementPic/AnimalPic";
import ElementPic from "../AnimalElementPic/ElementPic";
import CollisionsList from "../CollisionsList/CollisionsList";
import { ReactComponent as ArrowLeft } from "../../images/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../images/arrow-right.svg";

type propsType = {
  animal: animalType;
  element: elementType;
  isCurrentPillar?: boolean;
  doneFor: doneForType;
  title: string | number;
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

const badNames = ["-1:-1", "-1", "0"];

export default function CardColumn({
  element,
  animal,
  isCurrentPillar,
  doneFor,
  title,
}: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState();

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);
  return (
    styles && (
      <li
        className={
          isCurrentPillar
            ? [styles.container, styles.currentPillar].join(" ")
            : styles.container
        }
      >
        <div className={styles.headingContainer}>
          {doneFor === "HomePage" && <ArrowLeft className={styles.arrow} />}
          <h3 className={styles.heading}>
            {badNames.includes(title.toString()) ? "N/A" : title}
          </h3>
          {doneFor === "HomePage" && <ArrowRight className={styles.arrow} />}
        </div>
        <ElementPic element={element} doneFor={doneFor} />
        <AnimalPic animal={animal} doneFor={doneFor} />
        {doneFor === "Calculator" && animal && (
          <CollisionsList collisions={animal.collisions} />
        )}
      </li>
    )
  );
}
