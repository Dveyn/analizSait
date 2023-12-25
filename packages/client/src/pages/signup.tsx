import React from "react";
import { Card, Input, Button } from "@@/components/ui"
import styles from "@@/styles/Signin.module.css";

export const Signup = () => {
  return (
    <>
      <Card customClass={styles.card}>
          <h2 className={styles.title} >Регистрация</h2>
          <Input placeholder="e-mail" type="email" customClass={styles.input} />
          <Input placeholder="Пароль" type="password" customClass={styles.input} />
          <Input placeholder="Подтвердите пароль" type="password" customClass={styles.input} />
          <Button >Зарегестироваться</Button>
      </Card>
    </>
  )
}

export default Signup;
