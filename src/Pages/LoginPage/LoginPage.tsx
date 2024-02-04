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
import { Button, TextField, ThemeProvider } from "@mui/material";
import { googleAuthButton, loginTheme } from "../../utils/muiThemes";
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

export default function LoginPage(props: propsType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingAction({ value: false, from: "loaded Login Page" }));
    dispatch(setIsErrorPageAction(true));
    // const authDev = async () => {
    //   const token: string = "rWtBfn90plcd4a4fhxtfQeR4Xtl1";
    //   const user = await getUserInfo({ token });
    //   localStorage.setItem("token", user.token);
    //   dispatch(setUserAction(user));
    //   navigate("/");
    // };
    // authDev();
    return () => {
      dispatch(setIsErrorPageAction(false));
    };
  }, [dispatch, navigate]);
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
    userInput,
    Dispatch<SetStateAction<userInput>>
  ] = useState();
  const googleSignIn = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const token: string = result.user.uid;
      console.log(result.user);

      const user = await getUserInfo({ token });
      if (user) {
        localStorage.setItem("token", user.token);
        dispatch(setUserAction(user));
        navigate("/");
        return;
      } else {
        const user: userInput = {
          token: token,
          firstName: result.user.displayName.split(" ")[0],
          secondName: result.user.displayName.split(" ")[1],
          thirdName: "",
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
  const fetchUser = async (user: userInput) => {
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
  const [nameValue, setNameValue]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  useEffect(() => {
    setNameValue(userInfo?.firstName);
  }, [userInfo?.firstName]);

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
        <div className={styles.inputsContainer}>
          <ThemeProvider theme={loginTheme}>
            <form
              onSubmit={(
                e: React.FormEvent<HTMLFormElement> & {
                  target: {
                    elements?: {
                      firstName: {
                        value: string;
                      };
                      secondName: {
                        value: string;
                      };
                      thirdName: {
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
                const {
                  firstName,
                  secondName,
                  thirdName,
                  livingcity,
                  birthcity,
                } = e.target.elements;
                console.dir(e.target.elements);
                const user: userInput = {
                  ...userInfo,
                  firstName: firstName.value,
                  secondName: secondName.value,
                  thirdName: thirdName.value,
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
                  name="firstName"
                  label="имя"
                  size="small"
                  value={nameValue}
                  onChange={(event) => {
                    setNameValue(event.target.value);
                  }}
                  required
                  error={nameValue === ""}
                  variant="outlined"
                />
              </label>
              <label className={styles.formFieldContainer}>
                <TextField
                  type="text"
                  name="secondName"
                  size="small"
                  label="фамилия"
                  defaultValue={userInfo.secondName}
                  variant="outlined"
                />
              </label>
              <label className={styles.formFieldContainer}>
                <TextField
                  type="text"
                  name="thirdName"
                  size="small"
                  label="отчество"
                  defaultValue={userInfo.thirdName}
                  variant="outlined"
                />
              </label>
              <CityInput
                name="birthcity"
                title="Место рождения"
                placeholder="место рождения"
                doneFor="loginPage"
              />
              <CityInput
                name="livingcity"
                title="Место жительства"
                placeholder="место жительства"
                doneFor="loginPage"
              />
              <Button className={styles.regButton} type="submit">
                ДАЛЕЕ
              </Button>
            </form>
          </ThemeProvider>
        </div>
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
