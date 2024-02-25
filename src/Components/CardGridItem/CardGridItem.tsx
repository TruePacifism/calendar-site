import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./CardGridItem.module.css";
import IconedCardInfoList from "../IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, colorType, inputDataType } from "../../utils/types";
import CardInfo from "../CardInfo/CardInfo";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import AnimalLogo from "../AnimalLogo/AnimalLogo";
import CardOptionsButton from "../CardOptionsButton/CardOptionsButton";
import { useDispatch } from "react-redux";
import { closeModalAction } from "../../utils/store";
import { createSearchParams, useNavigate } from "react-router-dom";
import { normalizeBirthdate } from "../../utils/normalizeBirthdateString";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardGridItem({ cardInfo }: propsType) {
  const cardRef: React.MutableRefObject<HTMLDivElement> =
    useRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenCard = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      const { name, birthdate, birthcity, gender, livingcity, offset } =
        cardInfo;
      const inputData: inputDataType = {
        name,
        birthdate,
        birthcity,
        gender,
        livingcity,
        offset,
      };
      dispatch(closeModalAction());
      navigate({
        search: createSearchParams({
          inputData: JSON.stringify(inputData),
          id: cardInfo.id,
        }).toString(),
        pathname: "/cards",
      });
    },
    [dispatch, navigate, cardInfo]
  );

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
        onClick={handleOpenCard}
        ref={cardRef}
      >
        <CardOptionsButton cardRef={cardRef} cardInfo={cardInfo} />
        <span className={styles.name}>{cardInfo.name}</span>
        <div className={styles.mainInfoContainer}>
          <AnimalLogo doneFor="CardGridItem" animal={cardInfo.year.animal} />
          <IconedCardInfoList cardInfo={cardInfo} doneFor="CardGridItem" />
        </div>
        <span className={styles.birthdate}>
          {normalizeBirthdate(cardInfo.birthdate)}
        </span>
        <CardInfo doneFor="CardGridItem" cardInfo={cardInfo} />
      </div>
    </li>
  );
}
