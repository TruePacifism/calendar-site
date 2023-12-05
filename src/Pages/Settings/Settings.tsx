import React, { useEffect } from "react";
import styles from "./Settings.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ThemeProvider,
} from "@mui/material";
import { settingsAccordionTheme } from "../../utils/muiThemes";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import { useDispatch } from "react-redux";
import { setLoadingAction } from "../../utils/store";

export default function SettingsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingAction({ from: "settings loaded", value: false }));
  }, [dispatch]);
  return (
    <>
      <ThemeProvider theme={settingsAccordionTheme}>
        <div className={styles.menuItemContainer}>
          <Accordion disableGutters>
            <AccordionSummary>Профиль</AccordionSummary>
            <AccordionDetails>
              <span
                style={{
                  backgroundColor: getColorByAnimalElement({
                    name: "Коза",
                    isBlack: false,
                    isGood: true,
                  }).mainHex,
                }}
                className={styles.profileInfo}
              >
                Виктория
                <br />
                19:29 24.10.2023
              </span>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.menuItemContainer}>
          <Accordion disableGutters>
            <AccordionSummary>Уведомления</AccordionSummary>
            <AccordionDetails>
              <span
                style={{
                  backgroundColor: getColorByAnimalElement({
                    name: "Коза",
                    isBlack: false,
                    isGood: true,
                  }).mainHex,
                }}
                className={styles.profileInfo}
              >
                Виктория
                <br />
                19:29 24.10.2023
              </span>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.menuItemContainer}>
          <Accordion disableGutters>
            <AccordionSummary>Цветовая схема</AccordionSummary>
            <AccordionDetails>
              <span
                style={{
                  backgroundColor: getColorByAnimalElement({
                    name: "Коза",
                    isBlack: false,
                    isGood: true,
                  }).mainHex,
                }}
                className={styles.profileInfo}
              >
                Виктория
                <br />
                19:29 24.10.2023
              </span>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.menuItemContainer}>
          <Accordion disableGutters>
            <AccordionSummary>Подписка</AccordionSummary>
            <AccordionDetails>
              <span
                style={{
                  backgroundColor: getColorByAnimalElement({
                    name: "Коза",
                    isBlack: false,
                    isGood: true,
                  }).mainHex,
                }}
                className={styles.profileInfo}
              >
                Виктория
                <br />
                19:29 24.10.2023
              </span>
            </AccordionDetails>
          </Accordion>
        </div>
      </ThemeProvider>
    </>
  );
}
