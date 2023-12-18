import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Cards.module.css";
import FiltersList from "../../Components/FiltersList/FiltersList";
import { ReactComponent as ListIcon } from "../../images/list-icon.svg";
import { ReactComponent as GridIcon } from "../../images/grid-icon.svg";
import { ReactComponent as SortingIcon } from "../../images/sorting-icon.svg";
import CardGridItem from "../../Components/CardGridItem/CardGridItem";
import { cardInfoType, inputDataType, stateType } from "../../utils/types";
import { Input } from "@mui/material";
import CardListItem from "../../Components/CardListItem/CardListItem";
import { useDispatch, useSelector } from "react-redux";
import { clearLoadingImages, setLoadingAction } from "../../utils/store";
import { useLocation, useSearchParams } from "react-router-dom";
import Card from "../Card/Card";

export default function Cards() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  // eslint-disable-next-line
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] =
    useState("all");
  const [isFullCards, setIsFullCards]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const [id, setId]: [string, Dispatch<SetStateAction<string>>] = useState();
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
  useEffect(() => {
    console.log(cardsInfo);
    console.log(cardsInfo.length === 0);
    console.log(!cardsInfo);
    console.log(!cardsInfo || cardsInfo.length === 0);
    if (cardsInfo && cardsInfo.length !== 0) {
      dispatch(setLoadingAction({ value: true, from: "loaded cards page" }));
    } else {
      dispatch(
        setLoadingAction({ value: false, from: "loaded empty cards page" })
      );
    }
    return () => {
      dispatch(clearLoadingImages());
    };
  }, [dispatch, cardsInfo]);

  const [inputData, setInputData]: [
    inputDataType,
    Dispatch<SetStateAction<inputDataType>>
  ] = useState();
  const location = useLocation();
  useEffect(() => {
    if (!location.state || !location.state.inputData || params.get("data")) {
      console.log(location.state);
      console.log(params.get("data"));
      return;
    }
    if (params.get("data")) {
      dispatch(setLoadingAction({ value: false, from: "just calculator" }));
    }
    dispatch(setLoadingAction({ value: true, from: "card loaded from cards" }));
    const { inputData, id } = location.state;
    params.set("inputData", JSON.stringify(inputData));
    setParams(params);
    setId(id);
  }, [location, params, setParams, dispatch]);
  useEffect(() => {
    const data = params.get("inputData");

    if (data) {
      setInputData(JSON.parse(data));
    } else {
      setInputData(null);
    }
  }, [params, dispatch]);

  return inputData ? (
    <Card id={id} inputData={inputData} />
  ) : (
    <div>
      <FiltersList
        onChange={(e) => {
          setFilter(e.target.value);
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
    </div>
  );
}
