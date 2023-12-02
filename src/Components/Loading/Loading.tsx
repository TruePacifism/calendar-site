import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./Loading.module.css";
import { ReactComponent as LoadingSpinner } from "../../images/logo-another-icon.svg";
import { useSelector } from "react-redux";
import { stateType } from "../../utils/types";

export default function Loading() {
  const { isLoading } = useSelector<stateType, stateType>((store) => store);
  const [isRendering, setIsRendering]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  useEffect(() => {
    // if (isLoading) {
    //   setIsRendering(true);
    // } else {
    //   setTimeout(() => {
    //     setIsRendering(false);
    //   }, 1000);
    // }
  }, [isLoading]);
  return (
    isRendering && (
      <div className={isLoading ? styles.showed : styles.hidden}>
        <LoadingSpinner className={styles.icon} />
      </div>
    )
  );
}
