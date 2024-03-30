import React, { useCallback, useMemo, useRef } from "react";
import styles from "./Header.module.css";
import { ReactComponent as OptionsIcon } from "../../images/options-icon.svg";
import { ReactComponent as InfoIcon } from "../../images/info-icon.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stateType, userType } from "../../utils/types";
import { closeModalAction, openModalAction } from "../../utils/store";
import ServiceInfo from "../ServiceInfo/ServiceInfo";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";
import { ReactComponent as LogOutIcon } from "../../images/log-out-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { Button, ThemeProvider } from "@mui/material";
import { darkButtonTheme } from "../../utils/muiThemes";
import deleteUser from "../../api/deleteUser";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  const navigate = useNavigate();
  const user = useSelector<stateType, userType>((state) => state.user);
  const userMail = useMemo(() => (user ? user.mail : ""), [user]);
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
            год рождения и пол.
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
  }, [location.pathname, params.size]);

  const openInfoModal = useCallback(() => {
    const infoBounds = infoRef.current.getBoundingClientRect();
    dispatch(
      openModalAction(
        <>
          <InfoIcon
            className={styles.backIcon}
            style={{
              position: "absolute",
              top: infoBounds.top - 55,
              left:
                window.innerWidth > 400
                  ? infoBounds.left - (window.innerWidth - 400) / 2
                  : infoBounds.left,
            }}
          />
          <div className={styles.infoContainer}>{getInfoText()}</div>
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
              top: headingBounds.top - 55,
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
          <ServiceInfo />
        </>
      )
    );
  }, [dispatch]);
  const openWarningModal = (message: "delete" | "logout") => {
    dispatch(
      openModalAction(
        <div className={styles.warningContainer}>
          <p className={styles.warningText}>
            {message === "delete"
              ? "Все Ваши данные, в том числе все сохраненные карты, будут удалены, это нельзя будет отменить. Вы действительно хотите удалить свой аккаунт с этого сайта?"
              : "Все Ваши данные будут сохранены на сайте. Вам потребуется выполнить вход через гугл-аккаунт снова. Вы действительно хотите выйти?"}
          </p>
          <div className={styles.warningButtonsContainer}>
            <ThemeProvider theme={darkButtonTheme}>
              <Button
                onClick={
                  message === "logout"
                    ? () => {
                        localStorage.removeItem("token");
                        dispatch(closeModalAction());
                        navigate("/login");
                      }
                    : async () => {
                        await deleteUser({
                          token: localStorage.getItem("token"),
                        });
                        dispatch(closeModalAction());
                        navigate("/login");
                      }
                }
              >
                Да
              </Button>
              <Button
                onClick={() => {
                  dispatch(closeModalAction());
                }}
              >
                Нет
              </Button>
            </ThemeProvider>
          </div>
        </div>
      )
    );
  };
  const openOptionsModal = () => {
    dispatch(
      openModalAction(
        <div className={styles.optionsContainer}>
          <ul className={styles.optionsList}>
            <li
              className={styles.optionsItem}
              onClick={() => {
                openWarningModal("logout");
              }}
            >
              <LogOutIcon className={styles.logOutIcon} />
              <span className={styles.optionsText}>
                Выйти из аккаунта
                <br />
                {userMail}
              </span>
            </li>
            <li
              className={styles.optionsItem}
              onClick={() => {
                openWarningModal("delete");
              }}
            >
              <DeleteIcon className={styles.deleteIcon} />
              <span className={styles.optionsText}>
                Удалить аккаунт
                <br />
                {userMail}
              </span>
            </li>
          </ul>
        </div>
      )
    );
  };
  return (
    !isErrorPage && (
      <>
        <div className={styles.container}>
          <InfoIcon
            ref={infoRef}
            className={styles.backIcon}
            onClick={openInfoModal}
          />
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
          <OptionsIcon onClick={openOptionsModal} className={styles.logoIcon} />
        </div>
      </>
    )
  );
}
