import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

import calculatorStyles from "./IconedCardInfoList-Calculator.module.css";
import cardGridItemStyles from "./IconedCardInfoList-CardGridItem.module.css";
import homePageStyles from "./IconedCardInfoList-HomePage.module.css";

import IconedCardInfoListItem from "../IconedCardInfoListItem/IconedCardInfoListItem";
import { ReactComponent as AgeIcon } from "../../images/age-icon.svg";
import { ReactComponent as BirthSideIcon } from "../../images/birth-side-icon.svg";
import { ReactComponent as GenderIcon } from "../../images/gender-icon.svg";
import { ReactComponent as PowerIcon } from "../../images/power-icon.svg";
import { ReactComponent as LivingsideIcon } from "../../images/living-side-icon.svg";
import { cardInfoType, stylesType } from "../../utils/types";

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
}: propsType) {
  const [values, setValues]: [
    valueInfo[],
    Dispatch<SetStateAction<valueInfo[]>>
  ] = useState([
    doneFor === "HomePage"
      ? undefined
      : {
          Icon: AgeIcon,
          value: "39,10",
        },
    {
      Icon: BirthSideIcon,
      value: "ЮВ",
    },
    {
      Icon: GenderIcon,
      value: 100,
    },
    {
      Icon: PowerIcon,
      value: 100,
    },
    {
      Icon: LivingsideIcon,
      value: "ЮВ",
    },
  ]);
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState(getStyles(doneFor));
  return (
    <ul className={styles.list} onClick={onClick}>
      {values.map(
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
  );
}
