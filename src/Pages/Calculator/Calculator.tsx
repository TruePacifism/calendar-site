import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Calculator.module.css";
import { months } from "../../enums";
import { genderType, monthType } from "../../types";
import Container from "../../Components/Container/Container";
import {
  Select,
  MenuItem,
  Input,
  RadioGroup,
  Radio,
  InputLabel,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  accentColor,
  basicButtonBorderColor,
  hiddenTextColor,
} from "../../utils/vars";
import { ReactComponent as DownArrowIcon } from "../../images/down-arrow.svg";
import CustomCheckBoxGroup from "../../Components/CustomCheckBoxGroup";

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

const mainTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          paddingTop: "0",
          paddingLeft: "2px",
          paddingRight: "11px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "left",

          paddingBottom: "0",
          ":not": {
            ":last-child": {
              marginRight: "5px",
            },
          },
        },
        icon: {
          fill: hiddenTextColor,
          opacity: 1,
          width: "17px",
          height: "17px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "26px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 29,
          paddingRight: 29,
          color: "#ffffff",
          backgroundColor: accentColor,
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "0em",
          textAlign: "center",
          display: "block",
          marginRight: "auto",
          "&:hover": {
            backgroundColor: accentColor,
            opacity: 0.8,
          },
        }),
      },
    },
  },
});

const radioTheme = createTheme({
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          justifyContent: "space-between",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          opacity: 0,
          width: 0,
          height: 0,
          display: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

const selectedRadioTheme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          opacity: 0,
          width: 0,
          height: 0,
          display: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          border: `1px solid ${hiddenTextColor}`,
          borderRadius: "5px",
          backgroundColor: hiddenTextColor,
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: "white",
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

const birthtimeTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          boxSizing: "border-box",
          border: `1px solid ${basicButtonBorderColor}`,
          borderRadius: "5px",
          height: "26px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          fontWeight: "400",
          width: 52,
          paddingLeft: 10,
          paddingRight: 10,
          letterSpacing: "0em",
          color: hiddenTextColor,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
});

mainTheme.spacing(5);

export default function Calculator() {
  const [selectedMonth, setSelectedMonth]: [
    monthType,
    Dispatch<SetStateAction<monthType>>
  ] = useState(months[0]);

  const [selectedGender, setSelectedGender]: [
    genderType,
    Dispatch<SetStateAction<genderType>>
  ] = useState("Мужской");

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
    };
    console.log(data);
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
              name="livecity"
              placeholder="населенный пункт"
            />
          </label>
          <Button type="submit">РАССЧИТАТЬ</Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}
