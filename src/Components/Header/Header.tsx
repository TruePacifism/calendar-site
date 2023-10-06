import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as BurgerIcon } from "../../images/burger-icon.svg";
import { ReactComponent as Logo } from "../../images/logo.svg";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  return (
    <div className={styles.container}>
      <BackIcon className={styles.backIcon} />
      {heading === "Мой феншуй" ? (
        <>
          <span className={styles.heading}>Мой</span>
          <Logo className={styles.centerIcon} />
          <span className={styles.heading}>феншуй</span>
        </>
      ) : (
        <span className={styles.heading}>{heading}</span>
      )}
      <BurgerIcon className={styles.burgerIcon} />
    </div>
  );
}
