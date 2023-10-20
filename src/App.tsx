import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Cards from "./Pages/Cards/Cards";
import Settings from "./Pages/Settings/Settings";

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
    console.log(location.pathname);
    const actualHeadingText = getHeadingText(location.pathname);
    setHeaderText(actualHeadingText);
  }, [location]);
  return (
    <>
      <Header heading={headerText} />
      <Routes>
        <Route Component={MainPage} path="/" />
        <Route Component={Calculator} path="/calculator" />
        <Route Component={Cards} path="/cards" />
        <Route Component={Settings} path="/settings" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
