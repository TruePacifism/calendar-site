import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./DaysLine.module.css";
import date from "date-and-time";
import { ReactComponent as ArrowLeft } from "../../images/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../images/arrow-right.svg";

const getStringDate = (objectDate: Date) => {
  return date.format(objectDate, "DD.MM.YYYY");
};
const getDayOfWeek = (objectDate: Date) => {
  const dayOfWeek = date.format(objectDate, "dddd");
  switch (dayOfWeek) {
    case "Monday":
      return "Понедельник";
    case "Tuesday":
      return "Вторник";
    case "Wednesday":
      return "Среда";
    case "Thursday":
      return "Четверг";
    case "Friday":
      return "Пятница";
    case "Saturday":
      return "Суббота";
    case "Sunday":
      return "Воскресенье";
    default:
      return "День недели не определен";
  }
};

type propsType = {
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function DaysLine({ onDecrement, onIncrement }: propsType) {
  const [showingDate, setShowingDate]: [Date, Dispatch<SetStateAction<Date>>] =
    useState(new Date());

  const incrementDay = () => {
    onIncrement();
    setShowingDate((currentDate) => date.addDays(currentDate, 1));
  };
  const decrementDay = () => {
    onDecrement();
    setShowingDate((currentDate) => date.addDays(currentDate, -1));
  };

  return (
    <div className={styles.container}>
      <ArrowLeft className={styles.arrow} onClick={decrementDay} />
      <ul className={styles.daysContainer}>
        <li className={styles.dayItem} onClick={decrementDay}>
          <span className={styles.date}>
            {getStringDate(date.addDays(showingDate, -1))}
          </span>
          <span className={styles.dayOfWeek}>
            {getDayOfWeek(date.addDays(showingDate, -1))}
          </span>
        </li>
        <li className={`${styles.dayItem} ${styles.currentDayItem}`}>
          <span className={styles.date}>{getStringDate(showingDate)}</span>
          <span className={styles.dayOfWeek}>{getDayOfWeek(showingDate)}</span>
        </li>
        <li className={styles.dayItem} onClick={incrementDay}>
          <span className={styles.date}>
            {getStringDate(date.addDays(showingDate, 1))}
          </span>
          <span className={styles.dayOfWeek}>
            {getDayOfWeek(date.addDays(showingDate, 1))}
          </span>
        </li>
      </ul>
      <ArrowRight className={styles.arrow} onClick={incrementDay} />
    </div>
  );
}
