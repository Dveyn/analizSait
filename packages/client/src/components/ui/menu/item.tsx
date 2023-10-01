import React from "react";
import styles from './menu.module.css';

type itemProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active?: boolean;
}

export const Item = ({children, style, className, onClick, active}: itemProps) => {

  return (
      <div style={style} onClick={onClick} className={`${styles.item} ${className}`} data-active={active}>
        { children }
      </div>
  );
}
