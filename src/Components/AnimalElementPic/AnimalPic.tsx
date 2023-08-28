import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Pic.module.css";
import { animalType } from "../../types";
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
};

export default function AnimalPic({ animal }: propsType) {
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
  }, []);

  const [className, setClassName]: [string, Dispatch<SetStateAction<string>>] =
    useState(styles.image);
  useEffect(() => {
    let initClassNames = [styles.image];
    if (animal.isBlack) {
      initClassNames.push(styles.black);
    }
    if (!animal.isGood) {
      initClassNames.push(styles.bad);
    }
    setClassName(initClassNames.join(" "));
  }, []);
  return (
    <>
      <img src={src} alt="" className={className} />
      <span className={styles.name}>{animal.name}</span>
    </>
  );
}
