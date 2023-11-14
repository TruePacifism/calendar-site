import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType } from "../../utils/types";
import getColorByAnimalElement from "../../utils/getColorByAnimal";
import cardInfoPlaceholder from "../../utils/cardPlaceholder";
import CardInfo from "../../Components/CardInfo/CardInfo";
import StrangeCircle from "../../Components/StrangeCircle/StrangeCircle";
import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import { ReactComponent as AddIcon } from "../../images/add-home.svg";
import getToday from "../../api/getToday";
import Loading from "../../Components/Loading/Loading";

export default function MainPage() {
  const [todayInfo, setTodayInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  useEffect(() => {
    const fetchInfo = async () => {
      const newTodayInfo = await getToday();
      setTodayInfo(newTodayInfo);
    };
    fetchInfo();
  }, []);
  useEffect(() => {
    if (!todayInfo) {
      return;
    }
    console.log("loading");
    return () => {
      console.log("loaded");
    };
  }, [todayInfo]);

  // This will run one time after the component mounts
  useEffect(() => {
    console.log("start");

    // callback function to call when event triggers
    const onPageLoad = () => {
      console.log("page loaded");
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      <Loading isShowing={todayInfo ? false : true} />

      {todayInfo && (
        <>
          <DaysLine />
          <section
            style={{
              backgroundColor: todayInfo
                ? getColorByAnimalElement(todayInfo.day.element).hex
                : "#FFFFFF",
            }}
          >
            <IconedCardInfoList doneFor="HomePage" cardInfo={todayInfo} />
            <CardInfo doneFor="HomePage" cardInfo={todayInfo} />
            <div className={styles.circleInfo}>
              <StarIcon className={styles.starIcon} />
              <StrangeCircle
                cardInfos={[
                  cardInfoPlaceholder,
                  cardInfoPlaceholder,
                  cardInfoPlaceholder,
                  cardInfoPlaceholder,
                ]}
              />
              <AddIcon className={styles.addIcon} />
            </div>
          </section>
        </>
      )}
    </>
  );
}
