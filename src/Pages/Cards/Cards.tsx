import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Cards.module.css";
import FiltersList from "../../Components/FiltersList/FiltersList";

export default function Cards() {
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] =
    useState("all");
  return (
    <>
      <FiltersList
        onChange={(e) => {
          setFilter(e.target.value);
          console.log(filter);
        }}
      />
      <div className={styles.cardInfoContainer}>
        <div className={styles.sortingContainer}></div>
      </div>
    </>
  );
}
