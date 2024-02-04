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
function scrollToAnimate(targetPosition: number, duration: number) {
  const currentPosition = window.scrollY;
  const distance = targetPosition - currentPosition;
  const steps = duration / 16; // 16ms per frame assuming 60fps

  const distancePerStep = distance / steps;

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    const newPosition = currentPosition + distancePerStep * currentStep;
    window.scrollTo(0, newPosition);

    if (currentStep >= steps) {
      clearInterval(interval);
    }
  }, 16);
}

export default function CardOptionsButton({ cardInfo, cardRef }: propsType) {
  const dispatch = useDispatch();
  const iconRef = useRef<SVGSVGElement>(null);

  // eslint-disable-next-line
  const handleThreePointsClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    // const cardHeight = cardRef.current.getBoundingClientRect().height;
    const cardTop = cardRef.current.getBoundingClientRect().top;
    if (window.innerHeight < 239 + cardTop + 60) {
      scrollToAnimate(
        window.scrollY + 239 + cardTop - window.innerHeight + 60 + 15,
        450
      );
      // scrollToY(
      //   window.scrollY + 239 + cardTop - window.innerHeight + 60 + 15,
      //   25
      // );
      // window.scrollTo({
      //   top: window.scrollY + 239 + cardTop - window.innerHeight + 60 + 15,
      //   behavior: "smooth",
      // });
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
    <div className={styles.wrapper} onClick={handleThreePointsClick}>
      <ThreePointsIcon ref={iconRef} className={styles.threePointsIcon} />
    </div>
  );
}
