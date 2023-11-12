import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ReactComponent as GoogleIcon } from "../../images/in-yan-icon.svg";
import { userInput } from "../../utils/types";
import {
  Button,
  Input,
  ThemeProvider,
} from "@mui/material";
import { mainTheme } from "../../utils/muiThemes";
import CityInput from "../../Components/CityInput/CityInput";
import authUser from "../../api/authUser";
import { useNavigate } from "react-router-dom";

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

type userInfoType = {
  token: string;
  name: string;
  mail: string;
  livingcity: string;
  birthcity: string;
};

export default function LoginPage(props: propsType) {
  const navigate = useNavigate();
  const [token, setToken]: [string, Dispatch<SetStateAction<string>>] =
    useState();
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const [userInfo, setUserInfo]: [
    userInfoType,
    Dispatch<SetStateAction<userInfoType>>
  ] = useState();
  const googleSignIn = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const token: string = result.user.uid;
      console.log(result);

      const user: userInput = {
        token: token,
        name: result.user.displayName,
        mail: result.user.email,
      };
      setUserInfo({
        ...user,
        livingcity: "",
        birthcity: "",
      });
    });
  };
  const fetchUser = async (user: userInfoType) => {
    const token = await authUser({ user });
    console.log(token);
    localStorage.setItem("token", token);
    navigate("/");
  };
  const googleLogOut = () => {
    signOut(auth).then((result) => {
      console.log(result);
      setToken("");
      setUserInfo(null);
      console.log("Выход успешен");
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Регистрация / Авторизация</h1>
      {userInfo ? (
        <ThemeProvider theme={mainTheme}>
          <form
            onSubmit={(
              e: React.FormEvent<HTMLFormElement> & {
                target: {
                  elements?: {
                    name: {
                      value: string;
                    };
                    mail: {
                      value: string;
                    };
                    birthcity: {
                      value: string;
                    };
                    livingcity: {
                      value: string;
                    };
                  };
                };
              }
            ) => {
              e.preventDefault();
              const { name, livingcity, birthcity } = e.target.elements;
              console.dir(e.target.elements);
              const user: userInfoType = {
                ...userInfo,
                name: name.value,
                livingcity: livingcity.value,
                birthcity: birthcity.value,
              };
              fetchUser(user);
            }}
          >
            <label className={styles.formFieldContainer}>
              <span className={styles.label}>Имя</span>
              <Input
                disableUnderline
                type="text"
                name="name"
                defaultValue={userInfo.name}
                placeholder="имя"
              />
            </label>
            <label className={styles.formFieldContainer}>
              <span className={styles.label}>Почта</span>
              <Input
                disabled
                disableUnderline
                type="email"
                name="mail"
                defaultValue={userInfo.mail}
                placeholder="почта"
              />
            </label>
            <CityInput
              name="birthcity"
              title="Место рождения"
              placeholder="населенный пункт"
            />
            <CityInput
              name="livingcity"
              title="Место жительства"
              placeholder="населенный пункт"
            />
            <Button type="submit">Зарегистрироваться</Button>
          </form>
        </ThemeProvider>
      ) : (
        <GoogleIcon
          className={styles.icon}
          onClick={token ? googleLogOut : googleSignIn}
        />
      )}
    </div>
  );
}
