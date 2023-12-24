import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import styles from "./CardOptionsItem.module.css";

type propsType = {
  title: string;
  onClick: () => void;
};

const CardOptionsItem = (
  { title, onClick }: propsType,
  ref: React.LegacyRef<HTMLLIElement>
) => {
  const [isOpened, setIsOpened]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  return (
    <li
      ref={ref}
      className={
        styles.container + " " + (isOpened ? styles.opened : styles.notOpened)
      }
      onClick={() => {
        setIsOpened((lastOpened) => {
          return !lastOpened;
        });
        onClick();
      }}
    >
      <span className={styles.title}>{title}</span>
    </li>
  );
};

export default forwardRef(CardOptionsItem);
