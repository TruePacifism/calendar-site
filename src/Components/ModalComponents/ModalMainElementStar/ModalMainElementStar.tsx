import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalMainElementStar.module.css";
import { mainElementType } from "../../../utils/types";

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

import { ReactComponent as GoodCircleExample } from "../../../images/good-circle-example.svg";
import { ReactComponent as BadCircleExample } from "../../../images/bad-circle-example.svg";

type propsType = {
  mainElement: mainElementType;
};

export default function ModalMainElementStar({ mainElement }: propsType) {
  const [starSrc, setStarSrc]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  useEffect(() => {
    switch (mainElement.name) {
      case "огонь":
        setStarSrc(mainElement.elements[0].isGood ? FireGood : FireBad);
        break;
      case "вода":
        setStarSrc(mainElement.elements[0].isGood ? WaterGood : WaterBad);
        break;
      case "земля":
        setStarSrc(mainElement.elements[0].isGood ? EarthGood : EarthBad);
        break;
      case "дерево":
        setStarSrc(mainElement.elements[0].isGood ? WoodGood : WoodBad);
        break;
      case "металл":
        setStarSrc(mainElement.elements[0].isGood ? MetalGood : MetalBad);
        break;

      default:
        break;
    }
  }, [mainElement.name, mainElement.elements]);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ModalHeading text="ЭЛЕМЕНТЫ" />
        <div className={styles.imageContainer}>
          <img src={starSrc} alt="" className={styles.image} />
        </div>
        <ul className={styles.exampleList}>
          <li className={styles.exampleItem}>
            <GoodCircleExample className={styles.exampleIcon} />
            <span className={styles.exampleTitle}>Полезные элементы</span>
          </li>
          <li className={styles.exampleItem}>
            <BadCircleExample className={styles.exampleIcon} />
            <span className={styles.exampleTitle}>Неполезные элементы</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
