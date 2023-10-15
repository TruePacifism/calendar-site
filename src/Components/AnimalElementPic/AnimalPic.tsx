import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import calculatorStyles from "./Pic-Calculator.module.css";
import cardGridItemStyles from "./Pic-CardGridItem.module.css";
import homePageStyles from "./Pic-HomePage.module.css";

import { animalType, stylesType } from "../../utils/types";
import Bull from "../../images/animals/bull-gn.jpg";
import Tiger from "../../images/animals/tiger+.jpg";
import Cat from "../../images/animals/cat-gn.jpg";
import Dog from "../../images/animals/dog-gn.jpg";
import Dragon from "../../images/animals/dragon-gn.jpg";
import Goat from "../../images/animals/goat-gn.jpg";
import Horse from "../../images/animals/horse-gn.jpg";
import Monkey from "../../images/animals/monkey-gn.jpg";
import Pig from "../../images/animals/pig+.jpg";
import Rat from "../../images/animals/rat+.jpg";
import Rooster from "../../images/animals/rooster+.jpg";
import Snake from "../../images/animals/snake+.jpg";
import NoAnimal from "../../images/animals/no.png";

type propsType = {
  animal: animalType;
  doneFor: doneForType;
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
      case "Бык":
        setSrc(Bull);
        break;
      case "Тигр":
        setSrc(Tiger);
        break;
      case "Кролик":
        setSrc(Cat);
        break;
      case "Собака":
        setSrc(Dog);
        break;
      case "Дракон":
        setSrc(Dragon);
        break;
      case "Коза":
        setSrc(Goat);
        break;
      case "Лошадь":
        setSrc(Horse);
        break;
      case "Обезьяна":
        setSrc(Monkey);
        break;
      case "Свинья":
        setSrc(Pig);
        break;
      case "Крыса":
        setSrc(Rat);
        break;
      case "Петух":
        setSrc(Rooster);
        break;
      case "Змея":
        setSrc(Snake);
        break;

      default:
        setSrc(NoAnimal);
        break;
    }
  }, [animal, animal.isBlack, animal.isGood]);

  return (
    styles && (
      <>
        <div
          className={[
            styles.imageWrapper,
            animal.isGood ? styles.whiteBorder : styles.grayBorder,
          ].join(" ")}
        >
          <div
            className={
              animal.isBlack ? styles.blackBorder : styles.noBlackBorder
            }
          >
            <img src={src} alt="" className={styles.image} />
          </div>
        </div>
        <span className={styles.name}>{animal.name}</span>
      </>
    )
  );
}
