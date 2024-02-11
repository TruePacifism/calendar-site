import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import calculatorStyles from "./IconedCardInfoList-Calculator.module.css";
import cardGridItemStyles from "./IconedCardInfoList-CardGridItem.module.css";
import homePageStyles from "./IconedCardInfoList-HomePage.module.css";

import IconedCardInfoListItem from "../IconedCardInfoListItem/IconedCardInfoListItem";
import { ReactComponent as AgeIcon } from "../../images/age-icon.svg";
import { ReactComponent as BirthSideIcon } from "../../images/birth-side-icon.svg";
import { ReactComponent as MaleIcon } from "../../images/male-icon.svg";
import { ReactComponent as FemaleIcon } from "../../images/female-icon.svg";
import { ReactComponent as PowerIcon } from "../../images/power-icon.svg";
// import { ReactComponent as LivingsideIcon } from "../../images/living-side-icon.svg";
import {
  cardInfoType,
  colorType,
  stateType,
  stylesType,
} from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../utils/store";
import InputTodayModal from "../InputTodayModal/InputTodayModal";

type valueInfo = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  value: string | number;
};

type propsType = {
  cardInfo: cardInfoType;
  onClick?: MouseEventHandler<HTMLUListElement>;
  doneFor: doneForType;
  backgroundColor?: colorType;
};

type doneForType = "CardGridItem" | "Calculator" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "CardGridItem":
      return cardGridItemStyles;
    case "HomePage":
      return homePageStyles;
    default:
      break;
  }
};

export default function IconedCardInfoList({
  cardInfo,
  onClick,
  doneFor,
  backgroundColor,
}: propsType) {
  const dispatch = useDispatch();
  const livingCity = useSelector<stateType, string>(
    (store) => store.mainPageInfo.livingcity
  );
  const [values, setValues]: [
    valueInfo[],
    Dispatch<SetStateAction<valueInfo[]>>
  ] = useState();
  useEffect(() => {
    setValues([
      doneFor === "HomePage"
        ? undefined
        : {
            Icon: AgeIcon,
            value:
              cardInfo.age.year < 0 || cardInfo.age.month < 0
                ? "ㅤ"
                : `${cardInfo.age.year},${cardInfo.age.month}`,
          },
      cardInfo.direction && {
        Icon: BirthSideIcon,
        value: cardInfo.direction.shortName,
      },
      {
        Icon: cardInfo.genderCount.female > cardInfo.genderCount.male ? FemaleIcon : MaleIcon,
        value: `${Math.max(
          cardInfo.genderCount.female,
          cardInfo.genderCount.male
        )}`,
      },
      {
        Icon: PowerIcon,
        value: `${Math.round(
          (cardInfo.cardStrength.power / cardInfo.cardStrength.maxPower) * 100
        )}`,
      },
      // {
      //   Icon: LivingsideIcon,
      //   value: cardInfo.movedDirection.shortName,
      // },
    ]);
  }, [doneFor, cardInfo]);
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState(getStyles(doneFor));
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor:
          doneFor === "Calculator" ? backgroundColor.backgroundHex : null,
      }}
    >
      <ul className={styles.list} onClick={onClick}>
        {values &&
          values.map(
            (value, idx) =>
              value && (
                <IconedCardInfoListItem
                  doneFor={doneFor}
                  Icon={value.Icon}
                  value={value.value}
                  key={idx}
                />
              )
          )}
      </ul>
      {doneFor === "HomePage" && (
        <span
          className={styles.city}
          onClick={() => {
            dispatch(
              openModalAction(<InputTodayModal selected="currentPillar" />)
            );
          }}
        >
          {livingCity}
        </span>
      )}
    </div>
  );
}
