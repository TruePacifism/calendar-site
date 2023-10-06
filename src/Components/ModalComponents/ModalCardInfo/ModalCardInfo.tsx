import React from "react";
import styles from "./ModalCardInfo.module.css";
import { cardInfoType, collisionType } from "../../../utils/types";
import CardColumn from "../../CardColumn/CardColumn";
import ModalCollision from "../ModalCollision/ModalCollision";
import ModalHeading from "../ModalHeading/ModalHeading";

type propsType = {
  cardInfo: cardInfoType;
};

const getAllCollisions = (cardInfo: cardInfoType): collisionType[] => {
  const result = [];
  if (cardInfo.year.animal.collisions) {
    result.push(...cardInfo.year.animal.collisions);
  }
  if (cardInfo.month.animal.collisions) {
    result.push(...cardInfo.month.animal.collisions);
  }
  if (cardInfo.day.animal.collisions) {
    result.push(...cardInfo.day.animal.collisions);
  }
  if (cardInfo.hour.animal.collisions) {
    result.push(...cardInfo.hour.animal.collisions);
  }
  if (cardInfo.currentPillar.animal.collisions) {
    result.push(...cardInfo.currentPillar.animal.collisions);
  }
  return result;
};

const keys = ["year", "month", "day", "hour", "pillar"];

export default function ModalCardInfo({ cardInfo }: propsType) {
  return (
    <div className={styles.container}>
      <ModalHeading text="КАРТА" />
      <ul className={styles.list}>
        <CardColumn
          key={keys[0]}
          animal={cardInfo.year.animal}
          element={cardInfo.year.element}
        />
        <CardColumn
          key={keys[1]}
          animal={cardInfo.month.animal}
          element={cardInfo.month.element}
        />
        <CardColumn
          key={keys[2]}
          animal={cardInfo.day.animal}
          element={cardInfo.day.element}
        />
        <CardColumn
          key={keys[3]}
          animal={cardInfo.hour.animal}
          element={cardInfo.hour.element}
        />
        <div></div>
        <CardColumn
          key={keys[4]}
          animal={cardInfo.currentPillar.animal}
          element={cardInfo.currentPillar.element}
        />
      </ul>
      <ul className={styles.collisionsList}>
        {getAllCollisions(cardInfo).map((collision, idx) => (
          <>
            <ModalCollision collision={collision} key={idx} />
          </>
        ))}
      </ul>
    </div>
  );
}
