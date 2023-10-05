import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Card from "./Pages/Card/Card";
import MainPage from "./Pages/MainPage/MainPage";

const getHeadingText = (path: string): string => {
  switch (path) {
    case "/calculator":
      return "Калькулятор";
    case "/card":
      return "Карта";
    case "/":
      return "Мой феншуй";
    case "/calculator":
      return "Калькулятор";
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
        <Route Component={Card} path="/card" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
