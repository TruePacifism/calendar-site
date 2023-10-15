import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import calculatorStyles from "./IconedCardInfoListItem-Calculator.module.css";
import homePageStyles from "./IconedCardInfoListItem-HomePage.module.css";
import cardGridItemStyles from "./IconedCardInfoListItem-CardGridItem.module.css";
import { stylesType } from "../../utils/types";

type propsType = {
  value: string | number;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  doneFor: doneForType;
};

type doneForType = "CardGridItem" | "Calculator" | "HomePage";

const getStyles = (doneFor: doneForType): stylesType => {
  switch (doneFor) {
    case "Calculator":
      return calculatorStyles;
    case "HomePage":
      return homePageStyles;
    case "CardGridItem":
      return cardGridItemStyles;
  }
};

export default function IconedCardInfoListItem({
  value,
  Icon,
  doneFor,
}: propsType) {
  const [styles, setStyles]: [
    stylesType,
    Dispatch<SetStateAction<stylesType>>
  ] = useState(getStyles(doneFor));

  //УДАЛИТЬ В КОНЦЕ !!!!!!
  useEffect(() => {
    setStyles(getStyles(doneFor));
  }, [doneFor]);

  return (
    <li className={styles.container}>
      <Icon className={styles.icon} />
      <span className={styles.value}>{value}</span>
    </li>
  );
}
