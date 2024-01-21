import React from "react";
import styles from "./ElementsExamples.module.css";
import AnimalPic from "../AnimalElementPic/AnimalPic";

export default function ElementsExamples() {
  return (
    <>
      <div className={styles.container}>
        <AnimalPic
          animal={{
            name: "Бык",
            isBlack: false,
            isGood: true,
          }}
          doneFor="Examples"
        />
        <span className={styles.text}>Полезные элементы</span>
      </div>
      <div className={styles.container}>
        <AnimalPic
          animal={{
            name: "Бык",
            isBlack: false,
            isGood: false,
          }}
          doneFor="Examples"
        />
        <span className={styles.text}>Неполезные элементы</span>
      </div>
      <div className={styles.container}>
        <div className={styles.blackContainer}>
          <AnimalPic
            animal={{
              name: "Бык",
              isBlack: true,
              isGood: true,
            }}
            doneFor="Examples"
          />
          <AnimalPic
            animal={{
              name: "Бык",
              isBlack: true,
              isGood: false,
            }}
            doneFor="Examples"
          />
        </div>
        <span className={styles.text}>Опасные элементы</span>
      </div>
    </>
  );
}
