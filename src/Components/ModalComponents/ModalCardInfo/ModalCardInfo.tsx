import React from "react";
import styles from "./ModalCardInfo.module.css";
import { cardInfoType, collisionType } from "../../../utils/types";
import CardColumn from "../../CardColumn/CardColumn";
import ModalCollision from "../ModalCollision/ModalCollision";
import ElementsExamples from "../../ElementsExamples/ElementsExamples";
import getMonthName from "../../../utils/getMonthName";
import getCollisionFrames from "../../../api/getCollisionFrames";

type propsType = {
  cardInfo: cardInfoType;
  isToday?: boolean;
};

const getAllCollisions = (cardInfo: cardInfoType): collisionType[] => {
  const result: collisionType[] = [];
  if (cardInfo.year.animal.collisions) {
    result.push(
      ...cardInfo.year.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.month.animal.collisions) {
    result.push(
      ...cardInfo.month.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.day.animal.collisions) {
    result.push(
      ...cardInfo.day.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.hour.animal.collisions) {
    result.push(
      ...cardInfo.hour.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }
  if (cardInfo.currentPillar && cardInfo.currentPillar.animal.collisions) {
    result.push(
      ...cardInfo.currentPillar.animal.collisions.filter(
        (collision) =>
          !result.find((resultCollision) => collision.id === resultCollision.id)
      )
    );
  }

  return result;
};

const keys = ["year", "month", "day", "hour", "pillar"];

export default function ModalCardInfo({ cardInfo, isToday }: propsType) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <CardColumn
          doneFor="Calculator"
          key={keys[3]}
          animal={cardInfo.hour.animal}
          element={cardInfo.hour.element}
          title={`${cardInfo.birthdate.hour}:${cardInfo.birthdate.minute}`}
          name={"hour"}
        />
        <CardColumn
          doneFor="Calculator"
          key={keys[2]}
          animal={cardInfo.day.animal}
          element={cardInfo.day.element}
          title={cardInfo.birthdate.day}
          name={"day"}
        />
        <CardColumn
          doneFor="Calculator"
          key={keys[1]}
          animal={cardInfo.month.animal}
          element={cardInfo.month.element}
          title={getMonthName(cardInfo.birthdate.month)
            .substring(0, 3)
            .toLowerCase()}
          name={"month"}
        />
        <CardColumn
          doneFor="Calculator"
          key={keys[0]}
          animal={cardInfo.year.animal}
          element={cardInfo.year.element}
          title={cardInfo.birthdate.year}
          name={"year"}
        />
        {cardInfo.currentPillar && (
          <CardColumn
            doneFor="Calculator"
            key={keys[4]}
            animal={
              cardInfo.currentPillar ? cardInfo.currentPillar.animal : null
            }
            element={
              cardInfo.currentPillar ? cardInfo.currentPillar.element : null
            }
            title="такт"
            name={"currentPillar"}
          />
        )}
      </ul>
      <ul className={styles.collisionsList}>
        {getAllCollisions(cardInfo).map((collision, idx) => (
          <>
            <ModalCollision
              collision={collision}
              key={idx}
              isToday
              birthdate={isToday ? cardInfo.birthdate : undefined}
              trueBirthdate={isToday ? cardInfo.trueBirthdate : undefined}
            />
          </>
        ))}
      </ul>
      <ElementsExamples />
    </div>
  );
}
