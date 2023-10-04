import React from "react";
import styles from "./Modal.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Modal } from "@mui/material";

type propsType = {
  content: ReactJSXElement;
  //   onClose: () => {};
  //   onOpen: () => {};
  //   onChange: () => {};
};

export default function MyModal({ content }: propsType) {
  return <Modal open>{content}</Modal>;
}
