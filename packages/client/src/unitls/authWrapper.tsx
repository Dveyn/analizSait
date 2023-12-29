import { appAPI } from "@@/api/api";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from 'next/router';
import { deleteCookie } from "@@/unitls/cookies";
import userStore from "@@/store/user";


type Props = { children: ReactNode }
export const AuthWrapper = ({ children }: Props) => {

  const router = useRouter();

  useEffect(() => {
    const getAuth = async () => {
      const result = await appAPI.getAuth();
      console.log(result);

      if ((result.data.isError || !result.data.isValid) && router.asPath.includes("dashboard")) {
        deleteCookie('token');
        deleteCookie('token2');
        userStore.clearUserData();
        router.push('/signin');
      } else if (!result.data.isValid) {
        deleteCookie('token');
        deleteCookie('token2');
        userStore.clearUserData();
      } else if (router.asPath.includes("signup") || router.asPath.includes("signin")) {
        const email = result.data.user.email;
        const id = result.data.user.id;
        userStore.setUserData({ email: email, id: id, isAuth: true });
        router.push('/');
      } else if (result.data.isValid) {

        const email = result.data.user.email;
        const id = result.data.user.id;
        userStore.setUserData({ email: email, id: id, isAuth: true });
      }
    }

    getAuth();
  }, [router])
  return <>{children}</>;
};
