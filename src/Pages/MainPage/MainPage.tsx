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

export default function MainPage() {
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  useEffect(() => {
    setCardInfo(cardInfoPlaceholder);
  }, []);
  return (
    <>
      <DaysLine />
      <section
        style={{ backgroundColor: getColorByAnimal(cardInfo.year.animal).hex }}
      >
        <IconedCardInfoList doneFor="HomePage" cardInfo={cardInfo} />
        <CardInfo doneFor="HomePage" cardInfo={cardInfo} />
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
  );
}
