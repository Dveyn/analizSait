import React, { ReactNode } from "react";

type Props = { children: ReactNode  }
export const AuthWrapper = ({children}:Props) => {
  return <>{children}</>;
};
