import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType } from "../../utils/types";
import getColorByAnimal from "../../utils/getColorByAnimal";
import cardInfoPlaceholder from "../../utils/cardPlaceholder";
import CardInfo from "../../Components/CardInfo/CardInfo";
import StrangeCircle from "../../Components/StrangeCircle/StrangeCircle";
import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import { ReactComponent as AddIcon } from "../../images/add-home.svg";
import getToday from "../../api/getToday";

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
  return (
    todayInfo && (
      <>
        <DaysLine />
        <section
          style={{
            backgroundColor: todayInfo
              ? getColorByAnimal(todayInfo.year.animal).hex
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
    )
  );
}
