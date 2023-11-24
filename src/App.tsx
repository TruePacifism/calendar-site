import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Cards from "./Pages/Cards/Cards";
import Settings from "./Pages/Settings/Settings";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "./utils/store";
import getUserInfo from "./api/getUserInfo";
import { stateType, userType } from "./utils/types";
import Loading from "./Components/Loading/Loading";

const getHeadingText = (path: string): string => {
  switch (path) {
    case "/calculator":
      return "Калькулятор";
    case "/card":
      return "Карта";
    case "/":
      return "Мой феншуй";
    case "/cards":
      return "Картотека";
    default:
      return "Калькулятор";
  }
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [headerText, setHeaderText]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState();
  useEffect(() => {
    const actualHeadingText = getHeadingText(location.pathname);
    setHeaderText(actualHeadingText);
  }, [location]);
  const [isLoading, setIsLoading]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const [isLoadingRendering, setIsLoadingRendering]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const dispatch = useDispatch();
  const currentUser: userType = useSelector<stateType, userType>(
    (store) => store.user
  );
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        setIsLoading(false);
        return;
      }
      const user = await getUserInfo({ token });
      console.log(user);
      if (!user) {
        navigate("/login");
        localStorage.removeItem("token");
        setIsLoading(false);
        return;
      }
      dispatch(setUserAction(user));
      setIsLoading(false);
      setTimeout(() => {
        setIsLoadingRendering(false);
      }, 1000);
    };
    fetchUser();
  }, [dispatch, navigate]);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Loading isShowing={isLoading} isRendering={isLoadingRendering} />

      {!isLoading && (
        <>
          <Header heading={headerText} />
          <Routes>
            <Route Component={MainPage} path="/" />
            <Route Component={Calculator} path="/calculator" />
            <Route Component={Cards} path="/cards" />
            <Route Component={Settings} path="/settings" />
            <Route Component={LoginPage} path="/login" />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
