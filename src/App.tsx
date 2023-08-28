import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Card from "./Pages/Card/Card";

function App() {
  return (
    <BrowserRouter basename="/calendar-site">
      <Header />
      <Routes>
        <Route Component={Calculator} path="/calculator" />
        <Route Component={Card} path="/card" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
