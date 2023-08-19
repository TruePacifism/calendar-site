import React from "react";
import styles from "./NavLinkIconed.module.css";
import { NavLink } from "react-router-dom";

type propsType = {
  to: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
};

export default function NavLinkIconed({ to, Icon }: propsType) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? [styles.active, styles.link].join(" ") : styles.link
      }
    >
      <Icon className={styles.icon} />
    </NavLink>
  );
}
