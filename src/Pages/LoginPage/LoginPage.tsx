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
import {
  Button,
  Checkbox,
  InputLabel,
  TextField,
  ThemeProvider,
} from "@mui/material";
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

const policyString = `Правила в отношении обработки персональных данных:
Правила в отношении обработки персональных данных определяют позицию и намерения в области обработки и защиты персональных данных, с целью соблюдения и защиты прав и свобод каждого человека и, в особенности, права на неприкосновенность частной жизни, личную и семейную тайну, защиту своей чести и доброго имени. Действие Правил распространяется на все персональные данные субъектов, обрабатываемые с применением средств автоматизации и без применения таких средств. К настоящим Правилам имеет доступ любой субъект персональных данных. Персональные данные - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (гражданину). Т.е. к такой информации, в частности, можно отнести: ФИО, год, месяц, дата и место рождения, адрес, сведения о семейном, социальном, имущественном положении, сведения об образовании, профессии, доходах, сведения о состоянии здоровья, а также другую информацию. Обработка персональных данных - любое действие (операция) или совокупность действий (операций) с персональными данным, совершаемых с использованием средств автоматизации или без использования таких средств. К таким действиям (операциям) можно отнести: сбор, получение, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных. На данном сайте обрабатываются персональные данные зарегистрированных пользователей сайта. Под безопасностью персональных данных понимается защищенность персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных и принимает необходимые правовые, организационные и технические меры для защиты персональных данных. Обработка и обеспечение безопасности персональных данных осуществляется в соответствии с требованиями Конституции Российской Федерации, Федерального закона № 152-ФЗ «О персональных данных», подзаконных актов, других определяющих случаи и особенности обработки персональных данных федеральных законов Российской Федерации, руководящих и методических документов ФСТЭК России и ФСБ России. При обработке персональных данных реализуются следующие принципы: законности и справедливой основы; ограничения обработки персональных данных достижением конкретных, заранее определенных и законных целей; недопущения обработки персональных данных, несовместимой с целями сбора персональных данных; недопущения объединения баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой; обработки персональных данных, которые отвечают целям их обработки; соответствия содержания. Обрабатываются персональные данные только при наличии хотя бы одного из следующих условий: обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных; обработка персональных данных необходима для достижения целей, предусмотренных законом, для осуществления и выполнения возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей; обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем; обработка персональных данных необходима для осуществления прав и законных интересов собственников сайта или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных; осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе; осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом. В случаях, установленных законодательством Российской Федерации, владелец сайта вправе осуществлять передачу персональных данных граждан. Владелец сайта уничтожает либо обезличивает персональные данные по достижении целей обработки или в случае утраты необходимости достижения цели обработки. Гражданин, персональные данные которого обрабатываются на сайте, имеет право получать подтверждение факта обработки персональных данных; правовые основания и цели обработки персональных данных; сведения о применяемых способах обработки персональных данных; сведения о лицах, которые имеют доступ к персональным данным или которым могут быть раскрыты персональные данные на основании федерального закона; перечень обрабатываемых персональных данных, относящихся к гражданину, от которого поступил запрос и источник их получения, если иной порядок предоставления таких данных не предусмотрен федеральным законом; сведения о сроках обработки персональных данных, в том числе о сроках их хранения; сведения о порядке осуществления гражданином прав, предусмотренных Федеральным законом «О персональных данных» № 152-ФЗ; информацию об осуществляемой или о предполагаемой трансграничной передаче персональных данных; иные сведения, предусмотренные Федеральным законом «О персональных данных» № 152-ФЗ или другими федеральными законами; требовать уточнения своих персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки; отозвать свое согласие на обработку персональных данных. В случае неисполнения положений настоящих правил владелец сайта несет ответственность в соответствии действующим законодательством Российской Федерации. 
Получить разъяснения по интересующим Вас вопросам обработки Ваших персональных данных, направив официальный запрос по адресу viktoriae2020@gmail.com. В случае направления официального запроса в тексте запроса необходимо указать: ФИО; номер основного документа, удостоверяющего личность субъекта персональных данных или его представителя, сведения о дате выдачи указанного документа и выдавшем его органе; сведения, подтверждающие факт обработки персональных данных на сайте; подпись гражданина (или его законного представителя). Если запрос отправляется в электронном виде, то он должен быть оформлен в виде электронного документа и подписан электронной подписью в соответствии с законодательством РФ. На сайте victoriamankova.ru публикуется актуальная версия данных правил.  Сведения о реализуемых требованиях к защите персональных данных. Владелец сайта при обработке персональных данных принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных. К таким мерам в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» относятся: определение угроз безопасности персональных данных при их обработке в информационных системах персональных данных; применение организационных и технических мер по обеспечению безопасности персональных данных при их обработке в информационных системах персональных данных, необходимых для выполнения требований к защите персональных данных, исполнение которых обеспечивает установленные Правительством Российской Федерации уровни защищенности персональных данных; применение прошедших в установленном порядке процедуру оценки соответствия средств защиты информации; оценка эффективности принимаемых мер по обеспечению безопасности персональных данных до ввода в эксплуатацию информационной системы персональных данных; обнаружение фактов несанкционированного доступа к персональным данным и принятием мер; восстановление персональных данных, модифицированных или уничтоженных вследствие несанкционированного доступа к ним; установление правил доступа к персональным данным, обрабатываемым в информационной системе персональных данных, а также обеспечением регистрации и учета всех действий, совершаемых с персональными данными в информационной системе персональных данных; контроль за принимаемыми мерами по обеспечению безопасности персональных данных и уровня защищенности информационных систем персональных данных; проведение мониторинга действий пользователей, проведение разбирательств по фактам нарушения требований безопасности персональных данных. Претензий финансового и иного характера к собственникам сайта в связи с использованием персональных данных не имеете.`;

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
  const [isAgreed, setIsAgreed]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
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
            <div className={styles.policyContainer}>
              <p className={styles.policyText}>{policyString}</p>
            </div>
            <InputLabel
              style={{
                whiteSpace: "normal",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: "17px",
                letterSpacing: "0em",
                textAlign: "left",
                marginBottom: 15,
              }}
              className={styles.checkboxContainer}
            >
              <Checkbox
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                }}
                name="agreed"
              />
              Согласен с правилами обработки персональных данных
            </InputLabel>
            <Button
              onClick={token ? googleLogOut : googleSignIn}
              disabled={!isAgreed}
              style={{ filter: isAgreed ? "" : "grayscale(100%)" }}
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
