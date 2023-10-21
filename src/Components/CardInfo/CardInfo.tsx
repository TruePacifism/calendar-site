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
  }, [doneFor]);
  return styles ? (
    <ul className={styles.container}>
      {cardInfo && (
        <>
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.hour.animal}
            element={cardInfo.hour.element}
            title={`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute}`}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.day.animal}
            element={cardInfo.day.element}
            title={cardInfo.birthdate.day}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.month.animal}
            element={cardInfo.month.element}
            title={cardInfo.birthdate.month + 1}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.year.animal}
            element={cardInfo.year.element}
            title={cardInfo.birthdate.year}
          />
          <div className={styles.separator}></div>
          {doneFor !== "HomePage" && (
            <CardColumn
              animal={
                cardInfo.currentPillar ? cardInfo.currentPillar.animal : null
              }
              doneFor={doneFor}
              element={
                cardInfo.currentPillar ? cardInfo.currentPillar.element : null
              }
              title="такт"
            />
          )}
        </>
      )}
    </ul>
  ) : (
    <></>
  );
}
