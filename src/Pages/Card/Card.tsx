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
import { Button, Dialog, ThemeProvider } from "@mui/material";
import { buttonTheme, modalTheme } from "../../utils/muiThemes";
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
  clearLoadingImages,
  setLoadingAction,
} from "../../utils/store";
import getColorByAnimalElement from "../../utils/getColorByAnimal";

type propsType = {
  inputData: inputDataType;
};

export default function Card({ inputData }: propsType): React.JSX.Element {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  const [isOpenModal, setIsOpenModal]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [modalContent, setModalContent]: [
    ReactJSXElement,
    Dispatch<SetStateAction<ReactJSXElement>>
  ] = useState(<p></p>);
  const openModal = (content: ReactJSXElement) => {
    setModalContent(content);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  useEffect(() => {
    if (inputData) {
      const getCard = async (inputData: inputDataType) => {
        dispatch(
          setLoadingAction({
            value: true,
            from: "start fetched counted card info",
          })
        );
        const data = await countCard({ inputData });
        setCardInfo(data);
        dispatch(
          setLoadingAction({ value: false, from: "fetched counted card info" })
        );
      };
      getCard(inputData);
    }
  }, [inputData, dispatch]);

  useEffect(() => {
    if (isOpenModal) {
      window.addEventListener("popstate", closeModal);
    } else {
      window.removeEventListener("popstate", closeModal);
    }
  }, [isOpenModal]);

  const token = useSelector<stateType, string>((state) => state.token);
  const fetchAddCard = async () => {
    const result = await addCard({ card: cardInfo, token });
    if (result.status / 100 === 2) {
      dispatch(addCardAction(cardInfo));
    } else {
    }
  };
  useEffect(() => {
    return () => {
      dispatch(clearLoadingImages());
      dispatch(
        setLoadingAction({
          value: true,
          from: "exited counted card info",
        })
      );
    };
  }, [dispatch]);

  return (
    cardInfo && (
      <div className={styles.container}>
        <ThemeProvider theme={modalTheme}>
          <Dialog fullWidth open={isOpenModal} onClose={closeModal}>
            {modalContent}
          </Dialog>
        </ThemeProvider>
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
            openModal(<ModalCardInfo cardInfo={cardInfo} />);
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
            <Button
              onClick={() => {
                fetchAddCard();
              }}
            >
              СОХРАНИТЬ
            </Button>
            <p className={styles.saveText}>
              Рассчитать совместимость с другой картой, генеалогическое древо
              можно построить, если зайти на полную версию сайта с компьютера.
            </p>
          </ThemeProvider>
        </div>
      </div>
    )
  );
}
