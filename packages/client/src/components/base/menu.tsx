import React from "react";
import { Menu, Item, Title } from '@@/components/ui'
import { useRouter } from 'next/router';

export const MenuComponent = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  return (
    <Menu >
      <Title>Меню</Title>
      <Item key="1" onClick={() => { router.push('/dashboard') }} active={currentPath === '/dashboard'}>Дашборд</Item>
      <Item key="2" onClick={() => { router.push('/dashboard/add-sait') }} active={currentPath === '/dashboard/add-sait'}>Подключить сайт</Item>
      <Item key="3" onClick={() => { router.push('/dashboard/mores') }}  active={currentPath === '/dashboard/mores'}>Что нибудь еще</Item>
    </ Menu>
  );
}
