import React from "react";
import styles from "./DaysLine.module.css";

export default function DaysLine() {
  return (
    <ul className={styles.container}>
      <li className={styles.dayItem}>
        <span className={styles.date}>29.10.2023</span>
        <span className={styles.dayOfWeek}>Суббота</span>
      </li>
      <li className={`${styles.dayItem} ${styles.currentDayItem}`}>
        <span className={styles.date}>30.10.2023</span>
        <span className={styles.dayOfWeek}>Воскресенье</span>
      </li>
      <li className={styles.dayItem}>
        <span className={styles.date}>31.10.2023</span>
        <span className={styles.dayOfWeek}>Понедельник</span>
      </li>
    </ul>
  );
}
