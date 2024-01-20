import type { FC, PropsWithChildren } from "react";
import type { LinkProps } from "next/link";
import Link from "next/link";

export const NavLink: FC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 inline-block rounded-lg px-2 py-1 text-sm"
    >
      {children}
    </Link>
  );
};
