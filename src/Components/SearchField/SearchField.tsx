import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./SearchField.module.css";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAction,
  openModalAction,
  setModalTop,
} from "../../utils/store";
import { cardInfoType, inputDataType, stateType } from "../../utils/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { normalizeBirthdate } from "../../utils/normalizeBirthdateString";
import { months } from "../../enums";

function SearchFieldModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector<stateType, cardInfoType[]>(
    (store) => store.user.cards
  );
  const [searchValue, setSearchValue]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);
  return (
    <>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.icon} />
        <input
          className={styles.placeholder}
          value={searchValue}
          autoFocus
          onChange={(e) => {
            console.log(e);
            setSearchValue(e.target.value);
          }}
          placeholder="найти карту"
        />
      </div>
      <ul className={styles.searchResultList}>
        {cards &&
          searchValue !== "" &&
          cards
            .filter(
              (card) =>
                card.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                searchValue
                  .split(" ")
                  .every(
                    (searchPart) =>
                      normalizeBirthdate(card.birthdate).includes(searchPart) ||
                      (card.birthdate.month + 1 < 10
                        ? "0" + card.birthdate.month + 1
                        : card.birthdate.month + 1
                      )
                        .toString()
                        .includes(searchPart) ||
                      months[card.birthdate.month].name
                        .toLowerCase()
                        .includes(searchPart)
                  )
            )
            .map((card) => (
              <li
                className={styles.searchResultItem}
                onClick={(e) => {
                  e.stopPropagation();
                  const { name, birthdate, birthcity, gender, livingcity } =
                    card;
                  const inputData: inputDataType = {
                    name,
                    birthdate,
                    birthcity,
                    gender,
                    livingcity,
                  };
                  dispatch(closeModalAction());
                  navigate({
                    search: createSearchParams({
                      inputData: JSON.stringify(inputData),
                      id: card.id,
                    }).toString(),
                    pathname: "/cards",
                  });
                }}
              >
                {card.name}
              </li>
            ))}
      </ul>
    </>
  );
}

export default function SearchField() {
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLDivElement>(null);
  const fetchClickSearch = useCallback(() => {
    if (!searchRef.current) {
      return;
    }
    dispatch(setModalTop(0));
    dispatch(
      openModalAction(
        <div
          className={styles.container}
          style={{
            position: "absolute",
            top: searchRef.current.getBoundingClientRect().top,
            left: 13,
            width: "calc(100% - 13px*2)",
          }}
        >
          <SearchFieldModal />
        </div>
      )
    );
  }, [dispatch]);

  return (
    <div
      ref={searchRef}
      className={styles.searchContainer}
      onClick={fetchClickSearch}
    >
      <SearchIcon className={styles.icon} />
      <span className={styles.placeholder}>Найти карту</span>
    </div>
  );
}
