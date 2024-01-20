import type { FC } from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Image
      className={className}
      src="/logo.svg"
      alt="Logo"
      width={286.3}
      height={141.73}
    />
  );
};
