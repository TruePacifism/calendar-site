import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MainPage.module.css";
import DaysLine from "../../Components/DaysLine/DaysLine";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import { cardInfoType } from "../../utils/types";

export default function MainPage() {
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState();
  const [backgroundColor, setBackgroundColor]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("brown");
  return (
    <>
      <DaysLine />
      <IconedCardInfoList cardInfo={cardInfo} />
    </>
  );
}
