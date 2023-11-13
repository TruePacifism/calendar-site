import React from "react";
import styles from "./DaysLine.module.css";
import date from "date-and-time";

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

export default function DaysLine() {
  const now = new Date();

  return (
    <ul className={styles.container}>
      <li className={styles.dayItem}>
        <span className={styles.date}>
          {getStringDate(date.addDays(now, -1))}
        </span>
        <span className={styles.dayOfWeek}>
          {getDayOfWeek(date.addDays(now, -1))}
        </span>
      </li>
      <li className={`${styles.dayItem} ${styles.currentDayItem}`}>
        <span className={styles.date}>{getStringDate(now)}</span>
        <span className={styles.dayOfWeek}>{getDayOfWeek(now)}</span>
      </li>
      <li className={styles.dayItem}>
        <span className={styles.date}>
          {getStringDate(date.addDays(now, 1))}
        </span>
        <span className={styles.dayOfWeek}>
          {getDayOfWeek(date.addDays(now, 1))}
        </span>
      </li>
    </ul>
  );
}
