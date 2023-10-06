import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Pic.module.css";
import { elementType } from "../../utils/types";

import WoodIn from "../../images/elements/din+.jpg";
import WoodYan from "../../images/elements/djan+.jpg";
import WaterIn from "../../images/elements/win+.jpg";
import WaterYan from "../../images/elements/wjan+.jpg";
import FireIn from "../../images/elements/fin+.jpg";
import FireYan from "../../images/elements/fjan+.jpg";
import MetalIn from "../../images/elements/min+.jpg";
import MetalYan from "../../images/elements/mjan+.jpg";
import EarthIn from "../../images/elements/sin+.jpg";
import EarthYan from "../../images/elements/sjan+.jpg";
import NoElement from "../../images/animals/no.png";

type propsType = {
  element: elementType;
};

export default function ElementPic({ element }: propsType) {
  const [src, setSrc]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  useEffect(() => {
    if (!element || !element.name) {
      setSrc(NoElement);
      return;
    }
    switch (element.name) {
      case "Вода Инь":
        setSrc(WaterIn);
        break;
      case "Вода Ян":
        setSrc(WaterYan);
        break;
      case "Дерево Инь":
        setSrc(WoodIn);
        break;
      case "Дерево Ян":
        setSrc(WoodYan);
        break;
      case "Земля Инь":
        setSrc(EarthIn);
        break;
      case "Земля Ян":
        setSrc(EarthYan);
        break;
      case "Огонь Инь":
        setSrc(FireIn);
        break;
      case "Огонь Ян":
        setSrc(FireYan);
        break;
      case "Металл Инь":
        setSrc(MetalIn);
        break;
      case "Металл Ян":
        setSrc(MetalYan);
        break;
      default:
        setSrc(NoElement);
        break;
    }
  }, [element, element.isBlack, element.isGood]);

  const [className, setClassName]: [string, Dispatch<SetStateAction<string>>] =
    useState(styles.image);
  useEffect(() => {
    let initClassNames = [styles.image];
    if (element.isBlack) {
      initClassNames.push(styles.black);
    }
    if (!element.isGood) {
      initClassNames.push(styles.bad);
    }
    setClassName(initClassNames.join(" "));
  }, [element.isBlack, element.isGood]);
  return (
    <>
      <div className={styles.imageWrapper}>
        <img src={src} alt="" className={className} />
      </div>
      <span className={styles.name}>{element.name.split(" ")[0]}</span>
    </>
  );
}
