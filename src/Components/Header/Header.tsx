import React, { useCallback, useRef } from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as OptionsIcon } from "../../images/options-icon.svg";
import { ReactComponent as InfoIcon } from "../../images/info-icon.svg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../utils/types";
import { openModalAction } from "../../utils/store";
import ServiceInfo from "../ServiceInfo/ServiceInfo";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";

type propsType = {
  heading: string;
};

export default function Header({ heading }: propsType) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  const params = useSearchParams()[0];
  const infoRef = useRef<SVGSVGElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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
        return (
          <p className={styles.modalText}>
            Нажмите на любой раздел страницы, чтобы посмотреть подробнее
          </p>
        );
      case "/cards":
        if (params.size === 0) {
          return (
            <p className={styles.modalText}>
              Здесь Вы найдете все Ваши сохраненные карты. Их можно сортировать
              по новизне, переключать вид. Работает поиск по ФИО или дате.
            </p>
          );
        } else {
          return (
            <p className={styles.modalText}>
              Нажмите на любой раздел, чтобы увеличить и увидеть дополнительную
              информацию
            </p>
          );
        }

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
  }, [dispatch, getInfoText]);
  const openServiceModal = useCallback(() => {
    const headingBounds = headingRef.current.getBoundingClientRect();
    dispatch(
      openModalAction(
        <>
          <div
            className={styles.companyContainer}
            style={{
              position: "absolute",
              top: headingBounds.top,
              left:
                window.innerWidth > 400
                  ? headingBounds.left - (window.innerWidth - 400) / 2
                  : headingBounds.left,
            }}
          >
            <LogoIcon className={styles.logo} />
            <div className={styles.nameContainer}>
              <span className={styles.name}>виктория манькова</span>
              <span className={styles.title}>система</span>
            </div>
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
            className={styles.companyContainer}
            onClick={openServiceModal}
          >
            <LogoIcon className={styles.logo} />
            <div className={styles.nameContainer}>
              <span className={styles.name}>виктория манькова</span>
              <span className={styles.title}>система</span>
            </div>
          </div>
          <OptionsIcon className={styles.logoIcon} />
        </div>
      </>
    )
  );
}
