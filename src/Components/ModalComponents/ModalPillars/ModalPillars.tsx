import React from "react";
import styles from "./ModalPillars.module.css";
import { collisionType, pillarType } from "../../../utils/types";
import ModalHeading from "../ModalHeading/ModalHeading";
import CardColumn from "../../CardColumn/CardColumn";
import ModalCollision from "../ModalCollision/ModalCollision";

type propsType = {
  pillars: pillarType[];
  currentPillar: pillarType;
};

const getAllCollisions = (pillars: pillarType[]): collisionType[] => {
  const result: collisionType[] = [];
  pillars.forEach((pillar) => {
    if (pillar.animal.collisions) {
      result.push(...pillar.animal.collisions);
    }
  });
  return result;
};

export default function ModalPillars({ pillars, currentPillar }: propsType) {
  return (
    <div className={styles.container}>
      <ModalHeading text="ТАКТЫ" />
      <div className={styles.pillarsContainer}>
        {pillars.map((pillar, idx) => (
          <CardColumn
            doneFor="Calculator"
            key={pillar.year}
            animal={pillar.animal}
            element={pillar.element}
            isCurrentPillar={
              currentPillar && currentPillar.ageYear === pillar.ageYear
            }
            title={`${pillar.year},${pillar.month}\n${pillar.ageYear},${pillar.ageMonth}`}
            name={idx}
          />
        ))}
      </div>
      <ul className={styles.collisionsList}>
        {getAllCollisions(pillars).map((collision, idx) => (
          <ModalCollision collision={collision} key={idx} />
        ))}
      </ul>
    </div>
  );
}
