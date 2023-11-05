import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./LoginPage.module.css";
import { FormGroup } from "@mui/material";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_eoV10ywFfBnJ3RsXSUAPd-IFZ6oboTY",
  authDomain: "ordinal-link-384308.firebaseapp.com",
  projectId: "ordinal-link-384308",
  storageBucket: "ordinal-link-384308.appspot.com",
  messagingSenderId: "482583813603",
  appId: "1:482583813603:web:5410c34d2792aafd9b14d6",
  measurementId: "G-JG92W452NB",
};

const app = firebase.initializeApp(firebaseConfig);

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // Вы успешно авторизовались через Google
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Обработка ошибок
      console.log(error);
    });
};

type propsType = {};

type viewType = "sign in" | "sign up";

export default function LoginPage({}: propsType) {
  const [view, setView]: [viewType, Dispatch<SetStateAction<viewType>>] =
    useState("sign up");
  return (
    <div>
      <h1>{view === "sign up" ? "Регистрация" : "Авторизация"}</h1>
      {view === "sign up" ? <FormGroup></FormGroup> : <FormGroup></FormGroup>}
    </div>
  );
}
