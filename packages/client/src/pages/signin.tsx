import React, { useState } from "react";
import { Card, Input, Button } from "@@/components/ui"
import styles from "@@/styles/Signin.module.css";
import { appAPI } from "@@/api/api";
import { setCookie } from "@@/unitls/cookies";

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendRequest = async () => {
    const result = await appAPI.signin({ email, password });
    const data = result.data
    if (data.isError) {

    } else {
      setCookie('token', data.token, 7);
      setCookie('token2', data.token2, 7);
    }
    console.log(data);
  }
  return (
    <>
      <Card customClass={styles.card}>
        <h2 className={styles.title} >Вход в систему</h2>
        <Input placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} type="email" customClass={styles.input} />
        <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password" customClass={styles.input} />
        <Button onClick={sendRequest} >Войти</Button>
      </Card>
    </>
  )
}

export default Signin;
