import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./CardGridItem.module.css";
import IconedCardInfoList from "../IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, colorType } from "../../utils/types";
import CardInfo from "../CardInfo/CardInfo";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import AnimalLogo from "../AnimalLogo/AnimalLogo";
import getMonthName from "../../utils/getMonthName";
import CardOptionsButton from "../CardOptionsButton/CardOptionsButton";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardGridItem({ cardInfo }: propsType) {
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
        className={styles.container}
        style={{ backgroundColor: color ? color.backgroundHex : "#FFFFFF" }}
        ref={cardRef}
      >
        <CardOptionsButton cardRef={cardRef} cardInfo={cardInfo} />
        <span className={styles.name}>{cardInfo.name}</span>
        <div className={styles.mainInfoContainer}>
          <AnimalLogo doneFor="CardGridItem" animal={cardInfo.year.animal} />
          <IconedCardInfoList cardInfo={cardInfo} doneFor="CardGridItem" />
        </div>
        <span className={styles.birthdate}>
          {`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute} ${
            cardInfo.birthdate.day
          } ${getMonthName(cardInfo.birthdate.month).substring(0, 3)} ${
            cardInfo.birthdate.year
          }`}
        </span>
        <CardInfo doneFor="CardGridItem" cardInfo={cardInfo} />
      </div>
    </li>
  );
}
