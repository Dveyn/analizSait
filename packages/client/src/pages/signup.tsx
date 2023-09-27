import { appAPI } from '@@/api/api';
import { Button, Card, Input, Link, Title, Error, Pretitle } from '@@/components/ui';
import React, { useState } from 'react';
import styles from '@@/styles/signin.module.css'
import { useRouter } from 'next/router';

export const Signup = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepasword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  const signupSend = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await appAPI.signup({
        name,
        email,
        password
      })
      if (res.status === 200) {
        setLoading(false)
        if (res.data.isError) {
          setError(res.data.message)
        } else {
          // setEmail('')
          // setPassword('')
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
        <Pretitle customClass={styles.pretitle}>Регистрация</Pretitle>
        <Input label={'Имя'} value={name} type={'text'} onChange={(e) => { setName(e.target.value) }} />
        <Input label={'E-mail'} value={email} type={'email'} onChange={(e) => { setEmail(e.target.value) }} />
        <Input label={'Пароль'} value={password} type={'password'} onChange={(e) => { setPassword(e.target.value) }} />
        <Input label={'Повторите пароль'} value={repassword} type={'password'} onChange={(e) => { setRepasword(e.target.value) }} />
        <Button label={'Зарегестрироваться'} customClass={styles.button} onClick={signupSend} />
        {error && <Error>{error}</Error>}
        <br />
        <Link to={'/signin'}>Войти</Link>

      </Card>
    </main>

  )
}

export default Signup;
