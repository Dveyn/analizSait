import { CompontsProps } from "@@/type/components";
import React from "react";
import styles from "./card.module.css";

export const Card = ({ style, customClass, children }: CompontsProps) => {
  return <div className={`${styles.card} ${customClass}`} style={style}>
    {children}
  </div>
}
