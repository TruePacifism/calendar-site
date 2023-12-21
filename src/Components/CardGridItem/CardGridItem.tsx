import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CardGridItem.module.css";
import IconedCardInfoList from "../IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, colorType } from "../../utils/types";
import CardInfo from "../CardInfo/CardInfo";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import { useNavigate } from "react-router-dom";
import AnimalLogo from "../AnimalLogo/AnimalLogo";
import getMonthName from "../../utils/getMonthName";
import { ReactComponent as ThreePointsIcon } from "../../images/three-points-icon.svg";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardGridItem({ cardInfo }: propsType) {
  const navigate = useNavigate();

  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  useEffect(() => {
    setColor(getColorByAnimalElement(cardInfo.year.element));
  }, [cardInfo.year.element]);
  // eslint-disable-next-line
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
        <ThreePointsIcon
          className={styles.threePointsIcon}
          onClick={() => {
            console.log("clicked");
          }}
        />
        <span className={styles.name}>{cardInfo.name}</span>
        <div className={styles.mainInfoContainer}>
          <AnimalLogo animal={cardInfo.year.animal} />
          {/* <img src={pfpUrl} alt="" className={styles.pfp} /> */}
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
