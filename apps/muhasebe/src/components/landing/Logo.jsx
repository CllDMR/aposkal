import Image from "next/image";
import LogoImage from "@/images/logo.svg";

export const Logo = ({ className = "w-auto h-10 ", width = 80 }) => {
  return (
    <div className={className}>
      <Image width={width} src={LogoImage} alt="Logo" />
    </div>
  );
};
