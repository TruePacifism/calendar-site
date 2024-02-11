import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CityInput.module.css";
import { ThemeProvider } from "@emotion/react";
import { cityInputTheme, loginTheme } from "../../utils/muiThemes";
import {
  Autocomplete,
  TextField,
  TextFieldProps,
  debounce,
} from "@mui/material";
import { cityInfoType } from "../../utils/types";
import getCities from "../../api/getCities";

type doneForType = "calculator" | "homeModal" | "loginPage";

type propsType = {
  title: string;
  name: string;
  placeholder: string;
  doneFor: doneForType;
  defaultValue?: string;
} & TextFieldProps;

export default function CityInput({
  title,
  name,
  placeholder,
  doneFor,
  defaultValue,
}: propsType) {
  const [citiesList, setCitiesList]: [
    cityInfoType[],
    Dispatch<SetStateAction<cityInfoType[]>>
  ] = useState([]);
  const [inputValue, setInputValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  // const updateInputDebounced = debounce(updateInput, 2000)
  const updateInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    },
    300
  );
  const updateCitiesList = async () => {
    const cities: cityInfoType[] = await getCities({
      query: inputValue.trim(),
    });
    if (cities.length === 0) {
      return;
    }
    setCitiesList(cities);
  };
  useEffect(() => {
    if (!inputValue) {
      setCitiesList([]);
      return;
    }
    updateCitiesList();
    // eslint-disable-next-line
  }, [inputValue]);
  return (
    <ThemeProvider
      theme={doneFor === "loginPage" ? loginTheme : cityInputTheme}
    >
      <label
        className={styles.formFieldContainer}
        style={{
          width: doneFor === "loginPage" ? "100%" : undefined,
          marginBottom: 26,
        }}
      >
        {doneFor !== "loginPage" && (
          <span className={styles.label}>{title}</span>
        )}
        <Autocomplete
          id={name}
          // renderOption={(props, option) => {
          //   console.log(props);

          //   return (
          //     <li {...props} key={option}>
          //       {option}
          //     </li>
          //   );
          // }}

          defaultValue={defaultValue}
          renderInput={(params) =>
            citiesList ? (
              <TextField
                {...params}
                InputLabelProps={{ shrink: true }}
                name={name}
                onChange={updateInput}
                label={placeholder}
                defaultValue={defaultValue}
                required={doneFor === "loginPage"}
                error={doneFor === "loginPage" && inputValue === ""}
              />
            ) : (
              <></>
            )
          }
          freeSolo
          size={doneFor === "loginPage" ? "small" : "medium"}
          sx={
            doneFor === "loginPage"
              ? { width: "100%" }
              : { width: "203.4px", height: "100%" }
          }
          options={citiesList.map((city) => city.name)}
        />
      </label>
    </ThemeProvider>
  );
}
