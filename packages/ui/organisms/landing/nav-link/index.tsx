import type { FC, PropsWithChildren } from "react";
import Link from "next/link";

interface NavLinkProps extends PropsWithChildren {
  href: string;
}

export const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      {children}
    </Link>
  );
};
