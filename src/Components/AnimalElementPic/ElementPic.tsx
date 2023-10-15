import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./Pic-Calculator.module.css";
import cardGridItemStyles from "./Pic-CardGridItem.module.css";
import homePageStyles from "./Pic-HomePage.module.css";
import { elementType, stylesType } from "../../utils/types";

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
  doneFor: doneForType;
};

type doneForType = "Calculator" | "CardGridItem" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
  }
};

export default function ElementPic({ element, doneFor }: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState({});
  //УДАЛИТЬ В КОНЦЕ
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);

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
  }, [element.isBlack, element.isGood, styles.image, styles.black, styles.bad]);

  return (
    styles && (
      <>
        <div className={styles.imageWrapper}>
          <img src={src} alt="" className={className} />
        </div>
        <span className={styles.name}>{element.name.split(" ")[0]}</span>
      </>
    )
  );
}