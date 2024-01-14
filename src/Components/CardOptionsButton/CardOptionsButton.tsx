import React, { useRef } from "react";
import styles from "./CardOptionsButton.module.css";
import { cardInfoType } from "../../utils/types";
import { ReactComponent as ThreePointsIcon } from "../../images/three-points-icon.svg";
import { useDispatch } from "react-redux";
import { openModalAction } from "../../utils/store";
import CardOptionsModal from "../CardOptionsModal/CardOptionsModal";

type propsType = {
  cardInfo: cardInfoType;
  cardRef: React.MutableRefObject<HTMLDivElement>;
};

export default function CardOptionsButton({ cardInfo, cardRef }: propsType) {
  const dispatch = useDispatch();
  const iconRef = useRef<SVGSVGElement>(null);

  // eslint-disable-next-line
  const handleThreePointsClick = () => {
    const rootWidth = document
      .getElementById("root")
      .getBoundingClientRect().width;
    const cardX = cardRef.current.getBoundingClientRect().x;
    const cardWidth = cardRef.current.getBoundingClientRect().width;
    const iconBounds = iconRef.current.getBoundingClientRect();

    dispatch(
      openModalAction(
        <>
          <ThreePointsIcon
            className={styles.threePointsIcon}
            style={{
              top: iconBounds.top,
              left: iconBounds.left,
            }}
          />
          <CardOptionsModal
            position={
              rootWidth / 2 < cardX ||
              cardWidth > rootWidth / 2 ||
              cardWidth > 200
                ? "right"
                : "left"
            }
            cardData={cardInfo}
            cardRef={cardRef}
          />
        </>
      )
    );
  };

  return (
    <ThreePointsIcon
      ref={iconRef}
      className={styles.threePointsIcon}
      onClick={handleThreePointsClick}
    />
  );
}
