import React, { useCallback, useRef } from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";
import { ReactComponent as InfoIcon } from "../../images/info-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../utils/types";
import { closeModalAction, openModalAction } from "../../utils/store";
import { ReactComponent as TopHeading } from "../../images/ВИКТОРИЯ МАНЬКОВА.svg";
import { ReactComponent as BottomHeading } from "../../images/СИСТЕМА.svg";
import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "../../utils/muiThemes";
import { Button } from "@mui/material";
import ServiceInfo from "../ServiceInfo/ServiceInfo";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  const dispatch = useDispatch();
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  const infoRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line
  const closeModal = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);
  const openInfoModal = useCallback(() => {
    const infoBounds = infoRef.current.getBoundingClientRect();
    dispatch(
      openModalAction(
        <>
          <InfoIcon
            className={styles.backIcon}
            style={{
              position: "absolute",
              top: infoBounds.top,
              left: infoBounds.left,
            }}
          />
          <div className={styles.modalContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.modalText}>
                В калькуляторе необходимо заполнить всю информацию. Чем
                подробнее данные, тем более точные рассчеты вы получите. <br />
                <br /> Однако, можно рассчитать и с неполными данными.
                Минимально - год рождения.
                <br />
                <br /> Для рассчета часа рождения необходимо указать место и
                время рождения.
              </p>
              <ThemeProvider theme={mainTheme}>
                <Button className={styles.modalButton} onClick={closeModal}>
                  НАЗАД
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </>
      )
    );
  }, [dispatch, closeModal]);
  const openServiceModal = useCallback(() => {
    const headingBounds = headingRef.current.getBoundingClientRect();
    dispatch(
      openModalAction(
        <>
          <div
            className={styles.heading}
            style={{
              position: "absolute",
              top: headingBounds.top,
              left: headingBounds.left,
            }}
          >
            <TopHeading className={styles.topHeading} />
            <BottomHeading />
          </div>
          <div className={styles.modalContainer}>
            <ServiceInfo />
          </div>
        </>
      )
    );
  }, [dispatch]);
  const location = useLocation();
  return (
    !isErrorPage && (
      <>
        <div className={styles.container}>
          {heading === "СИСТЕМА ФЕНШУЙ" ? (
            <InfoIcon
              ref={infoRef}
              className={styles.backIcon}
              onClick={openInfoModal}
            />
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
          <div
            ref={headingRef}
            className={styles.heading}
            onClick={openServiceModal}
          >
            <TopHeading className={styles.topHeading} />
            <BottomHeading />
          </div>
          <LogoIcon className={styles.logoIcon} />
        </div>
      </>
    )
  );
}
