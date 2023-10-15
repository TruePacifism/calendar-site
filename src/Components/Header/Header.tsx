import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as BurgerIcon } from "../../images/burger-icon.svg";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as SearchIcon } from "../../images/search-header-icon.svg";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { searchModalTheme } from "../../utils/muiThemes";
import { Dialog, Input } from "@mui/material";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  const [isSearching, setIsSearching]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const closeModal = () => {
    setIsSearching(false);
  };
  const openModal = () => {
    setIsSearching(true);
  };
  return (
    <>
      <ThemeProvider theme={searchModalTheme}>
        <Dialog
          style={{ backgroundColor: "transparent !important" }}
          open={isSearching}
          onClose={closeModal}
        >
          <div className={styles.modalContainer}>
            <SearchIcon className={styles.searchModalIcon} />
            <Input />
          </div>
        </Dialog>
      </ThemeProvider>
      <div className={styles.container}>
        {heading === "Мой феншуй" ? (
          <SearchIcon className={styles.backIcon} onClick={openModal} />
        ) : (
          <Link to={"/"}>
            <BackIcon className={styles.backIcon} />
          </Link>
        )}
        {heading === "Мой феншуй" ? (
          <>
            <span className={styles.heading}>Мой</span>
            <Logo className={styles.centerIcon} />
            <span className={styles.heading}>феншуй</span>
          </>
        ) : (
          <span className={styles.heading}>{heading}</span>
        )}
        <BurgerIcon className={styles.burgerIcon} />
      </div>
    </>
  );
}
