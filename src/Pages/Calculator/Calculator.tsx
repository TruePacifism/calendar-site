import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Calculator.module.css";
import { months } from "../../enums";
import { monthType } from "../../utils/types";
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
import { useNavigate } from "react-router-dom";
import CityInput from "../../Components/CityInput/CityInput";
import { useDispatch } from "react-redux";
import { setLoadingAction } from "../../utils/store";

const getPreetyNumber = (number: number): string => {
  let formattedNum: string = String(number); // Преобразовываем число в строку

  if (formattedNum.length < 2) {
    formattedNum = `0${formattedNum}`; // Добавляем ведущий ноль, если число состоит из одной цифры
  }

  return formattedNum;
};

const getMonthDaysArray = (month: monthType): number[] => {
  const days: number[] = [];
  for (let i = 0; i < month.length; i++) {
    days.push(i + 1);
  }
  return days;
};

const yearsArray: number[] = [];
for (let i = 1900; i < 2100; i++) {
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
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth]: [
    monthType,
    Dispatch<SetStateAction<monthType>>
  ] = useState(months[0]);

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
    dispatch(
      setLoadingAction({ value: true, from: "inputed data from calculator" })
    );
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
        month: month.value !== "ММ" ? Number(month.value) : -1,
        day: day.value !== "ДД" ? Number(day.value) : -1,
        hour: hour.value ? Number(hour.value) : -1,
        minute: minute.value ? Number(minute.value) : -1,
      },
      gender: gender,
      birthcity: e.target.elements.birthcity.value,
      livingcity: e.target.elements.livingcity.value,
    };
    navigate(`/cards`, { state: { inputData } });
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
                  IconComponent={DownArrowIcon}
                  onChange={(e) => {}}
                >
                  <MenuItem value={"ДД"}>ДД</MenuItem>
                  {getMonthDaysArray(selectedMonth).map((day) => (
                    <MenuItem value={day}>{getPreetyNumber(day)}</MenuItem>
                  ))}
                </Select>
                <Select
                  variant="outlined"
                  name="month"
                  defaultValue="ММ"
                  IconComponent={DownArrowIcon}
                  onChange={(e) => {
                    setSelectedMonth(months[Number(e.target.value)]);
                  }}
                >
                  <MenuItem value={"ММ"}>ММ</MenuItem>
                  {Object.values(months).map((month) => {
                    return (
                      <MenuItem value={month.orderNumber}>
                        {getPreetyNumber(month.orderNumber + 1)}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Input
                  disableUnderline
                  required
                  type="text"
                  name="year"
                  placeholder="ГГГГ"
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
                  type="text"
                  name="hour"
                  placeholder="час"
                />
                <Input
                  disableUnderline
                  type="text"
                  name="minute"
                  placeholder="мин"
                />
              </ThemeProvider>
            </div>
          </div>
          <CityInput
            name="birthcity"
            title="Место рождения"
            placeholder="населенный пункт"
          />
          <CityInput
            name="livingcity"
            title="Место жительства"
            placeholder="населенный пункт"
          />
          <Button type="submit">РАССЧИТАТЬ</Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}
