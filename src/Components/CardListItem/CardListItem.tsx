import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./CardListItem.module.css";
import { cardInfoType, colorType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import CardOptionsButton from "../CardOptionsButton/CardOptionsButton";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardListItem({ cardInfo }: propsType) {
  const cardRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();

  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  useEffect(() => {
    setColor(getColorByAnimalElement(cardInfo.year.element));
  }, [cardInfo.year.element]);
  return (
    <li className={styles.section}>
      <div
        ref={cardRef}
        className={styles.container}
        style={{ backgroundColor: color ? color.backgroundHex : "transparent" }}
      >
        <CardOptionsButton cardRef={cardRef} cardInfo={cardInfo} />
        <span className={styles.name}>{cardInfo.name}</span>
        <span
          className={styles.birthdate}
        >{`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute} ${cardInfo.birthdate.day}.${cardInfo.birthdate.month}.${cardInfo.birthdate.year}`}</span>
      </div>
    </li>
  );
}
