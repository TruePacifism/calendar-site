import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as BackIcon } from "../../images/back-icon.svg";
import { ReactComponent as BurgerIcon } from "../../images/burger-icon.svg";

type propsType = {
  heading: string;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

export default function Header({ heading, Icon }: propsType) {
  return (
    <div className={styles.container}>
      <BackIcon className={styles.backIcon} />
      <span className={styles.heading}>{heading}</span>
      <BurgerIcon className={styles.burgerIcon} />
    </div>
  );
}
