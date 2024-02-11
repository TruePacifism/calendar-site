import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Loading.module.css";
import { ReactComponent as LoadingSpinner } from "../../images/logo-another-icon.svg";
import { useSelector } from "react-redux";
import { stateType } from "../../utils/types";

export default function Loading() {
  const isLoading = useSelector<stateType, boolean>((store) => store.isLoading);
  const [stateIsLoading, setStateIsLoading]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  useEffect(() => {
    setStateIsLoading(true);
  }, [isLoading]);
  const [isRendering, setIsRendering]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  useEffect(() => {
    if (stateIsLoading) {
      setIsRendering(true);
      setTimeout(() => {
        setStateIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsRendering(false);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [stateIsLoading]);
  return (
    isRendering && (
      <div className={stateIsLoading ? styles.showed : styles.hidden}>
        <LoadingSpinner className={styles.icon} />
      </div>
    )
  );
}
