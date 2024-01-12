import React, { useCallback, useRef } from "react";
import styles from "./SearchField.module.css";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../utils/store";
import { ThemeProvider } from "@emotion/react";
import { searchModalTheme } from "../../utils/muiThemes";
import { Autocomplete, TextField, useAutocomplete } from "@mui/material";
import { cardInfoType, stateType } from "../../utils/types";

export default function SearchField() {
  const dispatch = useDispatch();
  const cards = useSelector<stateType, cardInfoType[]>(
    (store) => store.user.cards
  );
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: cards,
    getOptionLabel: (cards) => cards.name,
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const fetchClickSearch = useCallback(() => {
    if (!searchRef.current) {
      return;
    }
    dispatch(
      openModalAction(
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
            <input {...getInputProps()} />
          </div>
          {groupedOptions.length > 0 ? (
            <ul
              style={{
                width: 200,
                margin: 0,
                padding: 0,
                zIndex: 1,
                position: "absolute",
                listStyle: "none",
                backgroundColor: "#fff",
                overflow: "auto",
                maxHeight: 200,
                border: "1px solid rgba(0,0,0,.25)",
                // "& li.Mui-focused": {
                //   backgroundColor: "#4a8df6",
                //   color: "white",
                //   cursor: "pointer",
                // },
                // "& li:active": {
                //   backgroundColor: "#2977f5",
                //   color: "white",
                // },
              }}
              {...getListboxProps()}
            >
              {(groupedOptions as typeof cards).map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option.name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )
    );
  }, [
    dispatch,
    searchRef.current,
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  ]);
  // <div
  //   className={styles.container}
  //   style={{
  //     position: "absolute",
  //     top: searchRef.current.getBoundingClientRect().top,
  //     left: 26,
  //     width:
  //       window.innerWidth > 400
  //         ? 400 - 26 * 2
  //         : (window.innerWidth - 400) / 2 - 26 * 2,
  //   }}
  // >
  //   <SearchIcon className={styles.icon} />
  //   <span className={styles.placeholder}>Найти карту</span>
  // </div>

  return (
    <div
      ref={searchRef}
      className={styles.container}
      onClick={fetchClickSearch}
    >
      <SearchIcon className={styles.icon} />
      <span className={styles.placeholder}>Найти карту</span>
    </div>
  );
}
