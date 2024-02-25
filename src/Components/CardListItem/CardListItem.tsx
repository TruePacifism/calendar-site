import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./CardListItem.module.css";
import { cardInfoType, colorType, inputDataType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import CardOptionsButton from "../CardOptionsButton/CardOptionsButton";
import { closeModalAction } from "../../utils/store";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { normalizeBirthdate } from "../../utils/normalizeBirthdateString";
import AnimalLogo from "../AnimalLogo/AnimalLogo";

type propsType = {
  cardInfo: cardInfoType;
};

export default function CardListItem({ cardInfo }: propsType) {
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
        ref={cardRef}
        className={styles.container}
        onClick={handleOpenCard}
        style={{ backgroundColor: color ? color.backgroundHex : "transparent" }}
      >
        <div className={styles.animalLogoContainer}>
          <AnimalLogo animal={cardInfo.year.animal} doneFor="CardLineItem" />
        </div>
        <CardOptionsButton cardRef={cardRef} cardInfo={cardInfo} />
        <div className={styles.cardInfoContainer}>
          <span className={styles.name}>{cardInfo.name}</span>
          <span className={styles.birthdate}>
            {normalizeBirthdate(cardInfo.birthdate)}
          </span>
        </div>
      </div>
    </li>
  );
}
