import type { FC } from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
}

export const Logo: FC<LogoProps> = ({
  className = "w-auto h-10 ",
  width = 286.3,
}) => {
  return (
    <div className={className}>
      <Image src="/images/logo.svg" alt="Logo" width={width} height={141.73} />
    </div>
  );
};
