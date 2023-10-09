import React from "react";
import { ReactComponent as Circle } from "../../images/cycle-circle.svg";

import styles from "./StrangeCircle.module.css";
import { cardInfoType } from "../../utils/types";
import getColorByAnimal from "../../utils/getColorByAnimal";

type propsType = {
  cardInfos: cardInfoType[];
};

export default function StrangeCircle({ cardInfos }: propsType) {
  return (
    <div className={styles.container}>
      <Circle className={styles.circle} />
      <div className={styles.linesContainer}>
        {cardInfos.map((cardInfo) => (
          <div
            className={styles.line}
            style={{
              backgroundColor: getColorByAnimal(cardInfo.year.animal).hex,
            }}
          >
            {cardInfo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
