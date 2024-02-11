import React, { useEffect } from "react";
import styles from "./404Page.module.css";
import { useDispatch } from "react-redux";
import { setIsErrorPageAction } from "../../utils/store";
import { Button, ThemeProvider } from "@mui/material";
import { mainTheme } from "../../utils/muiThemes";
import { useNavigate } from "react-router-dom";
import NameHeading from "../../Components/NameHeading/NameHeading";

export default function Page404() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setIsErrorPageAction(true));
    return () => {
      dispatch(setIsErrorPageAction(false));
    };
  }, [dispatch]);
  const fetchReturnButton = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>СИСТЕМА ФЕНШУЙ</h1>
      <NameHeading />
      <h2 className={styles.error}>404</h2>
      <h2 className={styles.description}>Страница не найдена</h2>
      <ThemeProvider theme={mainTheme}>
        <Button onClick={fetchReturnButton} className={styles.button}>
          На главную
        </Button>
      </ThemeProvider>
    </div>
  );
}
