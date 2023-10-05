import React from "react";
import styles from "./CollisionsList.module.css";
import { collisionType } from "../../types";
import CollisionsListItem from "../CollisionsListItem/CollisionsListItem";

type propsType = {
  collisions: collisionType[];
};

export default function CollisionsList({ collisions }: propsType) {
  return (
    <ul className={styles.list}>
      {collisions &&
        collisions.map((collision, idx) => (
          <CollisionsListItem collision={collision} key={idx} />
        ))}
    </ul>
  );
}
