import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Calculator.module.css";
import { months } from "../../enums";
import { cityInfoType, monthType } from "../../utils/types";
import Container from "../../Components/Container/Container";
import { Select, MenuItem, Input, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ReactComponent as DownArrowIcon } from "../../images/down-arrow.svg";
import CustomCheckBoxGroup from "../../Components/CustomCheckBoxGroup";
import {
  birthtimeTheme,
  dateInputTheme,
  mainTheme,
} from "../../utils/muiThemes";
import { createSearchParams, useNavigate } from "react-router-dom";
import CityInput from "../../Components/CityInput/CityInput";
import validateNumbersInput from "../../utils/validateNumbersInput";

const getPreetyNumber = (number: number): string => {
  let formattedNum: string = String(number); // Преобразовываем число в строку

  if (formattedNum.length < 2) {
    formattedNum = `0${formattedNum}`; // Добавляем ведущий ноль, если число состоит из одной цифры
  }

  return formattedNum;
};

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

const yearsArray: number[] = [];
for (let i = 1800; i < 2100; i++) {
  yearsArray.push(i);
}
const hoursArray: number[] = [];
for (let i = 1; i < 25; i++) {
  hoursArray.push(i);
}
const minutesArray: number[] = [];
for (let i = 1; i < 61; i++) {
  minutesArray.push(i);
}

export default function Calculator() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth]: [
    monthType,
    Dispatch<SetStateAction<monthType>>
  ] = useState(months[0]);
  const [selectedYear, setSelectedYear]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState();
  const [selectedHour, setSelectedHour]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState();
  const [selectedMinute, setSelectedMinute]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState();
  const [selectedLivingCity, setSelectedLivingCity]: [
    cityInfoType,
    Dispatch<SetStateAction<cityInfoType>>
  ] = useState();
  const [selectedBirthCity, setSelectedBirthCity]: [
    cityInfoType,
    Dispatch<SetStateAction<cityInfoType>>
  ] = useState();
  const onSubmit = (
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
    console.dir(e.target.elements);

    const { year, month, day, hour, minute } = e.target.elements;

    let gender: string;

    if (e.target.elements.gender[0].checked) {
      gender = "male";
    } else if (e.target.elements.gender[1].checked) {
      gender = "female";
    } else {
      gender = "";
    }
    const inputData = {
      name: e.target.elements.name.value,
      birthdate: {
        year: year.value ? Number(year.value) : -1,
        month:
          month.value !== "ММ"
            ? months.find((thisMonth) => thisMonth.name === month.value)
                .orderNumber
            : -1,
        day: day.value !== "ДД" ? Number(day.value) : -1,
        hour: hour.value ? Number(hour.value) : -1,
        minute: minute.value ? Number(minute.value) : -1,
      },
      gender: gender,
      birthcity: selectedBirthCity,
      livingcity: selectedLivingCity,
    };
    navigate({
      pathname: "/cards",
      search: createSearchParams({
        inputData: JSON.stringify(inputData),
      }).toString(),
    });
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Container paddingLeftRight={26} paddingTopBottom={26}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <label className={styles.formFieldContainer}>
            <span className={styles.label}>ФИО</span>
            <Input disableUnderline type="text" name="name" placeholder="имя" />
          </label>
          <label className={styles.formFieldContainer}>
            <span className={styles.label}>Дата рождения</span>
            <div className={styles.dateInputBox}>
              <ThemeProvider theme={dateInputTheme}>
                <Select
                  variant="outlined"
                  name="day"
                  defaultValue="ДД"
                  type="number"
                  inputProps={{ max: 31, min: 0 }}
                  IconComponent={DownArrowIcon}
                  onChange={(e) => {}}
                >
                  <MenuItem value={"ДД"}>ДД</MenuItem>
                  {getMonthDaysArray(selectedMonth, selectedYear).map((day) => (
                    <MenuItem value={day}>{getPreetyNumber(day)}</MenuItem>
                  ))}
                </Select>
                <Select
                  variant="outlined"
                  name="month"
                  defaultValue="ММ"
                  IconComponent={DownArrowIcon}
                  onChange={(e) => {
                    const month = months.find(
                      (month) => month.name === e.target.value
                    );
                    setSelectedMonth(month ? month : months[0]);
                  }}
                >
                  <MenuItem value={"ММ"}>ММ</MenuItem>
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
                  required
                  type="tel"
                  name="year"
                  placeholder="ГГГГ"
                  value={Number.isNaN(selectedYear) ? "" : selectedYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedYear(
                      value.length > 3
                        ? validateNumbersInput(value, 1800, 2500)
                        : Number.parseInt(value)
                    );
                  }}
                  onBlur={(e) => {
                    setSelectedYear(
                      validateNumbersInput(e.target.value, 1800, 2500)
                    );
                  }}
                />
                {/* <Select
                variant="outlined"
                name="year"
                defaultValue="ГГГГ"
                IconComponent={DownArrowIcon}
                onChange={(e) => {}}
              >
                <MenuItem value={"ГГГГ"}>ГГГГ</MenuItem>
                {yearsArray.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select> */}
              </ThemeProvider>
            </div>
          </label>
          <div className={styles.formFieldContainer}>
            <span className={styles.label}>Пол</span>
            <div className={styles.genderInputBox}>
              <CustomCheckBoxGroup
                required
                checkboxesInfo={[
                  {
                    title: "мужской",
                    value: "male",
                  },
                  {
                    title: "женский",
                    value: "female",
                  },
                ]}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <span className={styles.label}>Время рождения</span>
            <div className={styles.hourInputBox}>
              <ThemeProvider theme={birthtimeTheme}>
                <Input
                  disableUnderline
                  type="number"
                  name="hour"
                  placeholder="час"
                  value={Number.isNaN(selectedHour) ? "" : selectedHour}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedHour(validateNumbersInput(value, 0, 23));
                  }}
                  onBlur={(e) => {
                    setSelectedHour(
                      validateNumbersInput(e.target.value, 0, 23)
                    );
                    console.log(selectedHour);
                  }}
                />
                <Input
                  disableUnderline
                  type="number"
                  name="minute"
                  placeholder="мин"
                  value={Number.isNaN(selectedMinute) ? "" : selectedMinute}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedMinute(validateNumbersInput(value, 0, 59));
                  }}
                  onBlur={(e) => {
                    setSelectedMinute(
                      validateNumbersInput(e.target.value, 0, 59)
                    );
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
          <CityInput
            name="birthcity"
            title="Место рождения"
            placeholder="населенный пункт"
            doneFor="calculator"
            onChange={(e, value) => {
              setSelectedBirthCity(value);
            }}
          />
          <CityInput
            name="livingcity"
            title="Место жительства"
            placeholder="населенный пункт"
            doneFor="calculator"
            onChange={(e, value) => {
              setSelectedLivingCity(value);
            }}
          />
          <Button className={styles.countButton} type="submit">
            РАССЧИТАТЬ
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}
