import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./InputTodayModal.module.css";
import { Button, Input, MenuItem, Select, ThemeProvider } from "@mui/material";
import { darkButtonTheme, homePageInput } from "../../utils/muiThemes";
import CityInput from "../CityInput/CityInput";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAction, setMainPageDateAction } from "../../utils/store";
import {
  cityInfoType,
  inputDataType,
  monthType,
  stateType,
} from "../../utils/types";
import { months } from "../../enums";
import { cardColumnNameType } from "../CardColumn/CardColumn";
import validateNumbersInput from "../../utils/validateNumbersInput";
import normalizeNumber from "../../utils/normalizeNumber";
import timeMask from "../../utils/timeMask";

const getMonthDaysArray = (month: monthType, year: number): number[] => {
  const days: number[] = [];
  for (let i = 0; i < month.length; i++) {
    days.push(i + 1);
  }
  if (month.orderNumber === 1 && year % 4 === 0) {
    days.push(29);
  }

  return days;
};

export type propsType = {
  selected: cardColumnNameType;
};
export default function InputTodayModal({ selected }: propsType) {
  const dispatch = useDispatch();
  const mainPageInfo = useSelector<stateType, inputDataType>(
    (state) => state.mainPageInfo
  );

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
  const thisHourRef = useRef<HTMLInputElement>(null);
  const thisDayRef = useRef<HTMLInputElement>(null);
  // const thisMonthRef = useRef<HTMLInputElement>(null);
  const thisYearRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!thisHourRef || !thisDayRef || !thisYearRef) {
      return;
    }
    switch (selected) {
      case "day":
        thisDayRef.current.focus();
        return;
      case "year":
        thisYearRef.current.focus();
        return;
      case "hour":
        thisHourRef.current.focus();
        return;

      default:
        break;
    }
  }, [selected]);
  const [hourValue, setHourValue]: [string, Dispatch<SetStateAction<string>>] =
    useState(inputRefs.hour.value);
  const [dayValue, setDayValue]: [string, Dispatch<SetStateAction<string>>] =
    useState(inputRefs.day.value);
  const [monthValue, setMonthValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(
    months.find(
      (month) =>
        month.name.substring(0, 3).toLowerCase() === inputRefs.month.value
    ).name
  );
  const [yearValue, setYearValue]: [number, Dispatch<SetStateAction<number>>] =
    useState(Number.parseInt(inputRefs.year.value));

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setHourValue((oldValue) => {
      let hour = newValue.split(":")[0];
      let minute = newValue.split(":")[1];
      const addedChar = newValue.substring(oldValue.length);
      if (addedChar && Number.isNaN(Number.parseInt(addedChar))) {
        return oldValue;
      }

      if (oldValue + ":" === newValue) {
        return newValue;
      }
      if (
        oldValue.length === 3 &&
        oldValue.endsWith(":") &&
        newValue.length === 2 &&
        !newValue.endsWith(":")
      ) {
        return hour.charAt(0);
      }
      if (
        oldValue.length === 2 &&
        newValue.length === 3 &&
        !oldValue.endsWith(":")
      ) {
        return oldValue + ":" + addedChar;
      }
      if (newValue.length >= 5 && oldValue.length >= 4) {
        return timeMask(hour, minute);
      }
      if (!hour || hour.length < 2) {
        return newValue;
      }
      if (!minute || minute.length === 0) {
        return timeMask(hour, minute).split(":")[0] + ":";
      }
      if (!minute || minute.length === 1) {
        return timeMask(hour, minute).split(":")[0] + ":" + minute;
      }

      return hour + ":" + minute;
    });
  };
  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentMonth = months.find((month) => month.name === monthValue);
    const maxDay =
      yearValue % 4 === 0 && currentMonth.name === "Февраль"
        ? 29
        : currentMonth.length;
    const validatedValue = validateNumbersInput(e.target.value, 0, maxDay);
    const normalizedValue: string = normalizeNumber(validatedValue, 2);
    setDayValue((oldValue) => {
      return normalizedValue;
    });
  };
  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 4) {
      setYearValue(Number.parseInt(e.target.value));
      return;
    }
    setYearValue(validateNumbersInput(e.target.value, 1800, 2500));
  };
  const formRef = useRef();
  // const hourInputRef = useRef<HTMLInputElement>();

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
            value: cityInfoType;
          };
          livingcity: {
            value: cityInfoType;
          };
          gender: any[];
        };
      };
    }
  ) => {
    e.preventDefault();

    const newTodayDatabirthdate: inputDataType = {
      birthdate: {
        hour: Number.parseInt(e.target.elements.hour.value.split(":")[0]),
        minute: Number.parseInt(e.target.elements.hour.value.split(":")[1]),
        day: Number.parseInt(e.target.elements.day.value),
        month: months.find(
          (month) => month.name === e.target.elements.month.value
        ).orderNumber,
        year: Number.parseInt(e.target.elements.year.value),
      },
      gender: "female",
      name: "today",
      livingcity: e.target.elements.livingcity.value,
      birthcity: e.target.elements.birthcity.value,
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
              value={hourValue}
              type="tel"
              onChange={handleHourChange}
              defaultValue={inputRefs.hour.value}
              inputRef={thisHourRef}
            />
            <Select
              disableUnderline
              displayEmpty
              autoWidth
              variant="standard"
              name="day"
              defaultValue={inputRefs.day.value}
              inputRef={thisDayRef}
              value={Number.parseInt(dayValue).toString()}
              onChange={handleDayChange}
            >
              {Object.values(
                getMonthDaysArray(
                  months.find((month) => month.name === monthValue),
                  yearValue
                )
              ).map((day) => {
                return <MenuItem value={day}>{day}</MenuItem>;
              })}
            </Select>
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
                setMonthValue(e.target.value);
                const currentMonth = months.find(
                  (month) => month.name === e.target.value
                );
                const maxDay =
                  yearValue % 4 === 0 && currentMonth.name === "Февраль"
                    ? 29
                    : currentMonth.length;
                const validatedValue = validateNumbersInput(
                  dayValue,
                  0,
                  maxDay
                );
                const normalizedValue: string = normalizeNumber(
                  validatedValue,
                  2
                );
                setDayValue(normalizedValue);
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
              inputRef={thisYearRef}
              disableUnderline
              type="tel"
              name="year"
              defaultValue={inputRefs.year.value}
              value={Number.isNaN(yearValue) ? "" : yearValue}
              onChange={handleYearChange}
              onBlur={(e) => {
                setYearValue(validateNumbersInput(e.target.value, 1800, 2500));
                const currentMonth = months.find(
                  (month) => month.name === monthValue
                );
                const maxDay =
                  yearValue % 4 === 0 && currentMonth.name === "Февраль"
                    ? 29
                    : currentMonth.length;

                const validatedValue = validateNumbersInput(
                  dayValue,
                  0,
                  maxDay
                );
                const normalizedValue: string = normalizeNumber(
                  validatedValue,
                  2
                );
                setDayValue(normalizedValue);
              }}
            />
          </div>
          <CityInput
            title="Место рождения"
            name="birthcity"
            placeholder="место рождения"
            doneFor="homeModal"
            defaultValue={mainPageInfo.birthcity}
          />
          <CityInput
            title="Место жительства"
            name="livingcity"
            placeholder="место жительства"
            doneFor="homeModal"
            defaultValue={mainPageInfo.livingcity}
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
