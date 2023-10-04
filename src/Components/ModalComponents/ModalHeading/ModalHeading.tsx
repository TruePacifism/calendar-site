import React from "react";
import styles from "./ModalHeading.module.css";

type propsType = {
  text: string;
};

export default function ModalHeading({ text }: propsType) {
  return <h2 className={styles.heading}>{text}</h2>;
}
