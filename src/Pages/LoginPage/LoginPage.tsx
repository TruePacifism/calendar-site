import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import signUp from "../../api/signUp";
import { userInput } from "../../utils/types";

const firebaseConfig = {
  apiKey: "AIzaSyB_eoV10ywFfBnJ3RsXSUAPd-IFZ6oboTY",
  authDomain: "ordinal-link-384308.firebaseapp.com",
  projectId: "ordinal-link-384308",
  storageBucket: "ordinal-link-384308.appspot.com",
  messagingSenderId: "482583813603",
  appId: "1:482583813603:web:5410c34d2792aafd9b14d6",
  measurementId: "G-JG92W452NB",
};
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();
auth.languageCode = "ru";

type propsType = {};

export default function LoginPage(props: propsType) {
  const [token, setToken]: [string, Dispatch<SetStateAction<string>>] =
    useState();
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const googleSignIn = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const token: string = result.user.uid;
      console.log(result);

      const user: userInput = {
        token: token,
        name: result.user.displayName,
        mail: result.user.email,
      };
      if (result.operationType === "signIn") {
        const verifiedToken = await signUp({ user });
        setToken(token);
        console.log(verifiedToken);
      } else {
        const token = await signUp({ user });
        setToken(token);
        console.log(token);
      }
    });
  };
  const googleLogOut = () => {
    signOut(auth).then((result) => {
      setToken("");
      console.log("Выход успешен");
    });
  };

  return (
    <div>
      <h1 className={styles.heading}>"Регистрация / Авторизация"</h1>
      {token ? (
        <button onClick={googleLogOut}>Выйти</button>
      ) : (
        <button className={styles.button} onClick={googleSignIn}>
          Войти
        </button>
      )}
    </div>
  );
}
