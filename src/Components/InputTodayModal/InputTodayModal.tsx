import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./InputTodayModal.module.css";
import { Button, Input, ThemeProvider } from "@mui/material";
import { darkButtonTheme, homePageInput } from "../../utils/muiThemes";
import CityInput from "../CityInput/CityInput";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction } from "../../utils/store";
import { inputDataType, stateType, userType } from "../../utils/types";

const onChangeValue: ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
> = (e) => {
  sessionStorage.setItem(e.target.name, e.target.value);
};
export default function InputTodayModal() {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [inputRefs, setInputRefs]: [
    {
      hour: HTMLInputElement;
      day: HTMLInputElement;
      month: HTMLInputElement;
      year: HTMLInputElement;
    },
    Dispatch<
      SetStateAction<{
        hour: HTMLInputElement;
        day: HTMLInputElement;
        month: HTMLInputElement;
        year: HTMLInputElement;
      }>
    >
  ] = useState({
    hour: document.querySelector("#hourInput"),
    day: document.querySelector("#dayInput"),
    month: document.querySelector("#monthInput"),
    year: document.querySelector("#yearInput"),
  });

  const user = useSelector<stateType, userType>((state) => state.user);

  // eslint-disable-next-line
  const [inputData, setInputData]: [
    inputDataType,
    Dispatch<SetStateAction<inputDataType>>
  ] = useState({
    birthcity: user.birthcity,
    livingcity: user.livingcity,
    birthdate: {
      hour: Number.parseInt(inputRefs.hour.value.split(":")[0]),
      minute: Number.parseInt(inputRefs.hour.value.split(":")[1]),
      day: Number.parseInt(inputRefs.day.value),
      month: Number.parseInt(inputRefs.month.value),
      year: Number.parseInt(inputRefs.year.value),
    },
    name: "today",
    gender: "Женский",
  });

  const formRef = useRef();

  const cancelHandler = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);

  // eslint-disable-next-line
  const fetchHandler = useCallback(() => {}, []);

  useEffect(() => {
    return () => {};
  }, [inputData]);
  return (
    <div
      className={styles.container}
      style={{
        top: inputRefs.hour.getBoundingClientRect().top,
      }}
    >
      <ThemeProvider theme={homePageInput}>
        <form ref={formRef}>
          <div className={styles.inputList}>
            <Input
              disableUnderline
              name="hour"
              defaultValue={inputRefs.hour.value}
              onChange={onChangeValue}
            />
            <Input
              disableUnderline
              name="day"
              defaultValue={inputRefs.day.value}
              onChange={onChangeValue}
            />
            <Input
              disableUnderline
              name="month"
              defaultValue={inputRefs.month.value}
              onChange={onChangeValue}
            />
            <Input
              disableUnderline
              name="year"
              defaultValue={inputRefs.year.value}
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
          <div className={styles.buttonList}>
            <ThemeProvider theme={darkButtonTheme}>
              <Button>РАССЧИТАТЬ НОВУЮ ДАТУ</Button>
              <Button onClick={cancelHandler}>ОТМЕНА</Button>
            </ThemeProvider>
          </div>
        </form>
      </ThemeProvider>
    </div>
  );
}
