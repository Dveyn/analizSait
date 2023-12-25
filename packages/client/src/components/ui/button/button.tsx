import { CompontsProps } from "@@/type/components";
import React from "react";
import styles from "./button.module.css";

export const Button = ({ style, customClass, onClick, children}: CompontsProps) => {
  return <button className={`${styles.btn} ${customClass}`} onClick={onClick} style={style}>{children}</button>
}
