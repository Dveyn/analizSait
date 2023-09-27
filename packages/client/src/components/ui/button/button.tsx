// components/StyledButton.tsx

import React from 'react';
import styles from './button.module.css';

interface StyledButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const Button = ({ label, onClick, style }:StyledButtonProps) => {
  return (
    <button style={style} className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

