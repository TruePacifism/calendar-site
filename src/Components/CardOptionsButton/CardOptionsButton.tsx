import React, { MouseEventHandler, useRef } from "react";
import styles from "./CardOptionsButton.module.css";
import { cardInfoType } from "../../utils/types";
import { ReactComponent as ThreePointsIcon } from "../../images/three-points-icon.svg";
import { useDispatch } from "react-redux";
import { openModalAction, setModalTop } from "../../utils/store";
import CardOptionsModal from "../CardOptionsModal/CardOptionsModal";

type propsType = {
  cardInfo: cardInfoType;
  cardRef: React.MutableRefObject<HTMLDivElement>;
};

export default function CardOptionsButton({ cardInfo, cardRef }: propsType) {
  const dispatch = useDispatch();
  const iconRef = useRef<SVGSVGElement>(null);

  // eslint-disable-next-line
  const handleThreePointsClick: MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    const cardHeight = cardRef.current.getBoundingClientRect().height;
    const cardTop = cardRef.current.getBoundingClientRect().top;
    if (window.innerHeight < cardHeight + cardTop) {
      window.scrollTo({
        top:
          window.scrollY + cardHeight + cardTop - window.innerHeight + 60 + 15,
        behavior: "smooth",
      });
    }
    const rootWidth = document
      .getElementById("root")
      .getBoundingClientRect().width;
    const cardX = cardRef.current.getBoundingClientRect().x;
    const cardWidth = cardRef.current.getBoundingClientRect().width;
    dispatch(setModalTop(0));
    dispatch(
      openModalAction(
        <div>
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
        </div>
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
