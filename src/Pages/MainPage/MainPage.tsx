import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType, stateType, userType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import cardInfoPlaceholder from "../../utils/cardPlaceholder";
import CardInfo from "../../Components/CardInfo/CardInfo";
import StrangeCircle from "../../Components/StrangeCircle/StrangeCircle";
import getToday from "../../api/getToday";
import { useDispatch, useSelector } from "react-redux";
import { clearLoadingImages } from "../../utils/store";

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
      const newTodayInfo = await getToday({ user, dayOffset });
      setTodayInfo(newTodayInfo);
      console.log(user);
      console.log(dispatch);
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
      <>
        <DaysLine
          onIncrement={() => {
            setDayOffset((lastDayOffset) => lastDayOffset + 1);
          }}
          onDecrement={() => {
            setDayOffset((lastDayOffset) => lastDayOffset - 1);
          }}
        />
        <section
          style={{
            backgroundColor: todayInfo
              ? getColorByAnimalElement(todayInfo.day.element).backgroundHex
              : "#FFFFFF",
          }}
          className={styles.section}
        >
          <IconedCardInfoList doneFor="HomePage" cardInfo={todayInfo} />
          <CardInfo doneFor="HomePage" cardInfo={todayInfo} />
          <div className={styles.circleInfo}>
            <StrangeCircle
              cardInfos={[
                cardInfoPlaceholder,
                cardInfoPlaceholder,
                cardInfoPlaceholder,
                cardInfoPlaceholder,
              ]}
            />
          </div>
        </section>
      </>
    )
  );
}
