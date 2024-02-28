import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Card.module.css";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, inputDataType, stateType } from "../../utils/types";
import CardInfo from "../../Components/CardInfo/CardInfo";
import MainElementStar from "../../Components/MainElementStar/MainElementStar";
import FallingStarsField from "../../Components/FallingStarsField/FallingStarsField";
import CardLineChart from "../../Components/CardLineChart/CardLineChart";
import PillarsInfo from "../../Components/PillarsInfo/PillarsInfo";
import AnimalChart from "../../Components/AnimalChart/AnimalChart";
import { Button, ThemeProvider } from "@mui/material";
import { buttonTheme } from "../../utils/muiThemes";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import ModalIconedInfo from "../../Components/ModalComponents/ModalIconedInfo/ModalIconedInfo";
import ModalCardInfo from "../../Components/ModalComponents/ModalCardInfo/ModalCardInfo";
import ModalMainElementStar from "../../Components/ModalComponents/ModalMainElementStar/ModalMainElementStar";
import ModalFallingStars from "../../Components/ModalComponents/ModalFallingStars/ModalFallingStars";
import ModalAnimalChart from "../../Components/ModalComponents/ModalAnimalChart/ModalAnimalChart";
import ModalPillars from "../../Components/ModalComponents/ModalPillars/ModalPillars";
import countCard from "../../api/countCard";
import { useSelector, useDispatch } from "react-redux";
import addCard from "../../api/addCard";
import {
  addCardAction,
  closeModalAction,
  openModalAction,
} from "../../utils/store";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import { createSearchParams, useNavigate } from "react-router-dom";

type propsType = {
  inputData: inputDataType;
  id?: string;
};

export default function Card({ inputData, id }: propsType): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  const openModal = (content: ReactJSXElement) => {
    dispatch(openModalAction(content));
  };
  useEffect(() => {
    if (inputData) {
      const getCard = async (inputData: inputDataType) => {
        const data = await countCard({ inputData });
        console.log("cardInfo", data);

        setCardInfo(data);
      };
      getCard(inputData);
    }
  }, [inputData, dispatch]);

  const token = useSelector<stateType, string>((state) => state.token);
  const fetchAddCard = async () => {
    const result = await addCard({ card: cardInfo, token });
    if (result.status / 100 === 2) {
      dispatch(addCardAction(cardInfo));
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
          id: result.data.id,
        }).toString(),
        pathname: "/cards",
      });
    } else {
    }
  };

  return (
    cardInfo && (
      <div className={styles.container}>
        <div className={styles.nameContainer}>
          <h1 className={styles.name}>{cardInfo.name}</h1>
        </div>
        <IconedCardInfoList
          backgroundColor={getColorByAnimalElement(cardInfo.year.element)}
          doneFor="Calculator"
          cardInfo={cardInfo}
          onClick={() => {
            openModal(<ModalIconedInfo cardInfo={cardInfo} />);
          }}
        />
        <div className={styles.cardHeadingContainer}>
          <h2 className={styles.cardHeading}>Карта</h2>
        </div>
        <div
          onClick={() => {
            openModal(<ModalCardInfo doneFor="Card" cardInfo={cardInfo} />);
          }}
        >
          <CardInfo doneFor="Calculator" cardInfo={cardInfo} />
        </div>
        <ul className={styles.otherInfoNamesList}>
          <h2 className={styles.otherInfoNamesItem}>Элементы</h2>
          <h2 className={styles.otherInfoNamesItem}>Летящие звезды</h2>
          <h2 className={styles.otherInfoNamesItem}>Животные</h2>
        </ul>
        <ul className={styles.otherInfoList}>
          <li
            className={styles.otherInfoListItem}
            onClick={() => {
              openModal(
                <ModalMainElementStar mainElement={cardInfo.mainElement} />
              );
            }}
            style={{
              backgroundColor: getColorByAnimalElement(cardInfo.year.element)
                .backgroundHex,
            }}
          >
            <MainElementStar mainElement={cardInfo.mainElement} />
          </li>
          <li
            className={styles.otherInfoListItem}
            onClick={() => {
              openModal(
                <ModalFallingStars fallingStars={cardInfo.fallingStars} />
              );
            }}
            style={{
              backgroundColor: getColorByAnimalElement(cardInfo.year.element)
                .backgroundHex,
            }}
          >
            <FallingStarsField stars={cardInfo.fallingStars} />
          </li>
          <li
            className={styles.otherInfoListItem}
            onClick={() => {
              openModal(<ModalAnimalChart chartData={cardInfo.chartData} />);
            }}
            style={{
              backgroundColor: getColorByAnimalElement(cardInfo.year.element)
                .backgroundHex,
            }}
          >
            <AnimalChart chartData={cardInfo.chartData} />
          </li>
        </ul>
        <div>
          <CardLineChart
            backgroundColor={
              getColorByAnimalElement(cardInfo.year.element).backgroundHex
            }
            chartData={cardInfo.lineChartData}
          />
        </div>
        <div className={styles.cardHeadingContainer}>
          <h2 className={styles.cardHeading}>Такты</h2>
        </div>
        <div
          onClick={() => {
            openModal(
              <ModalPillars
                pillars={cardInfo.pillars}
                currentPillar={cardInfo.currentPillar}
              />
            );
          }}
        >
          <PillarsInfo
            pillars={cardInfo.pillars}
            currentPillar={cardInfo.currentPillar}
            backgroundColor={
              getColorByAnimalElement(cardInfo.year.element).backgroundHex
            }
          />
        </div>
        <div className={styles.saveContainer}>
          <ThemeProvider theme={buttonTheme}>
            {
              <Button
                className={styles.button}
                onClick={
                  id
                    ? undefined
                    : () => {
                        fetchAddCard();
                      }
                }
              >
                {id ? "КАРТА СОХРАНЕНА" : "СОХРАНИТЬ"}
              </Button>
            }
          </ThemeProvider>
        </div>
      </div>
    )
  );
}
