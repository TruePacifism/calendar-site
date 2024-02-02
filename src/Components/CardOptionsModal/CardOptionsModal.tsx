import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./CardOptionsModal.module.css";
import CardOptionsItem from "../CardOptionsItem/CardOptionsItem";
import { cardInfoType, inputDataType } from "../../utils/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModalAction, openModalAction } from "../../utils/store";
import CardDeletionPopup from "../CardDeletionPopup/CardDeletionPopup";
import { ReactComponent as CardOptionsButton } from "../../images/three-points-icon.svg";

type propsType = {
  cardRef: React.MutableRefObject<HTMLDivElement>;
  cardData: cardInfoType;
  position?: "left" | "right";
};

let firstResult: DOMRect = null;

export default function CardOptionsModal({
  cardRef,
  cardData,
  position,
}: propsType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenCard = useCallback(() => {
    const { name, birthdate, birthcity, gender, livingcity } = cardData;
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
        id: cardData.id,
      }).toString(),
      pathname: "/cards",
    });
  }, [dispatch, navigate, cardData]);
  const handleDeleteCard = useCallback(() => {
    dispatch(openModalAction(<CardDeletionPopup cardData={cardData} />));
  }, [dispatch, cardData]);
  // eslint-disable-next-line
  const [isShowingGroups, setIsShowingGroups]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const groupButtonRef: LegacyRef<HTMLLIElement> = useRef();
  // const handleClickGroups = useCallback(() => {
  //   setIsShowingGroups((oldIsShowingGroups) => {
  //     console.log(oldIsShowingGroups);
  //     return !oldIsShowingGroups;
  //   });
  // }, []);
  const handleCancel = useCallback(() => {
    firstResult = null;
    dispatch(closeModalAction());
  }, [dispatch]);
  // eslint-disable-next-line
  const [cardBounds, setCardBounds]: [
    DOMRect,
    Dispatch<SetStateAction<DOMRect>>
  ] = useState(cardRef.current.getBoundingClientRect());

  const groupButtonBounds: DOMRect = useMemo(() => {
    if (!groupButtonRef.current) {
      return;
    }
    if (!firstResult) {
      firstResult = groupButtonRef.current.getBoundingClientRect();
    }
    return firstResult
      ? firstResult
      : groupButtonRef.current.getBoundingClientRect();
    // eslint-disable-next-line
  }, [groupButtonRef.current]);

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        handleCancel();
      }}
    >
      <ul
        className={styles.list}
        style={{
          top:
            cardBounds.y + 239 > window.innerHeight
              ? window.innerHeight - 239 - 60 - 13 - 5
              : cardBounds.y,
          left: position === "left" ? 13 : undefined,
          right: position === "right" ? 13 : undefined,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CardOptionsButton className={styles.icon} />
        <CardOptionsItem title="ОТКРЫТЬ" onClick={handleOpenCard} />
        <CardOptionsItem title="УДАЛИТЬ" onClick={handleDeleteCard} />
        {/* <CardOptionsItem
          ref={groupButtonRef}
          title="ГРУППА"
          onClick={handleClickGroups}
        /> */}
        <CardOptionsItem title="ОТМЕНА" onClick={handleCancel} />
      </ul>
      {groupButtonBounds && (
        <div style={{ opacity: isShowingGroups ? 1 : 0 }}>
          <div
            className={styles.connectingLine}
            style={{
              top: groupButtonBounds.y + groupButtonBounds.height / 2,
              left:
                position === "right"
                  ? cardBounds.x - 26
                  : cardBounds.x + cardBounds.width,
              width: 26,
            }}
          ></div>
          <ul
            className={styles.groupsList}
            style={{
              top: groupButtonBounds.y - cardBounds.height / 13,
              left:
                position === "right"
                  ? cardBounds.x - cardBounds.width - 26
                  : cardBounds.x + cardBounds.width + 26,
              width: cardBounds.width,
              height: cardBounds.height - 20,
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
        </div>
      )}
    </div>
  );
}
