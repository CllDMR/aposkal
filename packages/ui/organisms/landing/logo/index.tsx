import type { FC } from "react";
import Image from "next/image";

interface LogoProps {
  className: string;
}

export const Logo: FC<LogoProps> = (props) => {
  return (
    <Image
      className={`${props.className}`}
      src="/images/logo.svg"
      width={200}
      height={200}
      alt="Aposkal Logo"
      priority
    />
  );
};
