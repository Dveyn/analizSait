import React from "react";
import styles from "./container.module.css"


type containerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}


export const Container = ({ children, style, className }: containerProps) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {children}
    </div>
  );
};
