import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./CardInfo-Calculator.module.css";
import cardGridItemStyles from "./CardInfo-CardGridItem.module.css";
import homePageStyles from "./CardInfo-HomePage.module.css";
import CardColumn from "../CardColumn/CardColumn";
import { cardInfoType, stylesType } from "../../utils/types";

type propsType = {
  cardInfo: cardInfoType;
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

export default function CardInfo({ cardInfo, doneFor }: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState({ container: "" });
  console.log(styles);

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, []);
  return styles ? (
    <ul className={styles.container}>
      <CardColumn
        doneFor={doneFor}
        animal={cardInfo.year.animal}
        element={cardInfo.year.element}
      />
      <CardColumn
        doneFor={doneFor}
        animal={cardInfo.month.animal}
        element={cardInfo.month.element}
      />
      <CardColumn
        doneFor={doneFor}
        animal={cardInfo.day.animal}
        element={cardInfo.day.element}
      />
      <CardColumn
        doneFor={doneFor}
        animal={cardInfo.hour.animal}
        element={cardInfo.hour.element}
      />
      <div className={styles.separator}></div>
      <CardColumn
        animal={cardInfo.currentPillar.animal}
        doneFor={doneFor}
        element={cardInfo.currentPillar.element}
      />
    </ul>
  ) : (
    <></>
  );
}
