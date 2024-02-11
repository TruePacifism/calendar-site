import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import calculatorStyles from "./Pic-Calculator.module.css";
import cardGridItemStyles from "./Pic-CardGridItem.module.css";
import homePageStyles from "./Pic-HomePage.module.css";
import exampleStyles from "./Pic-Examples.module.css";

import { animalType, stylesType } from "../../utils/types";
import Bull from "../../images/animals/bull.png";
import Tiger from "../../images/animals/tiger.png";
import Cat from "../../images/animals/cat.png";
import Dog from "../../images/animals/dog.png";
import Dragon from "../../images/animals/dragon.png";
import Goat from "../../images/animals/goat.png";
import Horse from "../../images/animals/horse.png";
import Monkey from "../../images/animals/monkey.png";
import Pig from "../../images/animals/pig.png";
import Rat from "../../images/animals/rat.png";
import Rooster from "../../images/animals/rooster.png";
import Snake from "../../images/animals/snake.png";
import NoAnimal from "../../images/animals/no.png";
import { useDispatch } from "react-redux";
import { addLoadingImage, removeLoadingImage } from "../../utils/store";
import uniqid from "uniqid";

type propsType = {
  animal: animalType;
  doneFor: doneForType;
};

type doneForType = "Calculator" | "CardGridItem" | "HomePage" | "Examples";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
    case "Examples":
      return exampleStyles;
  }
};

export default function AnimalPic({ animal, doneFor }: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState({});
  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);

  const [src, setSrc]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  useEffect(() => {
    if (!animal || !animal.name) {
      setSrc(NoAnimal);
      return;
    }
    switch (animal.name) {
      case "бык":
        setSrc(Bull);
        break;
      case "тигр":
        setSrc(Tiger);
        break;
      case "кролик":
        setSrc(Cat);
        break;
      case "собака":
        setSrc(Dog);
        break;
      case "дракон":
        setSrc(Dragon);
        break;
      case "коза":
        setSrc(Goat);
        break;
      case "лошадь":
        setSrc(Horse);
        break;
      case "обезьяна":
        setSrc(Monkey);
        break;
      case "свинья":
        setSrc(Pig);
        break;
      case "крыса":
        setSrc(Rat);
        break;
      case "петух":
        setSrc(Rooster);
        break;
      case "змея":
        setSrc(Snake);
        break;

      default:
        setSrc(NoAnimal);
        break;
    }
  }, [animal]);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [code, setCode]: [string, Dispatch<SetStateAction<string>>] = useState(
    uniqid(animal ? animal.name + "-" : "null-")
  );
  useEffect(() => {
    if (animal && animal.name !== " ") {
      dispatch(addLoadingImage(code));
    }
    return () => {
      dispatch(removeLoadingImage(code));
    };
  }, [animal, code, dispatch]);

  return (
    styles &&
    (animal && animal.name !== " " && animal.name ? (
      <>
        <div
          className={
            animal
              ? [
                  styles.imageWrapper,
                  animal.isGood ? styles.whiteBorder : styles.grayBorder,
                ].join(" ")
              : styles.imageWrapper
          }
        >
          <div
            className={
              animal && animal.isBlack
                ? styles.blackBorder
                : styles.noBlackBorder
            }
          >
            <img
              src={src}
              alt=""
              placeholder={NoAnimal}
              className={styles.image}
              // onLoadStartCapture={() => {
              //   dispatch(addLoadingImage(code));
              // }}
              // onLoadStart={() => {
              //   dispatch(addLoadingImage(code));
              // }}
              onLoad={() => {
                dispatch(removeLoadingImage(code));
              }}
              // onLoadStart={() => {
              //   dispatch(addLoadingImage(code));
              // }}
            />
          </div>
        </div>
        <span className={styles.name}>{animal ? animal.name : "Нет"}</span>
      </>
    ) : (
      <>
        <div className={styles.imageWrapper + " " + styles.noImageBorder}>
          <div className={styles.noBlackBorder}>
            <img src={NoAnimal} className={styles.image} alt="" />
          </div>
        </div>
        <span className={styles.name}>{"ㅤ"}</span>
      </>
    ))
  );
}
