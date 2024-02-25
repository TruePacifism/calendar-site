import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ModalIconedInfo.module.css";
import { cardInfoType } from "../../../utils/types";
import { ReactComponent as AgeIcon } from "../../../images/age-icon.svg";
import { ReactComponent as BirthSideIcon } from "../../../images/birth-side-icon.svg";
import { ReactComponent as MaleIcon } from "../../../images/male-icon.svg";
import { ReactComponent as FemaleIcon } from "../../../images/female-icon.svg";
import { ReactComponent as PowerIcon } from "../../../images/power-icon.svg";
import declOfNum from "../../../utils/declOfNum";
// import { ReactComponent as LivingsideIcon } from "../../../images/living-side-icon.svg";

type propsType = {
  cardInfo: cardInfoType;
};
type valueInfo = {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  value: string | number;
  description: string;
};

export default function ModalIconedInfo({ cardInfo }: propsType) {
  const [values, setValues]: [
    valueInfo[],
    Dispatch<SetStateAction<valueInfo[]>>
  ] = useState();
  useEffect(() => {
    setValues([
      cardInfo.age.year !== 0 && cardInfo.age.month !== 0
        ? {
            Icon: AgeIcon,
            value: `${cardInfo.age.year},${cardInfo.age.month}`,
            description: `Возраст: ${cardInfo.age.year} ${declOfNum(
              cardInfo.age.year,
              ["год", "года", "лет"]
            )} и ${cardInfo.age.month} ${declOfNum(cardInfo.age.month, [
              "месяц",
              "месяца",
              "месяцев",
            ])}`,
          }
        : undefined,
      {
        Icon: BirthSideIcon,
        value: cardInfo.direction.shortName,
        description: `Направление: ${cardInfo.direction.fullName.toLowerCase()}`,
      },
      {
        Icon:
          cardInfo.genderCount.female > cardInfo.genderCount.male
            ? FemaleIcon
            : MaleIcon,
        value: `${Math.max(
          cardInfo.genderCount.female,
          cardInfo.genderCount.male
        )}`,
        description: `Энергетика: ${
          cardInfo.genderCount.female > cardInfo.genderCount.male
            ? `женская ${cardInfo.genderCount.female}%`
            : `мужская ${cardInfo.genderCount.male}%`
        }`,
      },
      {
        Icon: PowerIcon,
        value: `${Math.round(
          (cardInfo.cardStrength.power / cardInfo.cardStrength.maxPower) * 100
        )}`,
        description: `Сила карты: ${Math.round(
          (cardInfo.cardStrength.power / cardInfo.cardStrength.maxPower) * 100
        )}%`,
      },
      // {
      //   Icon: LivingsideIcon,
      //   value: cardInfo.movedDirection.shortName,
      //   description: `Перемещение от места рождения: ${cardInfo.movedDirection.fullName}`,
      // },
    ]);
  }, [cardInfo]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {values &&
          values.map(
            (value) =>
              value && (
                <li className={styles.listItem}>
                  <value.Icon className={styles.icon} />
                  <span className={styles.value}>{value.value}</span>
                  <p className={styles.description}>{value.description}</p>
                </li>
              )
          )}
      </ul>
    </div>
  );
}
