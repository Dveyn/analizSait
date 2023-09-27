import React from "react";
import styles from './pretitle.module.css';

interface StyledCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  customClass?: string;
}
export const Pretitle = ({children, style, customClass,}:StyledCardProps ) =>{

  return (
    <h2 className={`${styles.pretitle} ${customClass}`} style={style}>{children}</h2>
  )
}
