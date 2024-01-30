import React from "react";
import styles from "./ModalCollision.module.css";
import { ReactComponent as Rectangle } from "../../../images/collisions/rectangle.svg";
import { ReactComponent as Circle } from "../../../images/collisions/circle.svg";
import { ReactComponent as Heart } from "../../../images/collisions/heart.svg";
import { ReactComponent as Half } from "../../../images/collisions/half-circle.svg";
import { ReactComponent as Triangle } from "../../../images/collisions/triangle.svg";
import { ReactComponent as HalfHorizontal } from "../../../images/collisions/half-circle-horizontal.svg";
import { collisionType } from "../../../utils/types";

type propsType = {
  collision: collisionType;
};

const getShape = (shape: string, color: string, secondColor?: string) => {
  const className = [styles.shape, getColorClassName(color)].join(" ");
  switch (shape) {
    case "half":
      return (
        <Half
          className={[
            styles.shape,
            getColorClassName(color, "-left"),
            getColorClassName(secondColor ? secondColor : color, "-right"),
          ].join(" ")}
        />
      );
    case "circle":
      return <Circle className={className} />;
    case "rectangle":
      return <Rectangle className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "triangle":
      return <Triangle className={className} />;
    case "half-horizontal":
      return <HalfHorizontal className={className} />;
    default:
      return <Heart className={className} />;
  }
};

const getColorClassName = (color: string, postfix?: string) => {
  return styles[color + (postfix ? postfix : "")];
};

export default function ModalCollision({ collision }: propsType) {
  return (
    <li className={styles.container}>
      {getShape(collision.shape, collision.color, collision.secondColor)}
      <p className={styles.description}>{`${collision.kind}: ${
        collision.animal.name
      } - ${collision.secondTarget.animal.name} ${
        collision.thirdTarget ? `- ${collision.thirdTarget.animal.name}` : ""
      }`}</p>
    </li>
  );
}
