import { appAPI } from "@@/api/api";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from 'next/router';
import { deleteCookie } from "@@/unitls/cookies";


type Props = { children: ReactNode  }
export const AuthWrapper = ({children}:Props) => {

  const router = useRouter();

  useEffect(() => {
    const getAuth = async () => {
      const result = await appAPI.getAuth();

      if (result.data.isError && router.asPath.includes("dashboard")) {
        router.push('/signin');
        deleteCookie('token');
        deleteCookie('token2');
      }
    }

    getAuth();
  }, [])
  return <>{children}</>;
};
