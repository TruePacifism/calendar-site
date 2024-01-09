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
import { ReactComponent as ThreePointsIcon } from "../../images/three-points-icon.svg";
import { useDispatch } from "react-redux";
import { openModalAction } from "../../utils/store";
import CardOptionsModal from "../CardOptionsModal/CardOptionsModal";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardGridItem({ cardInfo }: propsType) {
  const dispatch = useDispatch();
  const cardRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();

  const [color, setColor]: [colorType, Dispatch<SetStateAction<colorType>>] =
    useState();
  useEffect(() => {
    setColor(getColorByAnimalElement(cardInfo.year.element));
  }, [cardInfo.year.element]);
  // eslint-disable-next-line
  const handleThreePointsClick = () => {
    const rootWidth = document
      .getElementById("root")
      .getBoundingClientRect().width;
    console.log(rootWidth);
    const cardX = cardRef.current.getBoundingClientRect().x;
    console.log(cardX);

    dispatch(
      openModalAction(
        <CardOptionsModal
          position={rootWidth / 2 > cardX ? "right" : "left"}
          cardData={cardInfo}
          cardRef={cardRef}
        />
      )
    );
  };
  return (
    <li className={styles.section}>
      <div
        className={styles.container}
        style={{ backgroundColor: color ? color.backgroundHex : "#FFFFFF" }}
        ref={cardRef}
      >
        <ThreePointsIcon
          className={styles.threePointsIcon}
          onClick={handleThreePointsClick}
        />
        <span className={styles.name}>{cardInfo.name}</span>
        <div className={styles.mainInfoContainer}>
          <AnimalLogo doneFor="CardGridItem" animal={cardInfo.year.animal} />
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
