import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalCollision.module.css";
import { ReactComponent as Rectangle } from "../../../images/collisions/rectangle.svg";
import { ReactComponent as Circle } from "../../../images/collisions/circle.svg";
import { ReactComponent as Heart } from "../../../images/collisions/broken-heart.svg";
import { ReactComponent as Half } from "../../../images/collisions/half-circle.svg";
import { ReactComponent as Triangle } from "../../../images/collisions/triangle.svg";
import { ReactComponent as HalfHorizontal } from "../../../images/collisions/half-circle-horizontal.svg";
import { collisionType, dateType } from "../../../utils/types";
import getCollisionFrames from "../../../api/getCollisionFrames";
import normalizeTime from "../../../utils/normalizeTime";

type propsType = {
  collision: collisionType;
  isToday?: boolean;
  birthdate?: dateType;
  trueBirthdate?: dateType;
};
type framesType = {
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
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

export default function ModalCollision({
  collision,
  isToday,
  birthdate,
  trueBirthdate,
}: propsType) {
  const [frames, setFrames]: [
    framesType,
    Dispatch<SetStateAction<framesType>>
  ] = useState();
  console.log(collision);

  useEffect(() => {
    console.log("isToday", isToday);

    if (
      !isToday ||
      (collision.targetName !== "час" &&
        collision.secondTarget.targetTime !== "час" &&
        collision.thirdTarget?.targetTime !== "час")
    ) {
      return;
    }
    const fetchFrames = async () => {
      const fetchedFrames = await getCollisionFrames({
        birthdate,
        trueBirthdate,
      });
      console.log(fetchedFrames);

      setFrames(fetchedFrames);
    };
    fetchFrames();
  }, [
    isToday,
    collision.targetName,
    birthdate,
    trueBirthdate,
    collision.secondTarget.targetTime,
    collision.thirdTarget?.targetTime,
  ]);
  return (
    (!isToday || collision.targetName !== "час" || frames) && (
      <li className={styles.container}>
        {getShape(collision.shape, collision.color, collision.secondColor)}
        <p className={styles.description}>{`${
          isToday && frames
            ? `${normalizeTime(
                frames.start.hour,
                frames.start.minute
              )} - ${normalizeTime(frames.end.hour, frames.end.minute)}`
            : ""
        } ${collision.kind}: ${collision.animal.name} - ${
          collision.secondTarget.animal.name
        } ${
          collision.thirdTarget ? `- ${collision.thirdTarget.animal.name}` : ""
        }`}</p>
      </li>
    )
  );
}
