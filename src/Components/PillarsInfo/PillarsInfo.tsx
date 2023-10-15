import React from "react";
import styles from "./PillarsInfo.module.css";
import { pillarType } from "../../utils/types";
import CardColumn from "../CardColumn/CardColumn";

type propsType = {
  pillars: pillarType[];
  currentPillar: pillarType;
};

export default function PillarsInfo({ pillars, currentPillar }: propsType) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {pillars.map((pillar, idx) => (
          <CardColumn
            doneFor="Calculator"
            key={idx}
            animal={pillar.animal}
            element={pillar.element}
            isCurrentPillar={currentPillar.ageYear === pillar.ageYear}
            title={`${pillar.year},${pillar.month}\n
            ${pillar.ageYear},${pillar.ageMonth}`}
          />
        ))}
      </div>
    </div>
  );
}