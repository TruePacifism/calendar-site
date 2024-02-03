import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./Cards.module.css";
import { ReactComponent as ListIcon } from "../../images/list-icon.svg";
import { ReactComponent as GridIcon } from "../../images/grid-icon.svg";
import { ReactComponent as SortingIcon } from "../../images/sorting-icon.svg";
import CardGridItem from "../../Components/CardGridItem/CardGridItem";
import {
  cardInfoType,
  inputDataType,
  sortingType,
  stateType,
} from "../../utils/types";
import CardListItem from "../../Components/CardListItem/CardListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoadingImages,
  setLoadingAction,
  sortCardsAction,
  usedImages,
} from "../../utils/store";
import { useSearchParams } from "react-router-dom";
import Card from "../Card/Card";
import SearchField from "../../Components/SearchField/SearchField";
import useElementOnScreen from "../../utils/useElementOnScreen";
import { ReactComponent as ScrollTopIcon } from "../../images/scroll-top-icon.svg";

export default function Cards() {
  const [elementRef, isVisible] = useElementOnScreen(
    {
      rootMargin: "-107px",
    },
    true
  );
  const dispatch = useDispatch();
  const [selectedCardId, setSelectedCardId]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  // eslint-disable-next-line
  const [params, setParams] = useSearchParams();
  // eslint-disable-next-line
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] =
    useState("all");
  const [isFullCards, setIsFullCards]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  const [sortingOrder, setSortingOrder]: [
    sortingType,
    Dispatch<SetStateAction<sortingType>>
  ] = useState("newFirst");

  const switchCardView = () => {
    setIsFullCards(!isFullCards);
  };

  const cardsInfo = useSelector<stateType, cardInfoType[]>(
    (state) => state.user.cards
  );
  useEffect(() => {
    if (cardsInfo && cardsInfo.length !== 0 && usedImages.length === 0) {
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
  useEffect(() => {
    const data = params.get("inputData");

    if (data) {
      setInputData(JSON.parse(data));
    } else {
      setInputData(null);
    }
    const id = params.get("id");
    if (id) {
      setSelectedCardId(id);
    } else {
      setSelectedCardId("");
    }
  }, [params, dispatch]);
  useEffect(() => {
    if (!cardsInfo || cardsInfo.length < 2) {
      return;
    }
    dispatch(sortCardsAction(sortingOrder));
  }, [sortingOrder, dispatch, cardsInfo]);

  return inputData ? (
    <Card
      inputData={inputData}
      id={selectedCardId ? selectedCardId : undefined}
    />
  ) : (
    <div className={styles.mainContainer}>
      {/* <FiltersList
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      /> */}
      <ScrollTopIcon
        className={styles.scrollTopIcon}
        onClick={
          !isVisible
            ? () => {
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }
            : undefined
        }
        style={{
          opacity: isVisible || !elementRef.valueOf() ? 0 : 1,
          pointerEvents: isVisible || !elementRef.valueOf() ? "none" : "auto",
        }}
      />
      <div className={styles.cardsInfoContainer}>
        <div className={styles.heading}>КАРТОТЕКА</div>
        <div
          className={styles.topContainer}
          ref={elementRef as LegacyRef<HTMLDivElement>}
        >
          <div className={styles.viewSettings}>
            {isFullCards ? (
              <ListIcon className={styles.listIcon} onClick={switchCardView} />
            ) : (
              <GridIcon className={styles.gridIcon} onClick={switchCardView} />
            )}
            <div
              className={styles.sortingContainer}
              onClick={() => {
                setSortingOrder((oldSortingOrder) =>
                  oldSortingOrder === "newFirst" ? "oldFirst" : "newFirst"
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
          <SearchField />
        </div>
        {cardsInfo && cardsInfo.length > 0 ? (
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
        ) : (
          <div className={styles.noCardContainer}>
            <span className={styles.noCardMessage}>
              Здесь будут ваши сохраненные карты
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
