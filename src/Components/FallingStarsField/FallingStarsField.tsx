import React from "react";
import styles from "./FallingStarsField.module.css";
import { fallingStarType } from "../../types";
import FallingStar from "../FallingStar/FallingStar";

type propsType = {
  stars: fallingStarType[];
};

export default function FallingStarsField({ stars }: propsType) {
  return (
    <ul className={styles.container}>
      {stars.map((star) => (
        <FallingStar star={star} />
      ))}
    </ul>
  );
}
