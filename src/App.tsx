import React, { useEffect } from "react";
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
  closeModalAction,
  setLoadingActionSecond,
  setUserAction,
} from "./utils/store";
import getUserInfo from "./api/getUserInfo";
import { stateType, userType } from "./utils/types";
import Loading from "./Components/Loading/Loading";
import Page404 from "./Pages/404Page/404Page";
import MyModal from "./Components/MyModal/MyModal";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalContent = useSelector<stateType, JSX.Element>(
    (state) => state.modalContent
  );
  useEffect(() => {
    const handleBackPressed = (event: PopStateEvent) => {
      // Обработка нажатия кнопки "назад"
      event.preventDefault();
      if (modalContent) {
        window.history.pushState(null, "", window.location.href);
        dispatch(closeModalAction());
      }
      // Здесь можно добавить свою логику для обработки нажатия кнопки "назад"
    };

    window.addEventListener("popstate", handleBackPressed);
  }, [modalContent, dispatch]);
  useEffect(() => {
    console.log("Перенаправление");
    dispatch(setLoadingActionSecond());
  }, [location, dispatch]);
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
    <div className={styles.wrapper} id="app">
      <Loading />
      <MyModal />

      {(currentUser || !token) && (
        <div className={styles.container} id="container">
          <Header />
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
