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
import { stateType, userType } from "../../utils/types";
import { months } from "../../enums";
import { cardColumnNameType } from "../CardColumn/CardColumn";
import validateNumbersInput from "../../utils/validateNumbersInput";

const normalizeTime = (hour: number, minute: number): string => {
  if (hour > 23) {
    hour = 23;
  }
  if (hour < 0) {
    hour = 0;
  }
  if (minute > 59) {
    minute = 59;
  }
  if (minute < 0) {
    minute = 0;
  }
  if (Number.isNaN(hour) && Number.isNaN(minute)) {
    return "";
  }
  if (Number.isNaN(hour)) {
    return `00:${minute}`;
  }
  if (Number.isNaN(minute)) {
    return `${hour < 10 ? hour : hour + ":"}`;
  }
  return `${hour < 10 ? "0" + hour : hour}:${minute}`;
};

export type propsType = {
  selected: cardColumnNameType;
};
export default function InputTodayModal({ selected }: propsType) {
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
  const thisHourRef = useRef<HTMLInputElement>(null);
  const thisDayRef = useRef<HTMLInputElement>(null);
  const thisMonthRef = useRef<HTMLInputElement>(null);
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
  const [dayValue, setDayValue]: [number, Dispatch<SetStateAction<number>>] =
    useState(Number.parseInt(inputRefs.day.value));
  const [monthValue, setMonthValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState(inputRefs.month.value);
  const [yearValue, setYearValue]: [number, Dispatch<SetStateAction<number>>] =
    useState(Number.parseInt(inputRefs.year.value));

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHourValue((oldValue) => {
      let hour = Number.parseInt(newValue.split(":")[0]);
      let minute = Number.parseInt(newValue.split(":")[1]);
      // let oldHour = Number.parseInt(oldValue.split(":")[0]);
      // let oldMinute = Number.parseInt(oldValue.split(":")[1]);
      if (newValue + ":" === oldValue || oldValue + ":" === newValue) {
        return newValue;
      }
      return normalizeTime(hour, minute);
      // const addedSymbol =
      //   oldValue.length < newValue.length
      //     ? newValue.charAt(newValue.length - 1)
      //     : null;
      // const removedSymbol =
      //   oldValue.length > newValue.length
      //     ? oldValue.charAt(oldValue.length - 1)
      //     : null;
      // if (/^\d{0,2}:\d{0,2}$/.test(newValue)) {
      //   if (addedSymbol) {
      //     return newValue;
      //   }
      // }
      // if (/^\d{0,2}/.test(newValue)) {
      //   if (addedSymbol) {
      //     return newValue + ":";
      //   }
      // }
    });
  };
  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(monthValue);
    console.log(months.map((month) => month.name));

    const currentMonth = months.find((month) => month.name === monthValue);
    const maxDay =
      yearValue % 4 === 0 && currentMonth.name === "Февраль"
        ? 29
        : currentMonth.length;
    setDayValue(validateNumbersInput(e.target.value, 0, maxDay));
  };
  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 4) {
      setYearValue(Number.parseInt(e.target.value));
      return;
    }
    setYearValue(validateNumbersInput(e.target.value, 1900, 2500));
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
              value={hourValue}
              type="tel"
              onChange={handleHourChange}
              defaultValue={inputRefs.hour.value}
              inputRef={thisHourRef}
            />
            <Input
              disableUnderline
              name="day"
              type="tel"
              defaultValue={inputRefs.day.value}
              inputRef={thisDayRef}
              value={Number.isNaN(dayValue) ? "" : dayValue}
              onChange={handleDayChange}
            />
            <Select
              disableUnderline
              displayEmpty
              autoWidth
              variant="standard"
              type="tel"
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
                  (month) => month.name === monthValue
                );
                const maxDay =
                  yearValue % 4 === 0 && currentMonth.name === "Февраль"
                    ? 29
                    : currentMonth.length;
                setDayValue(
                  validateNumbersInput(dayValue.toString(), 0, maxDay)
                );
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
                setYearValue(validateNumbersInput(e.target.value, 1900, 2500));
                const currentMonth = months.find(
                  (month) => month.name === monthValue
                );
                const maxDay =
                  yearValue % 4 === 0 && currentMonth.name === "Февраль"
                    ? 29
                    : currentMonth.length;
                setDayValue(
                  validateNumbersInput(dayValue.toString(), 0, maxDay)
                );
              }}
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
