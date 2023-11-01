"use client";

import type { FC, PropsWithChildren } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "../button";
import { Container } from "../container";
import { Logo } from "../logo";
import { NavLink } from "../nav-link";

interface MobileNavLinkProps extends PropsWithChildren {
  href: string;
}

const MobileNavLink: FC<MobileNavLinkProps> = ({ href, children }) => {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
};

interface MobileNavIconProps extends PropsWithChildren {
  open: boolean;
}

const MobileNavIcon: FC<MobileNavIconProps> = ({ open }) => {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-gray-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0",
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0",
        )}
      />
    </svg>
  );
};

interface MobileNavigationProps {
  baseAuthUrl: string;
}

const MobileNavigation: FC<MobileNavigationProps> = ({ baseAuthUrl }) => {
  const basePath = window?.location.origin ?? "";
  const pathName = usePathname();

  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-gray-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-gray-900 shadow-xl ring-1 ring-gray-900/5"
          >
            <MobileNavLink href="#features">Özellikler</MobileNavLink>
            <MobileNavLink href="#testimonials">Görüşler</MobileNavLink>
            <MobileNavLink href="#pricing">Fiyatlar</MobileNavLink>
            <hr className="m-2 border-gray-300/40" />
            <MobileNavLink
              href={
                baseAuthUrl +
                "/auth/login" +
                "?callbackUrl=" +
                encodeURIComponent(basePath + pathName)
              }
            >
              Giriş
            </MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
};

interface HeaderProps {
  baseAuthUrl: string;
}

export const Header: FC<HeaderProps> = ({ baseAuthUrl }) => {
  const basePath = window?.location.origin ?? "";
  const pathName = usePathname();

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-12 w-auto " />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Özellikler</NavLink>
              <NavLink href="#testimonials">Görüşler</NavLink>
              <NavLink href="#pricing">Fiyatlar</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink
                href={
                  baseAuthUrl +
                  "/auth/login" +
                  "?callbackUrl=" +
                  encodeURIComponent(basePath + pathName)
                }
              >
                Giriş
              </NavLink>
            </div>
            <Button
              href={
                baseAuthUrl +
                "/auth/register" +
                "?callbackUrl=" +
                encodeURIComponent(basePath + pathName)
              }
              color="blue"
            >
              <span>
                Şimdi Kaydol <span className="hidden lg:inline"></span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation baseAuthUrl={baseAuthUrl} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};
