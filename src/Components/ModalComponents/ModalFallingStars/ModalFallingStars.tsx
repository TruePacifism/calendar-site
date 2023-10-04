import React from "react";
import styles from "./ModalFallingStars.module.css";
import { fallingStarType } from "../../../types";
import ModalHeading from "../ModalHeading/ModalHeading";

type propsType = {
  fallingStars: fallingStarType[];
};

const getClassName = (year: number) => {
  switch (year) {
    case 1:
    case 6:
    case 8:
      return [styles.star, styles.white].join(" ");
    case 4:
      return [styles.star, styles.lightGreen].join(" ");
    case 5:
      return [styles.star, styles.yellow].join(" ");
    case 3:
      return [styles.star, styles.darkGreen].join(" ");
    case 9:
      return [styles.star, styles.purple].join(" ");
    case 7:
      return [styles.star, styles.red].join(" ");
    case 2:
      return [styles.star, styles.black].join(" ");
    default:
      break;
  }
};

export default function ModalFallingStars({ fallingStars }: propsType) {
  return (
    <div className={styles.container}>
      <ModalHeading text="ЛЕТЯЩИЕ ЗВЕЗДЫ" />
      <ul className={styles.starsList}>
        {fallingStars.map((star) => (
          <li className={getClassName(star.yearNumber)}>
            <span className={styles.year}>{star.yearNumber}</span>
            <span className={styles.month}>{star.monthNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
