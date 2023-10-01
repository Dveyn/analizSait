import React from "react";
import styles from './menu.module.css';

type menuProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Menu = ({ children, style, className }: menuProps) => {
  return (
    <div style={style} className={`${styles.menu} ${className}`}>
      { children }
    </div>
  );
};
