import React from "react";
import styles from "./ElementsExamples.module.css";
import goodElementExampleSrc from "../../images/animals/bull-gn.jpg";
import badElementExampleSrc from "../../images/animals/bull-bn.jpg";
import goodBlackElementExampleSrc from "../../images/animals/bull-gb.jpg";
import badBlackElementExampleSrc from "../../images/animals/bull-bb.png";

export default function ElementsExamples() {
  return (
    <>
      <div className={styles.container}>
        <img className={styles.image} src={goodElementExampleSrc} alt="" />
        <span className={styles.text}>Полезные элементы</span>
      </div>
      <div className={styles.container}>
        <img className={styles.image} src={badElementExampleSrc} alt="" />
        <span className={styles.text}>Неполезные элементы</span>
      </div>
      <div className={styles.container}>
        <div className={styles.blackContainer}>
          <img
            className={styles.image}
            src={goodBlackElementExampleSrc}
            alt=""
          />
          <img
            className={styles.image}
            src={badBlackElementExampleSrc}
            alt=""
          />
        </div>
        <span className={styles.text}>Опасные элементы</span>
      </div>
    </>
  );
}
