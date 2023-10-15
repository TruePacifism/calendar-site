import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Cards.module.css";
import FiltersList from "../../Components/FiltersList/FiltersList";
import { ReactComponent as ListIcon } from "../../images/list-icon.svg";
import { ReactComponent as GridIcon } from "../../images/grid-icon.svg";
import { ReactComponent as SortingIcon } from "../../images/sorting-icon.svg";
import CardGridItem from "../../Components/CardGridItem/CardGridItem";
import { cardInfoType } from "../../utils/types";
import cardInfoPlaceholder from "../../utils/cardPlaceholder";
import { Input } from "@mui/material";
import CardListItem from "../../Components/CardListItem/CardListItem";

export default function Cards() {
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] =
    useState("all");
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

  const [cardsInfo, setCardsInfo]: [
    cardInfoType[],
    Dispatch<SetStateAction<cardInfoType[]>>
  ] = useState();
  useEffect(() => {
    setCardsInfo([
      cardInfoPlaceholder,
      cardInfoPlaceholder,
      cardInfoPlaceholder,
      cardInfoPlaceholder,
    ]);
  }, []);

  return (
    <>
      <FiltersList
        onChange={(e) => {
          setFilter(e.target.value);
          console.log(filter);
        }}
      />
      <div className={styles.cardsInfoContainer}>
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
      </div>
    </>
  );
}
