import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CityInput.module.css";
import { ThemeProvider } from "@emotion/react";
import { cityInputTheme } from "../../utils/muiThemes";
import { Autocomplete, TextField } from "@mui/material";
import { cityInfoType } from "../../utils/types";
import getCities from "../../api/getCities";

type propsType = {
  title: string;
  name: string;
  placeholder: string;
};

export default function CityInput({ title, name, placeholder }: propsType) {
  const [citiesList, setCitiesList]: [
    cityInfoType[],
    Dispatch<SetStateAction<cityInfoType[]>>
  ] = useState([]);
  const [inputValue, setInputValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const updateCitiesList = async () => {
    const cities: cityInfoType[] = await getCities({
      query: inputValue,
    });
    console.log(inputValue);
    setCitiesList(cities);
  };
  useEffect(() => {
    if (!inputValue || inputValue.length < 5) {
      return;
    }
    updateCitiesList();
    // eslint-disable-next-line
  }, [inputValue]);
  return (
    <ThemeProvider theme={cityInputTheme}>
      <label className={styles.formFieldContainer}>
        <span className={styles.label}>{title}</span>
        <Autocomplete
          id={name}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              label={placeholder}
            />
          )}
          freeSolo
          onChange={(e) => {
            console.dir(e.target);
          }}
          sx={{ width: "203.4px", height: "26px" }}
          options={citiesList.map((city) => city.name)}
        />
        {/* <Input
          required
          disableUnderline
          type="text"
          name={name}
          placeholder={placeholder}
        /> */}
      </label>
    </ThemeProvider>
  );
}
