import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./ModalFallingStars.module.css";
import { fallingStarType } from "../../../utils/types";
import ModalHeading from "../ModalHeading/ModalHeading";

type propsType = {
  fallingStars: fallingStarType[];
};

const getClassName = (year: number) => {
  switch (year) {
    case 1:
    case 6:
    case 8:
      return [styles.star, styles.white].join(" ");
    case 4:
      return [styles.star, styles.lightGreen].join(" ");
    case 5:
      return [styles.star, styles.yellow].join(" ");
    case 3:
      return [styles.star, styles.darkGreen].join(" ");
    case 9:
      return [styles.star, styles.purple].join(" ");
    case 7:
      return [styles.star, styles.red].join(" ");
    case 2:
      return [styles.star, styles.black].join(" ");
    default:
      break;
  }
};

export default function ModalFallingStars({ fallingStars }: propsType) {
  const [selectedStar, setSelectedStar]: [
    fallingStarType,
    Dispatch<SetStateAction<fallingStarType>>
  ] = useState(fallingStars[4]);
  console.log(selectedStar);

  return (
    <div className={styles.container}>
      <ModalHeading text="ЛЕТЯЩИЕ ЗВЕЗДЫ" />
      <div className={styles.starsContainer}>
        <span
          className={styles.starDirection}
          style={{ top: -5, left: -5, transform: "translate(-100%, -100%)" }}
        >
          ЮВ
        </span>
        <span
          className={styles.starDirection}
          style={{ top: -5, left: "50%", transform: "translate(-50%, -100%)" }}
        >
          ЮГ
        </span>
        <span
          className={styles.starDirection}
          style={{ top: -5, right: -5, transform: "translate(100%, -100%)" }}
        >
          ЮЗ
        </span>
        <span
          className={styles.starDirection}
          style={{ top: "50%", right: -5, transform: "translate(100%, -50%)" }}
        >
          ЗАПАД
        </span>
        <span
          className={styles.starDirection}
          style={{ bottom: -5, right: -5, transform: "translate(100%, 100%)" }}
        >
          СЗ
        </span>
        <span
          className={styles.starDirection}
          style={{
            bottom: -5,
            left: "50%",
            transform: "translate(-50%, 100%)",
          }}
        >
          СЕВЕР
        </span>
        <span
          className={styles.starDirection}
          style={{ bottom: -5, left: -5, transform: "translate(-100%, 100%)" }}
        >
          СВ
        </span>
        <span
          className={styles.starDirection}
          style={{ top: "50%", left: -5, transform: "translate(-100%, -50%)" }}
        >
          ВОСТОК
        </span>
        <ul className={styles.starsList}>
          {fallingStars.map((star, idx) => (
            <li
              className={getClassName(star.yearNumber)}
              onClick={() => {
                setSelectedStar((oldStar) => (oldStar === star ? null : star));
              }}
              key={idx}
            >
              <span className={styles.year}>{star.yearNumber}</span>
              <span className={styles.month}>
                {star.monthNumber === -1 ? "" : star.monthNumber}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.clickText}>
        Нажмите на звезду, чтобы посмотреть ее значение. Звезда дня не показана.
      </p>
      {selectedStar && (
        <div className={styles.selectedStarContainer}>
          <div className={styles.selectedStarMainInfoContainer}>
            <div className={getClassName(selectedStar.yearNumber)}>
              <span className={styles.year}>{selectedStar.yearNumber}</span>
              <span className={styles.month}>
                {selectedStar.monthNumber === -1
                  ? ""
                  : selectedStar.monthNumber}
              </span>
            </div>
            <p className={styles.starDescription}>
              <b>Звезда: {selectedStar.yearNumber}</b>
              <br />
              <b>Стихия: </b>
              {selectedStar.element.name}
              <br />
              <b>Сторона света: </b>
              {selectedStar.side.fullName.toLowerCase()}
            </p>
          </div>
          <div className={styles.selectedStarOtherInfo}>
            <div className={styles.selectedStarGoodsContainer}>
              <h4 className={styles.selectedStarGoodsHeading}>Благоприятно:</h4>
              <p className={styles.selectedStarGoodsText}>
                {selectedStar.goods.join(", ")}
              </p>
            </div>
            <div className={styles.selectedStarBadsContainer}>
              <h4 className={styles.selectedStarBadsHeading}>
                Неблагоприятно:
              </h4>
              <p className={styles.selectedStarBadsText}>
                {selectedStar.bads.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
