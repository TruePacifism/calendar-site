import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalCardInfo.module.css";
import {
  cardInfoType,
  collisionType,
  inputDataType,
  offsetType,
} from "../../../utils/types";
import CardColumn from "../../CardColumn/CardColumn";
import ModalCollision from "../ModalCollision/ModalCollision";
import ElementsExamples from "../../ElementsExamples/ElementsExamples";
import getMonthName from "../../../utils/getMonthName";
import ModalHeading from "../ModalHeading/ModalHeading";
import { ReactComponent as EditIcon } from "../../../images/edit-icon.svg";
import { Button, ThemeProvider } from "@mui/material";
import { darkButtonTheme } from "../../../utils/muiThemes";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCardAction,
  closeModalAction,
  setLoadingAction,
} from "../../../utils/store";
import addCard from "../../../api/addCard";
import countCard from "../../../api/countCard";
type doneForType = "MainPage" | "Card";

type propsType = {
  cardInfo: cardInfoType;
  isToday?: boolean;
  doneFor: doneForType;
};

const getAllCollisions = (cardInfo: cardInfoType): collisionType[] => {
  const result: collisionType[] = [];
  if (cardInfo.year.animal.collisions) {
    result.push(
      ...cardInfo.year.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.month.animal.collisions) {
    result.push(
      ...cardInfo.month.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.day.animal.collisions) {
    result.push(
      ...cardInfo.day.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.hour.animal.collisions) {
    result.push(
      ...cardInfo.hour.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.currentPillar && cardInfo.currentPillar.animal.collisions) {
    result.push(
      ...cardInfo.currentPillar.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }

  return result;
};

const keys = ["year", "month", "day", "hour", "pillar"];

export default function ModalCardInfo({
  cardInfo,
  isToday,
  doneFor,
}: propsType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditingMode, setIsEditingMode]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [offset, setOffset]: [
    offsetType,
    Dispatch<SetStateAction<offsetType>>
  ] = useState(
    cardInfo.offset
      ? cardInfo.offset
      : {
          year: 0,
          month: 0,
          pillar: 0,
        }
  );
  useEffect(() => {
    console.log(offset);
  }, [offset]);
  const handleRecount = () => {
    dispatch(setLoadingAction({ from: "edited card", value: true }));
    const addCardFunc = async () => {
      const {
        birthcity,
        birthdate,
        livingcity,
        name,
        gender,
        offset,
      }: inputDataType = cardInfo;
      const inputData: inputDataType = {
        name,
        birthdate,
        birthcity,
        gender,
        livingcity,
        offset,
      };
      const newCard = await countCard({ inputData });
      const result = await addCard({
        card: newCard,
        token: localStorage.getItem("token"),
      });
      dispatch(addCardAction(cardInfo));
      dispatch(closeModalAction());
      navigate({
        search: createSearchParams({
          inputData: JSON.stringify(inputData),
          id: result.data.id,
        }).toString(),
        pathname: "/cards",
      });
    };
    addCardFunc();
  };
  return (
    <>
      <div className={styles.container}>
        {!isEditingMode && doneFor === "Card" && (
          <EditIcon
            onClick={() => {
              setIsEditingMode(true);
            }}
            className={styles.editIcon}
          />
        )}
        {doneFor === "Card" && (
          <ModalHeading
            text={isEditingMode ? "РЕДАКТИРОВАТЬ КАРТУ" : "КАРТА"}
          />
        )}
        <ul className={styles.list}>
          <CardColumn
            doneFor={"Calculator"}
            key={keys[3]}
            animal={cardInfo.hour.animal}
            element={cardInfo.hour.element}
            title={`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute}`}
            // onOffsetIncrement={() => {
            //   setOffset((oldOffset) => ({
            //     ...oldOffset,
            //     hour: oldOffset.hour + 1,
            //   }));
            // }}
            // onOffsetDecrement={() => {
            //   setOffset((oldOffset) => ({
            //     ...oldOffset,
            //     hour: oldOffset.hour - 1,
            //   }));
            // }}
            name={"hour"}
          />
          <CardColumn
            doneFor={"Calculator"}
            key={keys[2]}
            animal={cardInfo.day.animal}
            element={cardInfo.day.element}
            title={cardInfo.birthdate.day}
            // onOffsetIncrement={() => {
            //   setOffset((oldOffset) => ({
            //     ...oldOffset,
            //     day: oldOffset.day + 1,
            //   }));
            // }}
            name={"day"}
            // onOffsetDecrement={() => {
            //   setOffset((oldOffset) => ({
            //     ...oldOffset,
            //     day: oldOffset.day - 1,
            //   }));
            // }}
          />
          <CardColumn
            doneFor={isEditingMode ? "Editing" : "Calculator"}
            key={keys[1]}
            animal={cardInfo.month.animal}
            element={cardInfo.month.element}
            title={getMonthName(cardInfo.birthdate.month)
              .substring(0, 3)
              .toLowerCase()}
            name={"month"}
            onOffsetIncrement={() => {
              setOffset((oldOffset) => ({
                ...oldOffset,
                month: oldOffset.month + 1,
              }));
            }}
            onOffsetDecrement={() => {
              setOffset((oldOffset) => ({
                ...oldOffset,
                month: oldOffset.month - 1,
              }));
            }}
          />
          <CardColumn
            doneFor={isEditingMode ? "Editing" : "Calculator"}
            key={keys[0]}
            animal={cardInfo.year.animal}
            element={cardInfo.year.element}
            title={cardInfo.birthdate.year}
            name={"year"}
            onOffsetIncrement={() => {
              setOffset((oldOffset) => ({
                ...oldOffset,
                year: oldOffset.year + 1,
              }));
            }}
            onOffsetDecrement={() => {
              setOffset((oldOffset) => ({
                ...oldOffset,
                year: oldOffset.year - 1,
              }));
            }}
          />
          {cardInfo.currentPillar && (
            <CardColumn
              doneFor={"Calculator"}
              key={keys[4]}
              animal={
                cardInfo.currentPillar ? cardInfo.currentPillar.animal : null
              }
              element={
                cardInfo.currentPillar ? cardInfo.currentPillar.element : null
              }
              title="такт"
              name={"currentPillar"}
            />
          )}
        </ul>
        {!isEditingMode ? (
          <>
            <ul className={styles.collisionsList}>
              {getAllCollisions(cardInfo).map((collision, idx) => (
                <>
                  <ModalCollision
                    collision={collision}
                    key={idx}
                    isToday={isToday}
                    birthdate={isToday ? cardInfo.birthdate : undefined}
                    trueBirthdate={isToday ? cardInfo.trueBirthdate : undefined}
                  />
                </>
              ))}
            </ul>
            <ElementsExamples />
          </>
        ) : (
          <div className={styles.editingButtonsContainer}>
            <ThemeProvider theme={darkButtonTheme}>
              <Button onClick={handleRecount}>СОХРАНИТЬ</Button>
              <Button
                onClick={() => {
                  dispatch(closeModalAction());
                }}
              >
                ОТМЕНА
              </Button>
            </ThemeProvider>
          </div>
        )}
      </div>
    </>
  );
}
