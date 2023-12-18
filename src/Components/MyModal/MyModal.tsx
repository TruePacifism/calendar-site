import React from "react";
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
  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog
        open={!!modalContent}
        onClose={() => {
          dispatch(closeModalAction());
        }}
      >
        {modalContent ? modalContent : <></>}
      </Dialog>
    </ThemeProvider>
  );
}
