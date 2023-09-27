import React from "react";
import styles from './card.module.css'

interface StyledCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  customClass?: string;
}

export const Card = ({ style, customClass, children }: StyledCardProps) => {
  return (
    <div className={`${styles.card} ${customClass}`} style={style}>
      {children}
    </div>
  );
}
