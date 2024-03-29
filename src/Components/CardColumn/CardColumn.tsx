import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import calculatorStyles from "./CardColumn-Calculator.module.css";
import cardGridItemStyles from "./CardColumn-CardGridItem.module.css";
import homePageStyles from "./CardColumn-HomePage.module.css";
import editingStyles from "./CardColumn-Editing.module.css";
import {
  animalType,
  elementType,
  stateType,
  stylesType,
} from "../../utils/types";
import AnimalPic from "../AnimalElementPic/AnimalPic";
import ElementPic from "../AnimalElementPic/ElementPic";
import CollisionsList from "../CollisionsList/CollisionsList";
import { Input, ThemeProvider } from "@mui/material";
import { homePageInput } from "../../utils/muiThemes";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../utils/store";
import InputTodayModal from "../InputTodayModal/InputTodayModal";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import getMonthName from "../../utils/getMonthName";
import { ReactComponent as ArrowTopIcon } from "../../images/arrow-top-icon.svg";
import { ReactComponent as ArrowBottomIcon } from "../../images/arrow-down-icon.svg";
import getNextAnimalElement from "../../utils/getNextAnimalElement";
import getPrevAnimalElement from "../../utils/getPrevAnimalElement";

export type cardColumnNameType =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "currentPillar"
  | number;

type propsType = {
  animal: animalType;
  element: elementType;
  isCurrentPillar?: boolean;
  doneFor: doneForType;
  title: string | number;
  name: cardColumnNameType;
  onOffsetIncrement?: Function;
  onOffsetDecrement?: Function;
};

type doneForType = "Calculator" | "Editing" | "CardGridItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
    case "Editing":
      return editingStyles;
  }
};

const badNames = ["-1:-1", "-1", "0", " ", ""];

export default function CardColumn({
  element,
  animal,
  isCurrentPillar,
  doneFor,
  title,
  name,
  onOffsetIncrement,
  onOffsetDecrement,
}: propsType) {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>();

  const modalContent = useSelector<stateType, ReactJSXElement>(
    (store) => store.modalContent
  );
  useEffect(() => {
    if (!modalContent && inputRef.current) {
      inputRef.current.value = sessionStorage.getItem(name.toString());
    }
  }, [modalContent, inputRef, name]);

  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState();

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));

    sessionStorage.setItem(name.toString(), title.toString());
  }, [doneFor, name, title]);
  const [isSwitching, setIsSwitching]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [editingModeAnimal, setEditingModeAnimal]: [
    animalType,
    Dispatch<SetStateAction<animalType>>
  ] = useState(animal);
  const [editingModeElement, setEditingModeElement]: [
    elementType,
    Dispatch<SetStateAction<elementType>>
  ] = useState(element);

  // eslint-disable-next-line
  const onClickHandle: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(openModalAction(<InputTodayModal selected={name} />));
    },
    [dispatch, name]
  );

  return (
    styles && (
      <li
        className={
          isCurrentPillar
            ? [styles.container, styles.currentPillar].join(" ")
            : styles.container
        }
      >
        {doneFor === "HomePage" ? (
          <ThemeProvider theme={homePageInput}>
            <Input
              value={
                name === "month" && typeof title === "number"
                  ? getMonthName((title as number) - 1)
                      .substring(0, 3)
                      .toLowerCase()
                  : title
              }
              readOnly
              disableUnderline
              inputRef={inputRef}
              onClick={onClickHandle}
              id={(function getId(): string {
                switch (name) {
                  case "year":
                    return "yearInput";
                  case "month":
                    return "monthInput";
                  case "day":
                    return "dayInput";
                  case "hour":
                    return "hourInput";
                  default:
                    return "";
                }
              })()}
            />
          </ThemeProvider>
        ) : (
          <div className={styles.headingContainer}>
            <h3
              className={styles.heading}
              style={
                typeof name !== "number"
                  ? { fontSize: 20, lineHeight: "26px" }
                  : {}
              }
            >
              {badNames.includes(title.toString()) ? "ㅤ" : title}
            </h3>
          </div>
        )}
        {doneFor === "Editing" && (
          <ArrowTopIcon
            className={styles.editingArrowIcon}
            onClick={() => {
              onOffsetIncrement();
              setIsSwitching(true);
              setTimeout(() => {
                setEditingModeAnimal((oldAnimal) =>
                  getNextAnimalElement(oldAnimal)
                );
                setEditingModeElement((oldElement) =>
                  getNextAnimalElement(oldElement)
                );
                setIsSwitching(false);
              }, 250);
            }}
          />
        )}
        <div
          style={{
            opacity: isSwitching ? 0 : 1,
            transition: "opacity 250ms linear",
          }}
        >
          <ElementPic
            element={doneFor === "Editing" ? editingModeElement : element}
            doneFor={doneFor === "Editing" ? "Calculator" : doneFor}
          />
          <AnimalPic
            animal={doneFor === "Editing" ? editingModeAnimal : animal}
            doneFor={doneFor === "Editing" ? "Calculator" : doneFor}
          />
        </div>
        {doneFor === "Editing" && (
          <ArrowBottomIcon
            onClick={() => {
              onOffsetDecrement();
              setIsSwitching(true);
              setTimeout(() => {
                setEditingModeAnimal((oldAnimal) =>
                  getPrevAnimalElement(oldAnimal)
                );
                setEditingModeElement((oldElement) =>
                  getPrevAnimalElement(oldElement)
                );
                setIsSwitching(false);
              }, 250);
            }}
            className={styles.editingArrowIcon}
          />
        )}
        {(doneFor === "Calculator" || doneFor === "HomePage") && animal && (
          <CollisionsList collisions={animal.collisions} />
        )}
      </li>
    )
  );
}
