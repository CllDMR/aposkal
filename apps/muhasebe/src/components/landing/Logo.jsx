import Image from "next/image";

export const Logo = ({ className = "w-auto h-10 ", width = 80 }) => {
  return (
    <div className={className}>
      <Image width={width} src={"/images/logo.svg"} alt="Logo" />
    </div>
  );
};
