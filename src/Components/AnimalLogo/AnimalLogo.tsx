import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import cardGridItemStyles from "./AnimalLogo-CardGridItem.module.css";
import homePageStyles from "./AnimalLogo-HomePage.module.css";
import cardLineStyles from "./AnimalLogo-CardLineItem.module.css";

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

type doneForType = "CardGridItem" | "CardLineItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "CardGridItem":
      return cardGridItemStyles;
    case "CardLineItem":
      return cardLineStyles;
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
      case "бык":
        return <Bull className={styles.icon} />;
      case "тигр":
        return <Tiger className={styles.icon} />;
      case "кролик":
        return <Cat className={styles.icon} />;
      case "собака":
        return <Dog className={styles.icon} />;
      case "дракон":
        return <Dragon className={styles.icon} />;
      case "коза":
        return <Goat className={styles.icon} />;
      case "лошадь":
        return <Horse className={styles.icon} />;
      case "обезьяна":
        return <Monkey className={styles.icon} />;
      case "свинья":
        return <Pig className={styles.icon} />;
      case "крыса":
        return <Rat className={styles.icon} />;
      case "петух":
        return <Rooster className={styles.icon} />;
      case "змея":
        return <Snake className={styles.icon} />;

      default:
        return <div></div>;
    }
  }, [animal, styles]);
  return styles && <>{getAnimalLogo()}</>;
}
