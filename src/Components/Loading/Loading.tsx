import React from "react";
import styles from "./Loading.module.css";
import { ReactComponent as LoadingSpinner } from "../../images/logo-another-icon.svg";
import { useSelector } from "react-redux";
import { stateType } from "../../utils/types";

export default function Loading() {
  const { isLoading } = useSelector<stateType, stateType>((store) => store);
  //useEffect(() => {
    // if (isLoading) {
    //   setIsRendering(true);
    // } else {
    //   setTimeout(() => {
    //     setIsRendering(false);
    //   }, 1000);
    // }
  //}, [isLoading]);
  return (
      <div className={isLoading ? styles.showed : styles.hidden}>
        <LoadingSpinner className={styles.icon} />
      </div>
  );
}
