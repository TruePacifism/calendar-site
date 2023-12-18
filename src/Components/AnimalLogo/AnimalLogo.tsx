import React, { useCallback } from "react";
import styles from "./AnimalLogo.module.css";

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
import { animalType } from "../../utils/types";

type propsType = {
  animal: animalType;
};

export default function AnimalLogo({ animal }: propsType) {
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
  }, [animal]);
  return getAnimalLogo();
}
