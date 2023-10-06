import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  InputLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { basicButtonBorderColor, hiddenTextColor } from "../utils/vars";

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

export type checkboxInfoType = {
  title: string;
  value: string;
};

type propsType = {
  checkboxesInfo: checkboxInfoType[];
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  className?: string;
};

export default function CustomCheckBoxGroup({
  checkboxesInfo,
  onChange,
  className,
}: propsType) {
  const [selectedCheckbox, setSelectedCheckbox]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState();

  return (
    <ThemeProvider theme={radioTheme}>
      <RadioGroup
        name="gender"
        onChange={(e, value) => {
          setSelectedCheckbox(value);
          onChange(e, value);
        }}
        className={className}
      >
        {checkboxesInfo.map((checkboxInfo, idx) => (
          <ThemeProvider
            theme={
              selectedCheckbox === checkboxInfo.value
                ? selectedRadioTheme
                : radioTheme
            }
            key={idx}
          >
            <InputLabel>
              {checkboxInfo.title}
              <Radio
                defaultChecked={idx === 1}
                value={checkboxInfo.value}
                title={checkboxInfo.title}
                hidden
              />
            </InputLabel>
          </ThemeProvider>
        ))}
      </RadioGroup>
    </ThemeProvider>
  );
}
