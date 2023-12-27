import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./CardOptionsModal.module.css";
import CardOptionsItem from "../CardOptionsItem/CardOptionsItem";
import { ReactComponent as ThreePointsIcon } from "../../images/three-points-icon.svg";
import { cardInfoType, inputDataType, stateType } from "../../utils/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModalAction,
  deleteCardAction,
  openModalAction,
} from "../../utils/store";
import deleteCard from "../../api/deleteCard";
import CardDeletionPopup from "../CardDeletionPopup/CardDeletionPopup";

type propsType = {
  cardRef: React.MutableRefObject<HTMLDivElement>;
  cardData: cardInfoType;
  position?: "left" | "right";
};

export default function CardOptionsModal({
  cardRef,
  cardData,
  position,
}: propsType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector<stateType, string>((store) => store.token);

  const handleOpenCard = useCallback(() => {
    const { name, birthdate, birthcity, gender, livingcity } = cardData;
    const inputData: inputDataType = {
      name,
      birthdate,
      birthcity,
      gender,
      livingcity,
    };
    navigate({
      search: createSearchParams({
        inputData: JSON.stringify(inputData),
      }).toString(),
      pathname: "/cards",
    });
    dispatch(closeModalAction());
  }, [dispatch, navigate, cardData]);
  const handleDeleteCard = useCallback(async () => {
    const { id } = cardData;
    const response = await deleteCard({ id, token });
    console.log(response);
    dispatch(deleteCardAction(id));
    dispatch(openModalAction(<CardDeletionPopup />));
    setTimeout(() => {
      dispatch(closeModalAction());
    }, 1000);
  }, [dispatch, token, cardData]);
  const [isShowingGroups, setIsShowingGroups]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const groupButtonRef: LegacyRef<HTMLLIElement> = useRef();
  // eslint-disable-next-line
  const listRef = useRef();
  const handleOpenGroups = useCallback(() => {
    console.log(groupButtonRef);

    setIsShowingGroups(true);
  }, []);
  const handleCancel = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);
  // eslint-disable-next-line
  const [cardBounds, setCardBounds]: [
    DOMRect,
    Dispatch<SetStateAction<DOMRect>>
  ] = useState(cardRef.current.getBoundingClientRect());
  return (
    <div className={styles.container}>
      <ul
        className={styles.list}
        style={{
          top: cardBounds.y,
          left:
            document.getElementById("root").getBoundingClientRect().width > 400
              ? cardBounds.x -
                (document.getElementById("root").getBoundingClientRect().width -
                  400) /
                  2
              : cardBounds.x,
          width: cardBounds.width,
          height: cardBounds.height,
        }}
      >
        <ThreePointsIcon className={styles.icon} />
        <CardOptionsItem title="ОТКРЫТЬ" onClick={handleOpenCard} />
        <CardOptionsItem title="УДАЛИТЬ" onClick={handleDeleteCard} />
        <CardOptionsItem
          ref={groupButtonRef}
          title="ГРУППА"
          onClick={handleOpenGroups}
        />
        <CardOptionsItem title="ОТМЕНА" onClick={handleCancel} />
      </ul>
      {isShowingGroups && groupButtonRef.current && (
        <ul
          className={styles.groupsList}
          style={{
            top: groupButtonRef.current.getBoundingClientRect().y,
            left:
              position === "left"
                ? cardBounds.x - cardBounds.width - 26
                : cardBounds.x - cardBounds.width - 26,
            width: cardBounds.width,
            height: cardBounds.height,
          }}
        >
          <CardOptionsItem title="ОТКРЫТЬ" onClick={handleOpenCard} />
          <CardOptionsItem title="УДАЛИТЬ" onClick={handleDeleteCard} />
          <CardOptionsItem
            title="ГРУППА"
            ref={groupButtonRef}
            onClick={() => {
              console.log("ГРУППА");
            }}
          />
          <CardOptionsItem title="ОТМЕНА" onClick={handleCancel} />
        </ul>
      )}
    </div>
  );
}
