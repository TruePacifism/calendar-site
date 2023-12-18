import React, { ChangeEventHandler, MutableRefObject, useEffect } from "react";
import styles from "./InputTodayModal.module.css";
import { Input, ThemeProvider } from "@mui/material";
import { homePageInput } from "../../utils/muiThemes";
import CityInput from "../CityInput/CityInput";

export type todayInputType = {
  year: string;
  month: string;
  day: string;
  hour: string;
};

type propsType = {
  inputBefore: todayInputType;
  onClose?: (
    yearRef: MutableRefObject<HTMLInputElement>,
    monthRef: MutableRefObject<HTMLInputElement>,
    dayRef: MutableRefObject<HTMLInputElement>,
    hourRef: MutableRefObject<HTMLInputElement>
  ) => void;
};

const onChangeValue: ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
> = (e) => {
  sessionStorage.setItem(e.target.name, e.target.value);
};

export default function InputTodayModal({ inputBefore }: propsType) {
  const { year, month, day, hour } = inputBefore;

  const hourRef = document.getElementById("hourInput").getBoundingClientRect();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div
      className={styles.container}
      style={{
        top: hourRef.top,
        //   left: hourRef.x - hourRef.width - 7,
      }}
    >
      <ThemeProvider theme={homePageInput}>
        <div className={styles.inputList}>
          <Input
            disableUnderline
            name="hour"
            defaultValue={hour}
            onChange={onChangeValue}
          />
          <Input
            disableUnderline
            name="day"
            defaultValue={day}
            onChange={onChangeValue}
          />
          <Input
            disableUnderline
            name="month"
            defaultValue={month}
            onChange={onChangeValue}
          />
          <Input
            disableUnderline
            name="year"
            defaultValue={year}
            onChange={onChangeValue}
          />
        </div>
        <CityInput
          title="Место рождения"
          name="birthcity"
          placeholder="место рождения"
          doneFor="homeModal"
        />
        <CityInput
          title="Место жительства"
          name="livingcity"
          placeholder="место жительства"
          doneFor="homeModal"
        />
      </ThemeProvider>
    </div>
  );
}
