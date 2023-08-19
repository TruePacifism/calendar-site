import React from "react";
import styles from "./CardInfo.module.css";

export default function CardInfo(): React.JSX.Element {
  return (
    <>
      <div className={styles.nameContainer}>
        <span className={styles.name}>Виктория</span>
      </div>
      <div className={styles.iconsInfoContainer}></div>
    </>
  );
}
