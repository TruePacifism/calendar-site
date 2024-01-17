import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./InputTodayModal.module.css";
import { Button, Input, MenuItem, Select, ThemeProvider } from "@mui/material";
import { darkButtonTheme, homePageInput } from "../../utils/muiThemes";
import CityInput from "../CityInput/CityInput";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction, setMainPageDateAction } from "../../utils/store";
import { monthType, stateType, userType } from "../../utils/types";
import { months } from "../../enums";

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
    console.log("month", e.target.elements.month.value);
    console.log(
      months.find((month) => month.name === e.target.elements.month.value)
        .orderNumber
    );
    console.log(months);

    const newTodayDatabirthdate = {
      hour: Number.parseInt(e.target.elements.hour.value.split(":")[0]),
      minute: Number.parseInt(e.target.elements.hour.value.split(":")[1]),
      day: Number.parseInt(e.target.elements.day.value),
      month: months.find(
        (month) => month.name === e.target.elements.month.value
      ).orderNumber,
      year: Number.parseInt(e.target.elements.year.value),
    };
    dispatch(setMainPageDateAction(newTodayDatabirthdate));
    dispatch(closeModalAction());
  };
  return (
    <div className={styles.container}>
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
            <Select
              disableUnderline
              displayEmpty
              autoWidth
              variant="standard"
              name="month"
              defaultValue={
                months.find((month) =>
                  month.name
                    .toLowerCase()
                    .startsWith(inputRefs.month.value.toLowerCase())
                ).name
              }
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              {Object.values(months).map((month) => {
                return (
                  <MenuItem value={month.name}>
                    {month.name.slice(0, 3).toLowerCase()}
                  </MenuItem>
                );
              })}
            </Select>
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
