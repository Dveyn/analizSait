import { CompontsProps } from "@@/type/components";
import React, { useState } from "react";
import styles from "./input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Input = ({ style, customClass, placeholder, type, onChange }: CompontsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={ `${styles.box} ${customClass}`}>
      <input type={isPassword && showPassword? 'text' : type} onChange={onChange} placeholder={placeholder} className={`${styles.input}`} style={style} />
      {
        isPassword ? <div className={styles.eye} onMouseDown={()=>{setShowPassword(true)}} onMouseUp={()=>{setShowPassword(false)}}> {showPassword? <FaEye /> : <FaEyeSlash />} </div> : null 
      }
    </div>
  );
}
