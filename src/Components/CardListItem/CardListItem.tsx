import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CardListItem.module.css";
import { cardInfoType, colorType } from "../../utils/types";
import getColorByAnimal from "../../utils/getColorByAnimal";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardListItem({ cardInfo }: propsType) {
  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  useEffect(() => {
    setColor(getColorByAnimal(cardInfo.year.animal));
  }, []);
  return (
    <li className={styles.section}>
      <div
        className={styles.container}
        style={{ backgroundColor: color ? color.hex : "transparent" }}
      >
        <span className={styles.name}>{cardInfo.name}</span>
        <span
          className={styles.birthdate}
        >{`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute} ${cardInfo.birthdate.day}.${cardInfo.birthdate.month}.${cardInfo.birthdate.year}`}</span>
      </div>
    </li>
  );
}
