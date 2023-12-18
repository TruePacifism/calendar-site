import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CityInput.module.css";
import { ThemeProvider } from "@emotion/react";
import { cityInputTheme } from "../../utils/muiThemes";
import { Autocomplete, TextField, debounce } from "@mui/material";
import { cityInfoType } from "../../utils/types";
import getCities from "../../api/getCities";

type doneForType = "calculator" | "homeModal" | "loginPage";

type propsType = {
  title: string;
  name: string;
  placeholder: string;
  doneFor: doneForType;
};

export default function CityInput({
  title,
  name,
  placeholder,
  doneFor,
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
    <ThemeProvider theme={cityInputTheme}>
      <label className={styles.formFieldContainer}>
        <span
          className={styles.label}
          style={{ color: doneFor === "homeModal" ? "white" : "#02081e" }}
        >
          {title}
        </span>
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
          renderInput={(params) =>
            citiesList ? (
              <TextField
                {...params}
                name={name}
                onChange={updateInput}
                label={placeholder}
                sx={{ height: "26px" }}
              />
            ) : (
              <></>
            )
          }
          freeSolo
          sx={{ width: "203.4px", height: "100%" }}
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
