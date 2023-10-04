import React from "react";
import styles from "./CardInfo.module.css";
import CardColumn from "../CardColumn/CardColumn";
import { cardInfoType } from "../../types";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardInfo({ cardInfo }: propsType) {
  return (
    <ul className={styles.container}>
      <CardColumn
        animal={cardInfo.year.animal}
        element={cardInfo.year.element}
      />
      <CardColumn
        animal={cardInfo.month.animal}
        element={cardInfo.month.element}
      />
      <CardColumn animal={cardInfo.day.animal} element={cardInfo.day.element} />
      <CardColumn
        animal={cardInfo.hour.animal}
        element={cardInfo.hour.element}
      />
      <div className={styles.separator}></div>
      <CardColumn
        animal={cardInfo.currentPillar.animal}
        element={cardInfo.currentPillar.element}
      />
    </ul>
  );
}
