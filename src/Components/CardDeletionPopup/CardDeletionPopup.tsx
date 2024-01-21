import React, { useCallback } from "react";
import styles from "./CardDeletionPopup.module.css";
import { cardInfoType, stateType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { Button, ThemeProvider } from "@mui/material";
import {
  closeModalAction,
  deleteCardAction,
  openModalAction,
} from "../../utils/store";
import deleteCard from "../../api/deleteCard";
import { delitionModalTheme } from "../../utils/muiThemes";

type propsType = {
  cardData: cardInfoType;
};

export default function CardDeletionPopup({ cardData }: propsType) {
  const dispatch = useDispatch();
  const token = useSelector<stateType, string>((store) => store.token);
  const handleCancel = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);
  const handleDeletionCard = useCallback(async () => {
    const { id } = cardData;
    const response = await deleteCard({ id, token });
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      dispatch(deleteCardAction(id));
      dispatch(
        openModalAction(
          <ThemeProvider theme={delitionModalTheme}>
            <div className={styles.modal}>
              <div className={styles.container}>
                <h1 className={styles.heading}>Карта удалена</h1>
              </div>
            </div>
          </ThemeProvider>
        )
      );
    } else {
      dispatch(
        openModalAction(
          <ThemeProvider theme={delitionModalTheme}>
            <div className={styles.modal}>
              <div className={styles.container}>
                <h1 className={styles.heading}>Не удалось удалить карту</h1>
                <div className={styles.buttonsContainer}>
                  <Button onClick={handleCancel}>ОК</Button>
                </div>
              </div>
            </div>
          </ThemeProvider>
        )
      );
    }
    setTimeout(() => {
      dispatch(closeModalAction());
    }, 2000);
  }, [cardData, dispatch, handleCancel, token]);

  return (
    <ThemeProvider theme={delitionModalTheme}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            {`Удалить карту ${cardData.birthdate.day}.${
              cardData.birthdate.month + 1
            }.${cardData.birthdate.year} ${cardData.name}?`}
          </h1>
          <div className={styles.buttonsContainer}>
            <Button onClick={handleDeletionCard}>УДАЛИТЬ</Button>
            <Button onClick={handleCancel}>ОТМЕНА</Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
