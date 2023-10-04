import React from "react";
import styles from "./ModalPillars.module.css";
import { collisionType, pillarType } from "../../../types";
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
        <div className={styles.pillarsInnerContainer}>
          {pillars.map((pillar) => (
            <CardColumn
              animal={pillar.animal}
              element={pillar.element}
              isCurrentPillar={currentPillar.ageYear === pillar.ageYear}
            />
          ))}
        </div>
      </div>
      <ul className={styles.collisionsList}>
        {getAllCollisions(pillars).map((collision) => (
          <ModalCollision collision={collision} />
        ))}
      </ul>
    </div>
  );
}
