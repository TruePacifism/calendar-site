import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import {
  cardInfoType,
  inputDataType,
  stateType,
  userType,
} from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import CardInfo from "../../Components/CardInfo/CardInfo";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction, setLoadingAction } from "../../utils/store";
import AnimalLogo from "../../Components/AnimalLogo/AnimalLogo";
import countCard from "../../api/countCard";
import ModalIconedInfo from "../../Components/ModalComponents/ModalIconedInfo/ModalIconedInfo";
import ModalCardInfo from "../../Components/ModalComponents/ModalCardInfo/ModalCardInfo";

let hashUser: userType = null;
let hashMainPageInfo: inputDataType = null;

export default function MainPage() {
  const [todayInfo, setTodayInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  const dispatch = useDispatch();
  const user = useSelector<stateType, userType>((store) => store.user);
  const mainPageInfo = useSelector<stateType, inputDataType>(
    (store) => store.mainPageInfo
  );
  useEffect(() => {
    console.log(hashMainPageInfo === mainPageInfo);
    console.log(hashUser === user);

    hashMainPageInfo = mainPageInfo;
    hashUser = user;
    const fetchInfo = async () => {
      dispatch(setLoadingAction({ value: true, from: "mainFetch" }));
      console.log("fetched");

      const newTodayInfo = await countCard({ inputData: mainPageInfo });
      console.log(newTodayInfo);
      setTodayInfo(newTodayInfo);
      dispatch(setLoadingAction({ value: false, from: "mainFetch" }));
    };

    fetchInfo();
  }, [user, mainPageInfo, mainPageInfo.birthdate, dispatch]);

  const fetchIconedInfoClick = useCallback(() => {
    dispatch(
      openModalAction(
        <div className={styles.modal}>
          <ModalIconedInfo cardInfo={todayInfo} />
        </div>
      )
    );
  }, [dispatch, todayInfo]);
  // useEffect(() => {
  //   const fetchNewToday = async () => {
  //     await submitTodayHandler(mainPageInfo);
  //   };
  //   fetchNewToday();
  // }, [user, mainPageInfo]);

  // const submitTodayHandler = async (inputData: inputDataType) => {
  //   const newInfo = await countCard({ inputData });
  //   console.log(newInfo);

  //   setTodayInfo(newInfo);
  // };

  return (
    todayInfo && (
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: todayInfo
            ? getColorByAnimalElement(todayInfo.day.element).backgroundHex
            : "#FFFFFF",
        }}
      >
        <DaysLine />
        <section className={styles.section}>
          <IconedCardInfoList
            doneFor="HomePage"
            onClick={fetchIconedInfoClick}
            cardInfo={todayInfo}
          />
          <div
            onClick={() => {
              console.log("clicked");

              dispatch(
                openModalAction(<ModalCardInfo cardInfo={todayInfo} isToday />)
              );
            }}
          >
            <CardInfo doneFor="HomePage" cardInfo={todayInfo} />
          </div>
          <div className={styles.animalLogoContainer}>
            <AnimalLogo doneFor="HomePage" animal={todayInfo.day.animal} />
          </div>
          {/* <div className={styles.circleInfo}>
            <StrangeCircle
              cardInfos={[
                cardInfoPlaceholder,
                cardInfoPlaceholder,
                cardInfoPlaceholder,
                cardInfoPlaceholder,
              ]}
            />
          </div> */}
        </section>
      </div>
    )
  );
}
