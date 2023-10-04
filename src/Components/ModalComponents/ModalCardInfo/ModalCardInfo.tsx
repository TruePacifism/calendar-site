import React from "react";
import styles from "./ModalCardInfo.module.css";
import { cardInfoType, collisionType } from "../../../types";
import CardColumn from "../../CardColumn/CardColumn";
import CollisionIcon from "../../CollisionIcon/CollisionIcon";
import CollisionsListItem from "../../CollisionsListItem/CollisionsListItem";
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

export default function ModalCardInfo({ cardInfo }: propsType) {
  return (
    <div className={styles.container}>
      <ModalHeading text="КАРТА" />
      <ul className={styles.list}>
        <li className={styles.column}>
          <CardColumn
            animal={cardInfo.year.animal}
            element={cardInfo.year.element}
          />
        </li>
        <li className={styles.column}>
          <CardColumn
            animal={cardInfo.month.animal}
            element={cardInfo.month.element}
          />
        </li>
        <li className={styles.column}>
          <CardColumn
            animal={cardInfo.day.animal}
            element={cardInfo.day.element}
          />
        </li>
        <li className={styles.column}>
          <CardColumn
            animal={cardInfo.hour.animal}
            element={cardInfo.hour.element}
          />
        </li>
        <div></div>
        <li className={styles.column}>
          <CardColumn
            animal={cardInfo.currentPillar.animal}
            element={cardInfo.currentPillar.element}
          />
        </li>
      </ul>
      <ul className={styles.collisionsList}>
        {getAllCollisions(cardInfo).map((collision) => (
          <>
            <ModalCollision collision={collision} />
          </>
        ))}
      </ul>
    </div>
  );
}
