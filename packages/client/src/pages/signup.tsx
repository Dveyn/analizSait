import React, { useState } from "react";
import { Card, Input, Button } from "@@/components/ui"
import styles from "@@/styles/Signin.module.css";
import { appAPI } from "@@/api/api";

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSeconds, setPasswordSeconds] = useState('');
  const sendRequest = async () => {
    const result = await appAPI.signup({email, password, passwordSeconds});
    console.log(result);
  }
  return (
    <>
      <Card customClass={styles.card}>
        <h2 className={styles.title} >Регистрация</h2>
        <Input placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} type="email" customClass={styles.input} />
        <Input placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} type="password" customClass={styles.input} />
        <Input placeholder="Подтвердите пароль" onChange={(e) => setPasswordSeconds(e.target.value)} type="password" customClass={styles.input} />
        <Button onClick={sendRequest} >Зарегестироваться</Button>
      </Card>
    </>
  )
}

export default Signup;
