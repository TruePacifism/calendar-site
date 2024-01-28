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
import normalizeNumber from "../../utils/normalizeNumber";

const normalizeTime = (hour: string, minute: string): string => {
  const hourValue = Number.parseInt(hour);
  const minuteValue = Number.parseInt(minute);

  if (hour.length < 2 && minute === undefined) {
    return hour;
  }
  if (hour.length === 2 && minute === undefined) {
    if (hourValue < 0) {
      return "00:";
    } else if (hourValue > 23) {
      return "23:";
    } else {
      return hour + ":";
    }
  }
  if (hour.length > 2) {
    return hour.substring(0, 2) + ":" + hour.charAt(2);
  }
  if (minute.length < 2) {
    return hour + ":" + minute;
  }
  if (minute.length === 2) {
    if (minuteValue < 0) {
      return hour + ":00";
    } else if (minuteValue > 59) {
      return hour + ":59";
    } else {
      return hour + ":" + minute;
    }
  }
  // let oldHour = Number.parseInt(oldValue.split(":")[0]);
  // let oldMinute = Number.parseInt(oldValue.split(":")[1]);
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
      if (newValue.endsWith(":")) {
        return hour;
      }
      if (newValue + ":" === oldValue || oldValue + ":" === newValue) {
        return newValue;
      }
      if (newValue.length === 5 && oldValue.length === 4) {
        thisDayRef.current.focus();
      }
      return normalizeTime(hour, minute);
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
              value={dayValue}
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
