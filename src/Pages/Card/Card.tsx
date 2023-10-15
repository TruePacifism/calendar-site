import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Card.module.css";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import CustomCheckBoxGroup from "../../Components/CustomCheckBoxGroup";
import { cardInfoType } from "../../utils/types";
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
import cardInfoPlaceholder from "../../utils/cardPlaceholder";

export default function Card(): React.JSX.Element {
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState(cardInfoPlaceholder);
  useEffect(() => {
    setCardInfo(cardInfoPlaceholder);
  }, []);
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
  useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider theme={modalTheme}>
        <Dialog fullWidth open={isOpenModal} onClose={closeModal}>
          {modalContent}
        </Dialog>
      </ThemeProvider>
      <div className={styles.nameContainer}>
        <h1 className={styles.name}>{cardInfo.name}</h1>
      </div>
      <IconedCardInfoList
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
        >
          <FallingStarsField stars={cardInfo.fallingStars} />
        </li>
        <li
          className={styles.otherInfoListItem}
          onClick={() => {
            openModal(<ModalAnimalChart />);
          }}
        >
          <AnimalChart />
        </li>
      </ul>
      <div>
        <div className={styles.chartTitleBox}>
          <span className={styles.chartTitle}>ГРАФИК</span>
          <CustomCheckBoxGroup
            checkboxesInfo={[
              { title: "Неделя", value: "Неделя" },
              { title: "Месяц", value: "Месяц" },
              { title: "Год", value: "Год" },
            ]}
            onChange={() => {}}
            className={styles.chartCheckboxes}
          />
        </div>
        <CardLineChart />
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
        />
      </div>

      <div className={styles.saveContainer}>
        <ThemeProvider theme={buttonTheme}>
          <Button>СОХРАНИТЬ</Button>
          <p className={styles.saveText}>
            Рассчитать совместимость с другой картой, генеалогическое древо
            можно построить, если зайти на полную версию сайта с компьютера.
          </p>
        </ThemeProvider>
      </div>
    </>
  );
}