import React from "react";
import styles from "./Footer.module.css";
import { ReactComponent as HomeIcon } from "../../images/home-icon.svg";
import { ReactComponent as InYanIcon } from "../../images/in-yan-icon.svg";
import { ReactComponent as CalendarIcon } from "../../images/calendar-icon.svg";
import { ReactComponent as FileIcon } from "../../images/file-icon.svg";
import { ReactComponent as CabinetIcon } from "../../images/cabinet-icon.svg";
import NavLinkIconed from "../NavLinkIconed/NavLinkIconed";

const navLinks = [
  {
    icon: HomeIcon,
    to: "/",
  },
  {
    icon: InYanIcon,
    to: "/",
  },
  {
    icon: CalendarIcon,
    to: "/",
  },
  {
    icon: FileIcon,
    to: "/",
  },
  {
    icon: CabinetIcon,
    to: "/",
  },
];

export default function Footer() {
  return (
    <div className={styles.container}>
      {navLinks.map((navLink) => (
        <NavLinkIconed to={navLink.to} Icon={navLink.icon} />
      ))}
    </div>
  );
}
