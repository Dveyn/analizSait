import React from "react";
import styles from "./input.module.css"

interface StyledInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  customClass?: string;
}


export const Input = ({ label, value, onChange, style, customClass }: StyledInputProps) => {
  return (
    <div className={`${styles.inputContainer} ${customClass}`}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        style={style}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  )

}

export default Input;
