import React from "react";
import styles from "./CollisionsListItem.module.css";
import { collisionType } from "../../utils/types";
import { ReactComponent as Rectangle } from "../../images/collisions/rectangle.svg";
import { ReactComponent as Circle } from "../../images/collisions/circle.svg";
import { ReactComponent as Heart } from "../../images/collisions/heart.svg";
import { ReactComponent as Cloud } from "../../images/collisions/cloud.svg";

type propsType = {
  collision: collisionType;
};

const getShape = (shape: string, color: string) => {
  switch (shape) {
    case "half":
      return <Cloud className={getColorClassName(color)} />;
    case "circle":
      return <Circle className={getColorClassName(color)} />;
    case "rectangle":
      return <Rectangle className={getColorClassName(color)} />;
    case "heart":
      return <Heart className={getColorClassName(color)} />;
    default:
      return <Heart className={getColorClassName(color)} />;
  }
};

const getColorClassName = (color: string) => {
  console.log("color", color);

  switch (color) {
    case "red":
      return styles.red;
    case "lightGreen":
      return styles.lightGreen;
    case "lightBlue":
      return styles.lightBlue;
    case "blue":
      return styles.darkBlue;
    case "brown":
      return styles.brown;
    case "orange":
      return styles.orange;
    case "pink":
      return styles.pink;
    case "purple":
      return styles.purple;
    case "darkGreen":
      return styles.darkGreen;
    case "yellow":
      return styles.yellow;
    default:
      break;
  }
};

export default function CollisionsListItem({ collision }: propsType) {
  return (
    <li className={styles.container}>
      {getShape(collision.shape, collision.color)}
    </li>
  );
}
