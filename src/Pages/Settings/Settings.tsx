import React from "react";
import styles from "./Settings.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ThemeProvider,
} from "@mui/material";
import { settingsAccordionTheme } from "../../utils/muiThemes";
import getColorByAnimalElement from "../../utils/getColorByAnimal";

export default function Settings() {
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
                  }).hex,
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
                  }).hex,
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
                  }).hex,
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
                  }).hex,
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
