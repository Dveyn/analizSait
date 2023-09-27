
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@@/styles/Home.module.css'
import { ChangeEvent, useEffect } from 'react'
import { appAPI } from '@@/api/api'
import { Button, Card, Input, Title } from '@@/components/ui'
import { Pretitle } from '@@/components/ui/pretitle/pretitle'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const testAPI = async (textData: string[], labels: string[]) => {
    await appAPI.train(textData, labels)
  }

  // useEffect(() => {
  //   testAPI(["Указание метатегоов обязательна", "просто какой то текст для тестирования модели",
  //     "Указание метатегоов обязательна", "Указание метатегоов обязательна", "Указание метатегоов обязательна"],
  //     ["метатель", "Вот как то", "метатель", "метатель", "метатель"])
  // }, [])


  return (
    <>

      <main className={`${styles.main} ${inter.className}`}>
        <Card>
          <Title>Optimastika</Title>
          <Pretitle>Авторизация</Pretitle>
          <Input label={'E-mail'} value={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.')
          }} />
          <Input label={'Пароль'} value={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.')
          }} />
          <Button label={'Войти'} onClick={function (): void {
            throw new Error('Function not implemented.')
          } }  />
        </Card>
      </main>
    </>
  )
}
