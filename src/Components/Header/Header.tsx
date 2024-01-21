import React, { useCallback, useRef } from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as OptionsIcon } from "../../images/options-icon.svg";
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
  const location = useLocation();
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  const infoRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line
  const closeModal = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);
  const getInfoText = useCallback<
    () => React.ReactElement<HTMLParagraphElement>
  >(() => {
    switch (location.pathname) {
      case "/calculator":
        return (
          <p className={styles.modalText}>
            В калькуляторе необходимо заполнить всю информацию. Чем подробнее
            данные, тем более точные рассчеты вы получите. <br />
            <br /> Однако, можно рассчитать и с неполными данными. Минимально -
            год рождения.
            <br />
            <br /> Для рассчета часа рождения необходимо указать место и время
            рождения.
          </p>
        );
      case "/":
      case "/cards":
        return (
          <p className={styles.modalText}>
            Здесь Вы найдете все Ваши сохраненные карты. Их можно сортировать по
            новизне, переключать вид. Работает поиск по ФИО или дате.
          </p>
        );

      default:
        return (
          <p className={styles.modalText}>
            Нажмите на любой раздел страницы, чтобы посмотреть подробнее
          </p>
        );
    }
  }, [location.pathname]);

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
              left:
                window.innerWidth > 400
                  ? infoBounds.left - (window.innerWidth - 400) / 2
                  : infoBounds.left,
            }}
          />
          <div className={styles.modalContainer}>
            <div className={styles.infoContainer}>{getInfoText()}</div>
          </div>
        </>
      )
    );
  }, [dispatch, closeModal, getInfoText]);
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
              left:
                window.innerWidth > 400
                  ? headingBounds.left - (window.innerWidth - 400) / 2
                  : headingBounds.left,
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
          <OptionsIcon className={styles.logoIcon} />
        </div>
      </>
    )
  );
}
