import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Loading.module.css";
import { ReactComponent as LoadingSpinner } from "../../images/logo-another-icon.svg";
import { useSelector } from "react-redux";
import { stateType } from "../../utils/types";

export default function Loading() {
  const isLoading = useSelector<stateType, boolean>((store) => store.isLoading);
  const [isRendering, setIsRendering]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(isLoading);
  const [renderTimeout, setRenderTimeout]: [
    NodeJS.Timeout,
    Dispatch<SetStateAction<NodeJS.Timeout>>
  ] = useState();
  useEffect(() => {
    if (isLoading) {
      setIsRendering(true);
      clearTimeout(renderTimeout);
    } else {
      clearTimeout(renderTimeout);
      setRenderTimeout(
        setTimeout(() => {
          setIsRendering(false);
        }, 1000)
      );
    }
    // eslint-disable-next-line
  }, [isLoading]);
  return (
    isRendering && (
      <div className={isLoading ? styles.showed : styles.hidden}>
        <LoadingSpinner className={styles.icon} />
      </div>
    )
  );
}
