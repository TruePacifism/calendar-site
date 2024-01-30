import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./CardInfo-Calculator.module.css";
import cardGridItemStyles from "./CardInfo-CardGridItem.module.css";
import homePageStyles from "./CardInfo-HomePage.module.css";
import CardColumn from "../CardColumn/CardColumn";
import { cardInfoType, stylesType } from "../../utils/types";
import { useMediaQuery } from "@mui/material";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import getMonthName from "../../utils/getMonthName";
import normalizeTime from "../../utils/normalizeTime";

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

  const smallMobile = useMediaQuery("(min-width: 345px)");

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);
  return styles ? (
    <ul
      className={styles.container}
      style={{
        backgroundColor:
          doneFor === "Calculator"
            ? getColorByAnimalElement(cardInfo.year.element).backgroundHex
            : null,
      }}
    >
      {cardInfo && (
        <>
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.hour.animal}
            element={cardInfo.hour.element}
            title={normalizeTime(
              cardInfo.trueBirthdate.hour.toString(),
              cardInfo.trueBirthdate.minute.toString()
            )}
            name={"hour"}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.day.animal}
            element={cardInfo.day.element}
            title={cardInfo.trueBirthdate.day}
            name={"day"}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.month.animal}
            element={cardInfo.month.element}
            title={
              typeof cardInfo.trueBirthdate.month === "number"
                ? getMonthName(cardInfo.trueBirthdate.month)
                    .slice(0, 3)
                    .toLowerCase()
                : "НЕТ"
            }
            name={"month"}
          />
          <CardColumn
            doneFor={doneFor}
            animal={cardInfo.year.animal}
            element={cardInfo.year.element}
            title={cardInfo.trueBirthdate.year}
            name={"year"}
          />
          {smallMobile && doneFor !== "HomePage" && (
            <div className={styles.separator}></div>
          )}
          {doneFor !== "HomePage" && doneFor !== "CardGridItem" && (
            <CardColumn
              animal={
                cardInfo.currentPillar ? cardInfo.currentPillar.animal : null
              }
              doneFor={doneFor}
              element={
                cardInfo.currentPillar ? cardInfo.currentPillar.element : null
              }
              title="такт"
              name={"currentPillar"}
            />
          )}
        </>
      )}
    </ul>
  ) : (
    <></>
  );
}
