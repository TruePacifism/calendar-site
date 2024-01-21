import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./Pic-Calculator.module.css";
import cardGridItemStyles from "./Pic-CardGridItem.module.css";
import homePageStyles from "./Pic-HomePage.module.css";
import { elementType, stylesType } from "../../utils/types";

import WoodIn from "../../images/elements/tin.png";
import WoodYan from "../../images/elements/tjan.png";
import WaterIn from "../../images/elements/win.png";
import WaterYan from "../../images/elements/wjan.png";
import FireIn from "../../images/elements/fin.png";
import FireYan from "../../images/elements/fjan.png";
import MetalIn from "../../images/elements/min.png";
import MetalYan from "../../images/elements/mjan.png";
import EarthIn from "../../images/elements/sin.png";
import EarthYan from "../../images/elements/sjan.png";
import NoElement from "../../images/animals/no.png";
import { useDispatch } from "react-redux";
import { removeLoadingImage } from "../../utils/store";
import uniqid from "uniqid";

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
  const dispatch = useDispatch();
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
      case "вода инь":
        setSrc(WaterIn);
        break;
      case "вода ян":
        setSrc(WaterYan);
        break;
      case "дерево инь":
        setSrc(WoodIn);
        break;
      case "дерево ян":
        setSrc(WoodYan);
        break;
      case "земля инь":
        setSrc(EarthIn);
        break;
      case "земля ян":
        setSrc(EarthYan);
        break;
      case "огонь инь":
        setSrc(FireIn);
        break;
      case "огонь ян":
        setSrc(FireYan);
        break;
      case "металл инь":
        setSrc(MetalIn);
        break;
      case "металл ян":
        setSrc(MetalYan);
        break;
      default:
        setSrc(NoElement);
        break;
    }
  }, [element]);

  // eslint-disable-next-line
  const [className, setClassName]: [string, Dispatch<SetStateAction<string>>] =
    useState(styles.image);
  useEffect(() => {
    let initClassNames = [styles.image];
    if (!element) {
      setClassName(initClassNames.join(" "));
      return;
    }
    if (element && element.isBlack) {
      initClassNames.push(styles.black);
    }
    if (element && !element.isGood) {
      initClassNames.push(styles.bad);
    }
    setClassName(initClassNames.join(" "));
  }, [element, styles.image, styles.black, styles.bad]);
  // eslint-disable-next-line
  const [code, setCode]: [string, Dispatch<SetStateAction<string>>] = useState(
    uniqid(element ? element.name + "-" : "null-")
  );

  return (
    styles &&
    (element && element.name !== " " && element.name ? (
      <>
        <div
          className={
            element
              ? [
                  styles.imageWrapper,
                  element.isGood ? styles.whiteBorder : styles.grayBorder,
                ].join(" ")
              : styles.imageWrapper
          }
        >
          <div
            className={
              element && element.isBlack
                ? styles.blackBorder
                : styles.noBlackBorder
            }
          >
            <img
              src={src}
              alt=""
              placeholder={NoElement}
              className={styles.image}
              // onLoadStartCapture={() => {
              //   dispatch(addLoadingImage(code));
              // }}
              // onLoadStart={() => {
              //   dispatch(addLoadingImage(code));
              // }}
              onLoad={() => {
                dispatch(removeLoadingImage(code));
              }}
              // onLoadStart={() => {
              //   dispatch(addLoadingImage(code));
              // }}
            />
          </div>
        </div>
        <span className={styles.name}>
          {element ? element.name.split(" ")[0] : "Нет"}
        </span>
      </>
    ) : (
      <div className={styles.imageWrapper + " " + styles.noImageBorder}>
        <div className={styles.noBlackBorder}>
          <img src={NoElement} className={styles.noImage} alt="" />
        </div>
      </div>
    ))
  );

  // return (
  //   styles && (
  //     <>
  //       <div className={styles.imageWrapper}>
  //         <img src={src} alt="" className={className} placeholder={NoElement} />
  //       </div>
  //       <span className={styles.name}>
  //         {element ? element.name.split(" ")[0] : "Нет"}
  //       </span>
  //     </>
  //   )
  // );
}
