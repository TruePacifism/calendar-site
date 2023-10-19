import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Calculator.module.css";
import { months } from "../../enums";
import { monthType } from "../../utils/types";
import Container from "../../Components/Container/Container";
import { Select, MenuItem, Input, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ReactComponent as DownArrowIcon } from "../../images/down-arrow.svg";
import CustomCheckBoxGroup from "../../Components/CustomCheckBoxGroup";
import { birthtimeTheme, mainTheme } from "../../utils/muiThemes";
import { useNavigate } from "react-router-dom";

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
  const [selectedMonth, setSelectedMonth]: [
    monthType,
    Dispatch<SetStateAction<monthType>>
  ] = useState(months[0]);

  // const [selectedGender, setSelectedGender]: [
  //   genderType,
  //   Dispatch<SetStateAction<genderType>>
  // ] = useState("Мужской");

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

    const data = {
      name: e.target.elements.name.value,
      birthdate: {
        year: Number(e.target.elements.year.value),
        month: Number(e.target.elements.month.value),
        day: Number(e.target.elements.day.value),
        hour: Number(e.target.elements.hour.value),
        minute: Number(e.target.elements.minute.value),
      },
      gender: e.target.elements.gender[0].checked ? "Мужской" : "Женский",
      birthcity: e.target.elements.birthcity.value,
      livingcity: e.target.elements.livingcity.value,
    };
    console.log(data);
    const params = new URLSearchParams();
    Object.entries(data).forEach(([name, value]) => {
      params.set(name, value.toString());
    });
    console.log(params);

    navigate("/card");
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
            <Input
              required
              disableUnderline
              type="text"
              name="name"
              placeholder="имя"
            />
          </label>
          <label className={styles.formFieldContainer}>
            <span className={styles.label}>Дата рождения</span>
            <div className={styles.dateInputBox}>
              <Select
                variant="outlined"
                name="day"
                defaultValue="ДД"
                IconComponent={DownArrowIcon}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
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
              <Select
                variant="outlined"
                name="year"
                defaultValue="ГГГГ"
                IconComponent={DownArrowIcon}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              >
                <MenuItem value={"ГГГГ"}>ГГГГ</MenuItem>
                {yearsArray.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </div>
          </label>
          <div className={styles.formFieldContainer}>
            <span className={styles.label}>Пол</span>
            <div className={styles.dateInputBox}>
              <CustomCheckBoxGroup
                checkboxesInfo={[
                  {
                    title: "Мужской",
                    value: "male",
                  },
                  {
                    title: "Женский",
                    value: "female",
                  },
                ]}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <span className={styles.label}>Время рождения</span>
            <div className={styles.dateInputBox}>
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
          <label className={styles.formFieldContainer}>
            <span className={styles.label}>Место рождения</span>
            <Input
              required
              disableUnderline
              type="text"
              name="birthcity"
              placeholder="населенный пункт"
            />
          </label>{" "}
          <label className={styles.formFieldContainer}>
            <span className={styles.label}>Место жительства</span>
            <Input
              required
              disableUnderline
              type="text"
              name="livingcity"
              placeholder="населенный пункт"
            />
          </label>
          <Button type="submit">РАССЧИТАТЬ</Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}
