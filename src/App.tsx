import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Calculator from "./Pages/Calculator/Calculator";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="">
      <Header />
      <Routes>
        <Route Component={Calculator} path="/" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
