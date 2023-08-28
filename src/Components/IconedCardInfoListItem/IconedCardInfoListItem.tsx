import React from "react";
import styles from "./IconedCardInfoListItem.module.css";

type propsType = {
  value: string | number;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

export default function IconedCardInfoListItem({ value, Icon }: propsType) {
  return (
    <li className={styles.container}>
      <Icon className={styles.icon} />
      <span className={styles.value}>{value}</span>
    </li>
  );
}
