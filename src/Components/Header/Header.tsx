import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";
import { ReactComponent as InfoIcon } from "../../images/info-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../utils/types";
import { closeModalAction, openModalAction } from "../../utils/store";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  const dispatch = useDispatch();
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  // eslint-disable-next-line
  const closeModal = () => {
    dispatch(closeModalAction());
  };
  const openModal = () => {
    dispatch(
      openModalAction(
        <div>
          <h1>Это модальное окно</h1>
        </div>
      )
    );
  };
  const location = useLocation();
  return (
    !isErrorPage && (
      <>
        <div className={styles.container}>
          {heading === "СИСТЕМА ФЕНШУЙ" ? (
            <InfoIcon className={styles.backIcon} onClick={openModal} />
          ) : (
            <Link
              to={
                location.pathname === "/calculator" && location.search
                  ? "/calculator"
                  : "/"
              }
            >
              <BackIcon className={styles.backIcon} />
            </Link>
          )}
          <span className={styles.heading}>{heading}</span>
          <LogoIcon className={styles.logoIcon} />
        </div>
      </>
    )
  );
}
