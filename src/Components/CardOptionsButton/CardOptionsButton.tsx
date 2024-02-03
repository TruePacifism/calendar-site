import React, { MouseEventHandler, MutableRefObject, useRef } from "react";
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

function scrollToY(scrollTargetY: number, speed: number) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY || document.documentElement.scrollTop,
    currentTime = 0;

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var easeInOutQuad = function (t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  var time = Math.max(
    0.1,
    Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
  );

  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easeInOutQuad(p, scrollY, scrollTargetY - scrollY, time);

    if (p < 1) {
      window.requestAnimationFrame(tick);

      window.scrollTo(0, t);
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  tick();
}

export default function CardOptionsButton({ cardInfo, cardRef }: propsType) {
  const dispatch = useDispatch();
  const iconRef = useRef<SVGSVGElement>(null);

  // eslint-disable-next-line
  const handleThreePointsClick: MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    const cardHeight = cardRef.current.getBoundingClientRect().height;
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
    <ThreePointsIcon
      ref={iconRef}
      className={styles.threePointsIcon}
      onClick={handleThreePointsClick}
    />
  );
}
