import React from "react";
import styles from "./FallingStar.module.css";
import { fallingStarType } from "../../utils/types";

type propsType = {
  star: fallingStarType;
};
const getClassName = (year: number) => {
  switch (year) {
    case 1:
    case 6:
    case 8:
      return [styles.container, styles.white].join(" ");
    case 4:
      return [styles.container, styles.lightGreen].join(" ");
    case 5:
      return [styles.container, styles.yellow].join(" ");
    case 3:
      return [styles.container, styles.darkGreen].join(" ");
    case 9:
      return [styles.container, styles.purple].join(" ");
    case 7:
      return [styles.container, styles.red].join(" ");
    case 2:
      return [styles.container, styles.black].join(" ");
    default:
      break;
  }
};

export default function FallingStar({ star }: propsType) {
  return (
    <li className={getClassName(star.yearNumber)}>
      <span className={styles.year}>{star.yearNumber}</span>
      <span className={styles.month}>
        {star.monthNumber === -1 ? "" : star.monthNumber}
      </span>
    </li>
  );
}
