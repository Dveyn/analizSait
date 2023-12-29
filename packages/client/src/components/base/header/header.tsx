import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import userStore from "@@/store/user";
import {observer, inject} from "mobx-react";
import { useRouter } from "next/router";

export const Header = observer( () => {
  const router = useRouter();
  
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


  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(userStore.isAuth);
    console.log(userStore.isAuth)
  }, [userStore.isAuth]);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <img src="/media/audit_logo.png" alt="audit boost" />
      </a>
      <nav className={styles.nav} >
        <ul>
          <li className={styles.item} onClick={()=>router.push('/dashboard')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Дашборд</li>
          <li className={styles.item} onClick={()=>router.push('/price')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Тарифы и цены</li>
          <li className={styles.item} onClick={()=>router.push('/community')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Сообщество</li>
          <li className={styles.item} onClick={()=>router.push('/blog')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Блог</li>
          <li className={styles.item} onClick={()=>router.push('/about')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>О нас</li>
          {isAuth ?
            <li className={styles.item} onClick={()=>router.push('/profile')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Личный кабинет</li> :
            <li className={styles.item} onClick={()=>router.push('/signin')} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Войти</li>
          }

        </ul>
      </nav>
    </header>
  );
}
)
