import React, { ReactNode } from "react";

interface ContainerProps {
  paddingLeftRight: 26 | 13;
  paddingTopBottom: 26 | 13;
  children: ReactNode;
}

export default function Container({
  paddingLeftRight,
  paddingTopBottom,
  children,
}: ContainerProps) {
  return (
    <div
      style={{
        paddingLeft: paddingLeftRight,
        paddingRight: paddingLeftRight,
        paddingTop: paddingTopBottom,
        paddingBottom: paddingTopBottom,
      }}
    >
      {children}
    </div>
  );
}
