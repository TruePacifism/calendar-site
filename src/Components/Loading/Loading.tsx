import React from "react";
import styles from "./Loading.module.css";
import { ReactComponent as LoadingSpinner } from "../../images/in-yan-icon.svg";

type propsType = {
  isShowing: boolean;
  isRendering?: boolean;
};

export default function Loading({ isShowing, isRendering }: propsType) {
  return (
    isRendering && (
      <div className={isShowing ? styles.showed : styles.hidden}>
        <LoadingSpinner className={styles.icon} />
      </div>
    )
  );
}
