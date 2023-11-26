import React from "react";
import { ReactComponent as Circle } from "../../images/cycle-circle.svg";

import styles from "./StrangeCircle.module.css";
import { cardInfoType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";

type propsType = {
  cardInfos: cardInfoType[];
};

export default function StrangeCircle({ cardInfos }: propsType) {
  return (
    <div className={styles.container}>
      <div className={styles.circleContainer}>
        <Circle className={styles.circle} />
      </div>
      <ul className={styles.lines}>
        {cardInfos.map((cardInfo) => (
          <li
            className={styles.lineContainer}
            style={{
              backgroundColor: getColorByAnimalElement(cardInfo.year.element)
                .backgroundHex,
            }}
          >
            <span className={styles.lineText}>{cardInfo.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
