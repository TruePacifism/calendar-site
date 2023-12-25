import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./DaysLine.module.css";
import date from "date-and-time";
import { dateType, stateType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementMainPageDateAction,
  incrementMainPageDateAction,
} from "../../utils/store";
import { dateTypeToDate } from "../../utils/dateToDateType";

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
  const dispatch = useDispatch();
  const mainPageDate = useSelector<stateType, dateType>(
    (store) => store.mainPageInfo.birthdate
  );

  const [showingDate, setShowingDate]: [Date, Dispatch<SetStateAction<Date>>] =
    useState(dateTypeToDate(mainPageDate));
  useEffect(() => {
    setShowingDate(dateTypeToDate(mainPageDate));
  }, [mainPageDate]);

  const incrementDay = useCallback(() => {
    dispatch(incrementMainPageDateAction());
  }, [dispatch]);
  const decrementDay = useCallback(() => {
    dispatch(decrementMainPageDateAction());
  }, [dispatch]);

  return (
    <div className={styles.container}>
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
    </div>
  );
}
