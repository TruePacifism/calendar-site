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

type propsType = {
  animal: animalType;
  element: elementType;
  isCurrentPillar?: boolean;
  doneFor: doneForType;
  title: string | number;
  name: "year" | "month" | "day" | "hour" | "currentPillar" | number;
};

type doneForType = "Calculator" | "CardGridItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
  }
};

const badNames = ["-1:-1", "-1", "0"];

export default function CardColumn({
  element,
  animal,
  isCurrentPillar,
  doneFor,
  title,
  name,
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

  // eslint-disable-next-line
  const onClickHandle: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch(openModalAction(<InputTodayModal />));
    },
    [dispatch]
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
              value={title}
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
            <h3 className={styles.heading}>
              {badNames.includes(title.toString()) ? "N/A" : title}
            </h3>
          </div>
        )}
        <ElementPic element={element} doneFor={doneFor} />
        <AnimalPic animal={animal} doneFor={doneFor} />
        {(doneFor === "Calculator" || doneFor === "HomePage") && animal && (
          <CollisionsList collisions={animal.collisions} />
        )}
      </li>
    )
  );
}
