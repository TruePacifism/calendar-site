import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Dialog, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../utils/types";
import { modalTheme } from "../../utils/muiThemes";
import { closeModalAction } from "../../utils/store";

export default function MyModal() {
  const dispatch = useDispatch();
  const modalContent = useSelector<stateType, ReactJSXElement>(
    (store) => store.modalContent
  );
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [modalElement, setModalElement]: [
    ReactJSXElement,
    Dispatch<SetStateAction<ReactJSXElement>>
  ] = useState(null);
  useEffect(() => {
    if (modalContent) {
      setModalElement(modalContent);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setTimeout(() => {
        setModalElement(<></>);
      }, 400);
    }
  }, [modalContent]);
  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog
        open={isOpen}
        onClose={() => {
          dispatch(closeModalAction());
        }}
        transitionDuration={400}
      >
        {modalElement}
      </Dialog>
    </ThemeProvider>
  );
}
