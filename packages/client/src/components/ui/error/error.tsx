import React from "react";
import styles from './error.module.css'

interface errorProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Error = ({className, style, children}: errorProps) => {
  return (
    <div style={style} className={`${styles.error} ${className}`}> {children} </div>
  )
}
