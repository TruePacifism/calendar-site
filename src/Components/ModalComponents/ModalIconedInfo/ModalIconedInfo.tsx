import React from "react";
import styles from "./ModalIconedInfo.module.css";
import { cardInfoType } from "../../../utils/types";
import { ReactComponent as AgeIcon } from "../../../images/age-icon.svg";
import { ReactComponent as BirthSideIcon } from "../../../images/birth-side-icon.svg";
import { ReactComponent as GenderIcon } from "../../../images/gender-icon.svg";
import { ReactComponent as PowerIcon } from "../../../images/power-icon.svg";
import { ReactComponent as LivingsideIcon } from "../../../images/living-side-icon.svg";

type propsType = {
  cardInfo: cardInfoType;
};

export default function ModalIconedInfo({ cardInfo }: propsType) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <AgeIcon className={styles.icon} />
          <span className={styles.value}>39,10</span>
          <p className={styles.description}>Возраст: 39 лет и 10 месяцев</p>
        </li>
        <li className={styles.listItem}>
          <BirthSideIcon className={styles.icon} />
          <span className={styles.value}>39,10</span>
          <p className={styles.description}>Возраст: 39 лет и 10 месяцев</p>
        </li>
        <li className={styles.listItem}>
          <GenderIcon className={styles.icon} />
          <span className={styles.value}>39,10</span>
          <p className={styles.description}>Возраст: 39 лет и 10 месяцев</p>
        </li>
        <li className={styles.listItem}>
          <PowerIcon className={styles.icon} />
          <span className={styles.value}>39,10</span>
          <p className={styles.description}>Возраст: 39 лет и 10 месяцев</p>
        </li>
        <li className={styles.listItem}>
          <LivingsideIcon className={styles.icon} />
          <span className={styles.value}>39,10</span>
          <p className={styles.description}>Возраст: 39 лет и 10 месяцев</p>
        </li>
      </ul>
    </div>
  );
}
