import React, { useState } from "react";
import IconedCardInfoListItem from "../IconedCardInfoListItem/IconedCardInfoListItem";
import { ReactComponent as AgeIcon } from "../../images/age-icon.svg";
import { ReactComponent as BirthSideIcon } from "../../images/birth-side-icon.svg";
import { ReactComponent as GenderIcon } from "../../images/gender-icon.svg";
import { ReactComponent as PowerIcon } from "../../images/power-icon.svg";
import { ReactComponent as LivingsideIcon } from "../../images/living-side-icon.svg";
import styles from "./IconedCardInfoList.module.css";
import { cardInfoType } from "../../types";

type valueInfo = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  value: string;
};

type propsType = {
  cardInfo: cardInfoType;
};

export default function IconedCardInfoList({ cardInfo }: propsType) {
  const [values, setValues] = useState([
    {
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

  return (
    <ul className={styles.list}>
      {values.map((value) => (
        <IconedCardInfoListItem Icon={value.Icon} value={value.value} />
      ))}
    </ul>
  );
}
