import React from "react";
import styles from './title.module.css';

interface StyledCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  customClass?: string;
}
export const Title = ({children, style, customClass,}:StyledCardProps ) =>{

  return (
    <h1 className={`${styles.title} ${customClass}`} style={style}>{children}</h1>
  )
}
