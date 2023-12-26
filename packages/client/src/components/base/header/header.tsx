import React, { useEffect, useRef } from "react";
import styles from "./header.module.css";

export const Header = () => {
  const handleMouseEnterLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const elem = e.currentTarget as HTMLLIElement;
    const tolerance = 10;
    const left = 0;
    const right = elem.clientWidth;
    let x = e.pageX - elem.offsetLeft;

    if (x - tolerance < left) x = left
    if (x + tolerance > right) x = right

    elem.style.setProperty('--x', `${x}px`)
  };

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src="/media/audit_logo.png" alt="audit boost" />
      </a>
      <nav className={styles.nav} >
        <ul>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Дашборд</li>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Тарифы и цены</li>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Сообщество</li>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Блог</li>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>О нас</li>
          <li className={styles.item} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Войти</li>
        </ul>
      </nav>
    </header>
  );
}
