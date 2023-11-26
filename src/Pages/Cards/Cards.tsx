import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Cards.module.css";
import FiltersList from "../../Components/FiltersList/FiltersList";
import { ReactComponent as ListIcon } from "../../images/list-icon.svg";
import { ReactComponent as GridIcon } from "../../images/grid-icon.svg";
import { ReactComponent as SortingIcon } from "../../images/sorting-icon.svg";
import CardGridItem from "../../Components/CardGridItem/CardGridItem";
import { cardInfoType, stateType } from "../../utils/types";
import { Input } from "@mui/material";
import CardListItem from "../../Components/CardListItem/CardListItem";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction } from "../../utils/store";

export default function Cards() {
  // eslint-disable-next-line
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] =
    useState("all");
  const dispatch = useDispatch();
  const [isFullCards, setIsFullCards]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const [sortingOrder, setSortingOrder]: [
    "newFirst" | "oldFirst",
    Dispatch<SetStateAction<"newFirst" | "oldFirst">>
  ] = useState("newFirst");

  const switchCardView = () => {
    setIsFullCards(!isFullCards);
  };

  const cardsInfo = useSelector<stateType, cardInfoType[]>(
    (state) => state.user.cards
  );

  return (
    <>
      <FiltersList
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div
        className={styles.cardsInfoContainer}
        onLoadStart={() => {
          dispatch(setLoadingAction(true));
        }}
        onLoad={() => {
          dispatch(setLoadingAction(false));
        }}
      >
        <div className={styles.topContainer}>
          <div className={styles.viewSettings}>
            {isFullCards ? (
              <ListIcon className={styles.listIcon} onClick={switchCardView} />
            ) : (
              <GridIcon className={styles.gridIcon} onClick={switchCardView} />
            )}
            <div
              className={styles.sortingContainer}
              onClick={() => {
                setSortingOrder(
                  sortingOrder === "newFirst" ? "oldFirst" : "newFirst"
                );
              }}
            >
              <SortingIcon className={styles.sortingIcon} />
              {sortingOrder === "newFirst" ? (
                <span className={styles.sortingName}>new</span>
              ) : (
                <span className={styles.sortingName}>old</span>
              )}
            </div>
          </div>
          <div className={styles.searchContainer}>
            <Input />
            {/* <SearchIcon className={styles.searchIcon} /> */}
          </div>
        </div>
        {cardsInfo && (
          <>
            {isFullCards ? (
              <ul className={styles.cardsGrid}>
                {cardsInfo.map((cardInfo) => (
                  <CardGridItem cardInfo={cardInfo} />
                ))}
              </ul>
            ) : (
              <ul className={styles.cardList}>
                {cardsInfo.map((cardInfo) => (
                  <CardListItem cardInfo={cardInfo} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
