import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { ReactComponent as GoogleIcon } from "../../images/google-icon.svg";
import { userInput } from "../../utils/types";
import { Button, Input, TextField, ThemeProvider } from "@mui/material";
import { googleAuthButton, loginTheme, mainTheme } from "../../utils/muiThemes";
import CityInput from "../../Components/CityInput/CityInput";
import authUser from "../../api/authUser";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../api/getUserInfo";
import { useDispatch } from "react-redux";
import {
  setIsErrorPageAction,
  setLoadingAction,
  setUserAction,
} from "../../utils/store";
import NameHeading from "../../Components/NameHeading/NameHeading";
import { ReactComponent as LogoIcon } from "../../images/logo-another-icon.svg";

const firebaseConfig: FirebaseOptions = {
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingAction({ value: false, from: "loaded Login Page" }));
    dispatch(setIsErrorPageAction(true));
    return () => {
      dispatch(setIsErrorPageAction(false));
    };
  }, [dispatch]);
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
      const user = await getUserInfo({ token });
      if (user) {
        localStorage.setItem("token", user.token);
        dispatch(setUserAction(user));
        navigate("/");
        return;
      } else {
        const user: userInput = {
          token: token,
          name: result.user.displayName,
          mail: result.user.email,
          livingcity: "",
          birthcity: "",
        };
        setUserInfo({
          ...user,
          livingcity: "",
          birthcity: "",
        });
      }
    });
  };
  const fetchUser = async (user: userInfoType) => {
    const token = await authUser({ user });
    localStorage.setItem("token", token);
    navigate("/");
  };
  const googleLogOut = () => {
    signOut(auth).then((result) => {
      setToken("");
      setUserInfo(null);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.companyContainer}>
        <LogoIcon className={styles.logo} />
        <div className={styles.nameContainer}>
          <span className={styles.name}>виктория манькова</span>
          <span className={styles.title}>система</span>
        </div>
      </div>
      {userInfo ? (
        <ThemeProvider theme={loginTheme}>
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
            className={styles.formAfterGoogle}
          >
            <label className={styles.formFieldContainer}>
              <TextField
                type="text"
                name="name"
                label="имя"
                defaultValue={userInfo.name}
                variant="outlined"
              />
            </label>
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
              <span className={styles.label}>Имя</span>
              <Input
                disableUnderline
                type="text"
                name="name"
                defaultValue={userInfo.name}
                placeholder="имя"
              />
            </label>
            <CityInput
              name="birthcity"
              title="Место рождения"
              placeholder="населенный пункт"
              doneFor="loginPage"
            />
            <CityInput
              name="livingcity"
              title="Место жительства"
              placeholder="населенный пункт"
              doneFor="loginPage"
            />
            <Button className={styles.regButton} type="submit">
              ДАЛЕЕ
            </Button>
          </form>
        </ThemeProvider>
      ) : (
        <>
          <ThemeProvider theme={googleAuthButton}>
            <Button
              onClick={token ? googleLogOut : googleSignIn}
              className={styles.beforeButton}
            >
              <GoogleIcon className={styles.googleIcon} />
              <span className={styles.googleText}>Войти с Google</span>
            </Button>
          </ThemeProvider>
        </>
      )}
    </div>
  );
}
