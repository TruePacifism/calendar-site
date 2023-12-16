import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CardGridItem.module.css";
import IconedCardInfoList from "../IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, colorType } from "../../utils/types";
import CardInfo from "../CardInfo/CardInfo";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import pfpPlaceholder from "../../images/pfpPlaceholder.png";
import { useNavigate } from "react-router-dom";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardGridItem({ cardInfo }: propsType) {
  const navigate = useNavigate();

  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  const [pfpUrl, setPfpUrl]: [string, Dispatch<SetStateAction<string>>] =
    useState(pfpPlaceholder);
  useEffect(() => {
    setColor(getColorByAnimalElement(cardInfo.year.element));
    setPfpUrl(pfpPlaceholder);
  }, [cardInfo.year.element]);
  const handleCardClick = () => {
    const { name, birthdate, gender, birthcity, livingcity, id } = cardInfo;
    const inputData = {
      name,
      birthdate,
      gender,
      birthcity,
      livingcity,
    };
    navigate(`/cards`, { state: { inputData, id } });
  };
  return (
    <li className={styles.section} onClick={handleCardClick}>
      <div
        className={styles.container}
        style={{ backgroundColor: color ? color.backgroundHex : "#FFFFFF" }}
      >
        <span className={styles.name}>{cardInfo.name}</span>
        <div className={styles.mainInfoContainer}>
          <img src={pfpUrl} alt="" className={styles.pfp} />
          <IconedCardInfoList cardInfo={cardInfo} doneFor="CardGridItem" />
        </div>
        <span
          className={styles.birthdate}
        >{`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute} ${cardInfo.birthdate.day}.${cardInfo.birthdate.month}.${cardInfo.birthdate.year}`}</span>
        <CardInfo doneFor="CardGridItem" cardInfo={cardInfo} />
      </div>
    </li>
  );
}
