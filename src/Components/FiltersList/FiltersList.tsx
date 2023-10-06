import React from "react";
import styles from "./FiltersList.module.css";
import CustomCheckBoxGroup, { checkboxInfoType } from "../CustomCheckBoxGroup";
import { ReactComponent as AddIcon } from "../../images/add-icon.svg";

const checkboxesInfo: checkboxInfoType[] = [
  {
    title: "ВСЕ",
    value: "all",
  },
  {
    title: "ИЗБРАННОЕ",
    value: "favourites",
  },
  {
    title: "СЕМЬЯ",
    value: "family",
  },
  {
    title: "ПОЛЬЗОВАТЕЛИ",
    value: "unknown",
  },
];

type propsType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

export default function FiltersList({ onChange }: propsType) {
  return (
    <div className={styles.container}>
      <div className={styles.checkBoxes}>
        <CustomCheckBoxGroup
          className={styles.checkBoxes}
          checkboxesInfo={checkboxesInfo}
          onChange={onChange}
        />
      </div>
      <div className={styles.iconContainer}>
        <AddIcon className={styles.icon} />
      </div>
    </div>
  );
}
