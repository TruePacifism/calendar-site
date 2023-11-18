import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Cards from "./Pages/Cards/Cards";
import Settings from "./Pages/Settings/Settings";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction, store } from "./utils/store";
import getUserInfo from "./api/getUserInfo";
import {
  cardInfoType,
  inputDataType,
  stateType,
  userType,
} from "./utils/types";
import Loading from "./Components/Loading/Loading";
import countCard from "./api/countCard";

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
  const dispatch = useDispatch();
  const currentUser = useSelector<stateType, userType>((store) => store.user);
  useEffect(() => {
    const fetchUser = async () => {
      console.log("userBefore", currentUser);

      const token = localStorage.getItem("token");
      const user = await getUserInfo({ token });
      const fullCards = await Promise.all(
        user.cards.map((card: inputDataType) => countCard({ inputData: card }))
      );
      user.cards = fullCards;
      dispatch(setUserAction(user));
      console.log("userAfter", currentUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Loading isShowing={isLoading} />

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
