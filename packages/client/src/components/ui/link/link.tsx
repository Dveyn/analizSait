import React from "react";

interface linkProps {
  to: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Link = ({to, children, style, className}: linkProps) => {
return (
  <a href={to} style={style} className={className}>{children}</a>
);
}
 