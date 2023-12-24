import React, {
  Dispatch,
  SetStateAction,
  useCallback,
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

export default function InputTodayModal() {
  const dispatch = useDispatch();
  const user = useSelector<stateType, userType>((state) => state.user);

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

  const formRef = useRef();

  const cancelHandler = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);

  // eslint-disable-next-line
  const fetchHandler: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement> & {
      target: {
        elements?: {
          name: {
            value: string;
          };
          year: {
            value: string;
          };
          month: {
            value: string;
          };
          day: {
            value: string;
          };
          hour: {
            value: string;
          };
          minute: {
            value: string;
          };
          birthcity: {
            value: string;
          };
          livingcity: {
            value: string;
          };
          gender: any[];
        };
      };
    }
  ) => {
    e.preventDefault();
    const newTodayData: inputDataType = {
      birthdate: {
        hour: Number.parseInt(e.target.elements.hour.value.split(":")[0]),
        minute: Number.parseInt(e.target.elements.hour.value.split(":")[1]),
        day: Number.parseInt(e.target.elements.day.value),
        month: Number.parseInt(e.target.elements.month.value),
        year: Number.parseInt(e.target.elements.year.value),
      },
      birthcity: e.target.elements.birthcity.value,
      livingcity: e.target.elements.livingcity.value,
      name: "today",
      gender: "female",
    };
    sessionStorage.setItem("newTodayData", JSON.stringify(newTodayData));
    inputRefs.year.value = e.target.elements.year.value;
    inputRefs.month.value = e.target.elements.month.value;
    inputRefs.day.value = e.target.elements.day.value;
    inputRefs.hour.value = e.target.elements.hour.value;
    dispatch(closeModalAction());
  };
  return (
    <div
      className={styles.container}
      style={{
        top: inputRefs.hour.getBoundingClientRect().top,
      }}
    >
      <ThemeProvider theme={homePageInput}>
        <form ref={formRef} onSubmit={fetchHandler}>
          <div className={styles.inputList}>
            <Input
              disableUnderline
              name="hour"
              defaultValue={inputRefs.hour.value}
            />
            <Input
              disableUnderline
              name="day"
              defaultValue={inputRefs.day.value}
            />
            <Input
              disableUnderline
              name="month"
              defaultValue={inputRefs.month.value}
            />
            <Input
              disableUnderline
              name="year"
              defaultValue={inputRefs.year.value}
            />
          </div>
          <CityInput
            title="Место рождения"
            name="birthcity"
            placeholder="место рождения"
            doneFor="homeModal"
            defaultValue={user.birthcity}
          />
          <CityInput
            title="Место жительства"
            name="livingcity"
            placeholder="место жительства"
            doneFor="homeModal"
            defaultValue={user.livingcity}
          />
          <div className={styles.buttonList}>
            <ThemeProvider theme={darkButtonTheme}>
              <Button type="submit">РАССЧИТАТЬ НОВУЮ ДАТУ</Button>
              <Button onClick={cancelHandler}>ОТМЕНА</Button>
            </ThemeProvider>
          </div>
        </form>
      </ThemeProvider>
    </div>
  );
}
