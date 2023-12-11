import React from "react";
import styles from "./NameHeading.module.css";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";

export default function NameHeading() {
  return (
    <div className={styles.container}>
      <span className={styles.lastName}>Манькова</span>
      <LogoIcon className={styles.logo} />
      <span className={styles.firstName}>Виктория</span>
    </div>
  );
}
