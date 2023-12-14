import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Cards from "./Pages/Cards/Cards";
import SettingsPage from "./Pages/Settings/Settings";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoadingImages,
  setLoadingAction,
  setUserAction,
} from "./utils/store";
import getUserInfo from "./api/getUserInfo";
import { stateType, userType } from "./utils/types";
import Loading from "./Components/Loading/Loading";
import Page404 from "./Pages/404Page/404Page";

const getHeadingText = (path: string): string => {
  switch (path) {
    case "/calculator":
      return "Калькулятор";
    case "/card":
      return "Карта";
    case "/cards":
      return "Картотека";
    default:
      return "СИСТЕМА ФЕНШУЙ";
  }
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerText, setHeaderText]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState();
  useEffect(() => {
    console.log("Перенаправление");
    const actualHeadingText = getHeadingText(location.pathname);
    dispatch(clearLoadingImages());

    if (
      location.pathname !== "/calculator" &&
      headerText !== actualHeadingText
    ) {
      dispatch(setLoadingAction({ from: "Перенаправление", value: true }));
    }
    if (headerText !== actualHeadingText) {
      setHeaderText(actualHeadingText);
    } else {
    }
  }, [location, dispatch, headerText]);
  const currentUser: userType = useSelector<stateType, userType>(
    (store) => store.user
  );
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const user = await getUserInfo({ token });
      if (!user) {
        navigate("/login");
        localStorage.removeItem("token");
        return;
      }
      dispatch(setUserAction(user));
    };
    fetchUser();
  }, [dispatch, navigate]);

  return (
    <div className={styles.wrapper}>
      <Loading />

      {(currentUser || !token) && (
        <div className={styles.container}>
          <Header heading={headerText} />
          <Routes>
            <Route Component={MainPage} path="/" />
            <Route Component={Calculator} path="/calculator" />
            <Route Component={Cards} path="/cards" />
            <Route Component={SettingsPage} path="/settings" />
            <Route Component={LoginPage} path="/login" />
            <Route Component={Page404} path="*" />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
