import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";
import { ReactComponent as InfoIcon } from "../../images/info-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { searchModalTheme } from "../../utils/muiThemes";
import { Dialog, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../utils/types";
import { closeModalAction, openModalAction } from "../../utils/store";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  const dispatch = useDispatch();
  const [isSearching, setIsSearching]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
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
        <ThemeProvider theme={searchModalTheme}>
          <Dialog
            style={{ backgroundColor: "transparent !important" }}
            open={isSearching}
            onClose={closeModal}
          >
            <div className={styles.modalContainer}>
              <InfoIcon className={styles.searchModalIcon} />
              <Input />
            </div>
          </Dialog>
        </ThemeProvider>
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
