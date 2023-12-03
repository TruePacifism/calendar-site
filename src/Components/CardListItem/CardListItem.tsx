import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CardListItem.module.css";
import { cardInfoType, colorType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardListItem({ cardInfo }: propsType) {
  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  useEffect(() => {
    setColor(getColorByAnimalElement(cardInfo.year.element));
  }, [cardInfo.year.element]);
  return (
    <li className={styles.section}>
      <div
        className={styles.container}
        style={{ backgroundColor: color ? color.backgroundHex : "transparent" }}
      >
        <span className={styles.name}>{cardInfo.name}</span>
        <span
          className={styles.birthdate}
        >{`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute} ${cardInfo.birthdate.day}.${cardInfo.birthdate.month}.${cardInfo.birthdate.year}`}</span>
      </div>
    </li>
  );
}
