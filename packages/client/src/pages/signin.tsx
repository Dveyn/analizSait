import React from "react";
import { Card, Input, Button } from "@@/components/ui"
import styles from "@@/styles/Signin.module.css";

export const Signin = () => {
  return (
    <>
      <Card customClass={styles.card}>
          <h2 className={styles.title} >Вход в систему</h2>
          <Input placeholder="e-mail" type="email" customClass={styles.input} />
          <Input placeholder="password" type="password" customClass={styles.input} />
          <Button >Войти</Button>
      </Card>
    </>
  )
}

export default Signin;
