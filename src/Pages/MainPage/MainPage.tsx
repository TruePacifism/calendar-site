import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, stateType, userType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import CardInfo from "../../Components/CardInfo/CardInfo";
import getToday from "../../api/getToday";
import { useDispatch, useSelector } from "react-redux";
import { clearLoadingImages, setLoadingAction } from "../../utils/store";
import AnimalLogo from "../../Components/AnimalLogo/AnimalLogo";

export default function MainPage() {
  const [todayInfo, setTodayInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  const [dayOffset, setDayOffset]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);
  const dispatch = useDispatch();
  const user = useSelector<stateType, userType>((store) => store.user);
  useEffect(() => {
    const fetchInfo = async () => {
      dispatch(setLoadingAction({ from: "fetch user", value: true }));
      const newTodayInfo = await getToday({ user, dayOffset });
      setTodayInfo(newTodayInfo);
    };
    fetchInfo();
  }, [user, dispatch, dayOffset]);
  useEffect(() => {
    if (!todayInfo) {
      return;
    }
    return () => {};
  }, [todayInfo]);
  useEffect(() => {
    return () => {
      dispatch(clearLoadingImages());
    };
  }, [dispatch]);
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
        <DaysLine
          onIncrement={() => {
            setDayOffset((lastDayOffset) => lastDayOffset + 1);
          }}
          onDecrement={() => {
            setDayOffset((lastDayOffset) => lastDayOffset - 1);
          }}
        />
        <section className={styles.section}>
          <IconedCardInfoList doneFor="HomePage" cardInfo={todayInfo} />
          <CardInfo doneFor="HomePage" cardInfo={todayInfo} />
          <div className={styles.animalLogoContainer}>
            <AnimalLogo animal={todayInfo.day.animal} />
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
