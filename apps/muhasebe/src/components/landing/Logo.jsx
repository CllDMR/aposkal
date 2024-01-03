import LogoImage from "@/images/logo.svg";
import Image from "next/image";

export const Logo = ({ className = "h-10  w-auto ", width = 80 }) => {
  return (
    <div className={className}>
      <Image width={width} src={LogoImage} alt="Logo" />
    </div>
  );
};
