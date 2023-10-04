import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalMainElementStar.module.css";
import { mainElementType } from "../../../types";

import FireGood from "../../../images/mainStar/f+.png";
import FireBad from "../../../images/mainStar/f-.png";
import WaterGood from "../../../images/mainStar/w+.png";
import WaterBad from "../../../images/mainStar/w-.png";
import WoodGood from "../../../images/mainStar/t+.png";
import WoodBad from "../../../images/mainStar/t-.png";
import EarthGood from "../../../images/mainStar/s+.png";
import EarthBad from "../../../images/mainStar/s-.png";
import MetalGood from "../../../images/mainStar/m+.png";
import MetalBad from "../../../images/mainStar/m-.png";
import ModalHeading from "../ModalHeading/ModalHeading";

type propsType = {
  mainElement: mainElementType;
};

export default function ModalMainElementStar({ mainElement }: propsType) {
  const [starSrc, setStarSrc]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  useEffect(() => {
    switch (mainElement.name) {
      case "Огонь":
        setStarSrc(mainElement.elements[0].isGood ? FireGood : FireBad);
        break;
      case "Вода":
        setStarSrc(mainElement.elements[0].isGood ? WaterGood : WaterBad);
        break;
      case "Земля":
        setStarSrc(mainElement.elements[0].isGood ? EarthGood : EarthBad);
        break;
      case "Дерево":
        setStarSrc(mainElement.elements[0].isGood ? WoodGood : WoodBad);
        break;
      case "Металл":
        setStarSrc(mainElement.elements[0].isGood ? MetalGood : MetalBad);
        break;

      default:
        break;
    }
  });
  return (
    <div className={styles.container}>
            <ModalHeading text="ЭЛЕМЕНТЫ" />
      <img src={starSrc} alt="" className={styles.image} />
    </div>
  );
}
