import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as BurgerIcon } from "../../images/burger-icon.svg";

export default function Header() {
  return (
    <div className={styles.container}>
      <BackIcon className={styles.backIcon} />
      <span className={styles.heading}>Калькулятор</span>
      <BurgerIcon className={styles.burgerIcon} />
    </div>
  );
}
