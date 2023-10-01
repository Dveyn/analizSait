import { appAPI } from '@@/api/api';
import { Button, Card, Input, Link, Title, Error, Pretitle } from '@@/components/ui';
import React, { useState } from 'react';
import styles from '@@/styles/signin.module.css'
import { setCookie } from '@@/unitls/cookies';
import { useRouter } from 'next/router';


export const Signin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const signupSend = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await appAPI.signin({
        email,
        password
      })
      if (res.status === 200) {
        setLoading(false)
        if (res.data.isError) {
          setError(res.data.message)
        } else {
          setCookie('token', res.data.token, 7);
          setCookie('token2', res.data.token2, 7);
          setEmail('')
          setPassword('')
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setLoading(false)
      //TODO : Error
    }
  }

  return (
    <main>
      <Card customClass={styles.card}>
        <Title customClass={styles.title}>Optimastika</Title>
        <Pretitle customClass={styles.pretitle}>Авторизация</Pretitle>
        <Input label={'E-mail'} value={email} type={'email'} onChange={(e) => { setEmail(e.target.value) }} />
        <Input label={'Пароль'} value={password} type={'password'} onChange={(e) => { setPassword(e.target.value) }} />
        <Button label={'Войти'} customClass={styles.button} onClick={signupSend} />
        {error && <Error>{error}</Error>}
        <br />
        <Link to={'/signup'}>Зарегестрироваться</Link>
        <br />
        <Link to={'/forget'}>Забыли пароль?</Link>
      </Card>
    </main>
  )
}

export default Signin;
