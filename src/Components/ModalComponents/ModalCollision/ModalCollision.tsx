import React from "react";
import styles from "./ModalCollision.module.css";
import { ReactComponent as Rectangle } from "../../../images/collisions/rectangle.svg";
import { ReactComponent as Circle } from "../../../images/collisions/circle.svg";
import { ReactComponent as Heart } from "../../../images/collisions/heart.svg";
import { ReactComponent as Cloud } from "../../../images/collisions/cloud.svg";
import { collisionType } from "../../../types";

type propsType = {
  collision: collisionType;
};

const getShape = (shape: string, color: string) => {
  switch (shape) {
    case "Полукруг":
      return <Cloud className={getColorClassName(color)} />;
    case "Круг":
      return <Circle className={getColorClassName(color)} />;
    case "Квадрат":
      return <Rectangle className={getColorClassName(color)} />;
    case "Сердце":
      return <Heart className={getColorClassName(color)} />;
    default:
      return <Heart className={getColorClassName(color)} />;
  }
};

const getColorClassName = (color: string) => {
  switch (color) {
    case "Красный":
      return styles.red;
    case "Светло-Зеленый":
      return styles.lightGreen;
    case "Голубой":
      return styles.lightBlue;
    case "Коричневый":
      return styles.brown;
    case "Оранжевый":
      return styles.orange;
    case "Розовый":
      return styles.pink;
    case "Фиолетовый":
      return styles.purple;
    case "Темно-зеленый":
      return styles.darkGreen;
    case "Желтый":
      return styles.yellow;
    default:
      break;
  }
};

export default function ModalCollision({ collision }: propsType) {
  return (
    <li className={styles.container}>
      {getShape(collision.shape, collision.color)}
      <p className={styles.description}>
        {" "}
        - Lorem ipsum dolor sit amet, consectetur adipisicing..
      </p>
    </li>
  );
}
