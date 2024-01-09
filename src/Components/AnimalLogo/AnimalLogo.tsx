import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import cardGridItemStyles from "./AnimalLogo-CardGridItem.module.css";
import homePageStyles from "./AnimalLogo-HomePage.module.css";

import { ReactComponent as Bull } from "../../images/animalsLogo/bull.svg";
import { ReactComponent as Tiger } from "../../images/animalsLogo/tiger.svg";
import { ReactComponent as Cat } from "../../images/animalsLogo/cat.svg";
import { ReactComponent as Dragon } from "../../images/animalsLogo/dragon.svg";
import { ReactComponent as Pig } from "../../images/animalsLogo/pig.svg";
import { ReactComponent as Rat } from "../../images/animalsLogo/rat.svg";
import { ReactComponent as Rooster } from "../../images/animalsLogo/rooster.svg";
import { ReactComponent as Dog } from "../../images/animalsLogo/dog.svg";
import { ReactComponent as Goat } from "../../images/animalsLogo/goat.svg";
import { ReactComponent as Horse } from "../../images/animalsLogo/horse.svg";
import { ReactComponent as Snake } from "../../images/animalsLogo/snake.svg";
import { ReactComponent as Monkey } from "../../images/animalsLogo/monkey.svg";
import { animalType, stylesType } from "../../utils/types";

type propsType = {
  animal: animalType;
  doneFor: doneForType;
};

type doneForType = "CardGridItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
  }
};

export default function AnimalLogo({ animal, doneFor }: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState();

  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);
  const getAnimalLogo = useCallback(() => {
    switch (animal.name) {
      case "Бык":
        return <Bull className={styles.icon} />;
      case "Тигр":
        return <Tiger className={styles.icon} />;
      case "Кролик":
        return <Cat className={styles.icon} />;
      case "Собака":
        return <Dog className={styles.icon} />;
      case "Дракон":
        return <Dragon className={styles.icon} />;
      case "Коза":
        return <Goat className={styles.icon} />;
      case "Лошадь":
        return <Horse className={styles.icon} />;
      case "Обезьяна":
        return <Monkey className={styles.icon} />;
      case "Свинья":
        return <Pig className={styles.icon} />;
      case "Крыса":
        return <Rat className={styles.icon} />;
      case "Петух":
        return <Rooster className={styles.icon} />;
      case "Змея":
        return <Snake className={styles.icon} />;

      default:
        return <div></div>;
    }
  }, [animal, styles]);
  return styles && <>{getAnimalLogo()}</>;
}
