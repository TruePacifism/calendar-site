import React from "react";
import styles from "./Footer.module.css";
import { ReactComponent as HomeIcon } from "../../images/home-icon.svg";
import { ReactComponent as InYanIcon } from "../../images/in-yan-icon.svg";
import { ReactComponent as CabinetIcon } from "../../images/cabinet-icon.svg";
import NavLinkIconed from "../NavLinkIconed/NavLinkIconed";
import { useSelector } from "react-redux";
import { stateType } from "../../utils/types";

const navLinks = [
  {
    icon: HomeIcon,
    to: "/",
  },
  {
    icon: InYanIcon,
    to: "/calculator",
  },
  // {
  //   icon: CalendarIcon,
  //   to: "/card",
  // },
  // {
  //   icon: FileIcon,
  //   to: "/null",
  // },
  {
    icon: CabinetIcon,
    to: "/cards",
  },
];

export default function Footer() {
  const isErrorPage = useSelector<stateType, boolean>(
    (state) => state.isErrorPage
  );
  return (
    !isErrorPage && (
      <div className={styles.container}>
        {navLinks.map((navLink, idx) => (
          <NavLinkIconed key={idx} to={navLink.to} Icon={navLink.icon} />
        ))}
      </div>
    )
  );
}
