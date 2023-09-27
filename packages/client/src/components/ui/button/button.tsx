// components/StyledButton.tsx

import React from 'react';
import styles from './button.module.css';

interface StyledButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  customClass?: string;
}

export const Button = ({ label, onClick, style, customClass }:StyledButtonProps) => {
  return (
    <button style={style} className={`${styles.button} ${customClass}`} onClick={onClick}>
      {label}
    </button>
  );
};

